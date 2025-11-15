<template>
    
    <VBreadCrumb 
        :items="[
            {title: 'Utilisateurs', disabled: true},
            {title: 'Inscritpions', disabled: false},
        ]" 
    />

    <div class="main-body">
        <VMainHeader 
            :icon="{ icon: 'mdi-account', bgColor: '!bg-yellow-300'}"
            title="Liste des inscriptions" 
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit." 
        />

        <FilterInscription
            v-if="tpis"
            :posts="posts"
            :tpi="tpis"
            @filter="filterInscription"
        />
    
        <v-skeleton-loader v-if="loading"
          type="table-tbody"
          class="mt-4"
        />
        
        <div v-else-if="inscriptions != null && inscriptions.data.length > 0">
            <VTable>
                <template #thead>
                    <tr>
                        <th>Utilisateur</th>
                        <!-- <th>CIN</th> -->
                        <th>Immatriculation</th>
                        <th>Poste</th>
                        <th>TPI</th>
                        <th class="text-center">Date demande</th>
                        <th class="text-center">Actions</th>
                    </tr>
                </template>
        
                <template #tbody>
                        <tr v-for="(inscription, index) in inscriptions.data" :key="index">
                            
                            <td>
                                <div class="flex items-center gap-3">
                                    <v-avatar size="42" class="!bg-yellow-100">
                                        <span class="text-sm font-bold text-yellow-500">
                                            {{ getInitials(inscription.last_name, inscription.first_name) }}
                                        </span>
                                    </v-avatar>
                                    <div>
                                       <p class="font-bold">{{ inscription.last_name }} {{ inscription.first_name }}</p>
                                       <p class="font-medium text-gray-500 text-caption">{{ inscription.email }}</p>
                                   </div>
                                </div>
                            </td>
                            
                            <td class="font-mono">{{ inscription.immatriculation }}</td>
        
                            <td>
                                <v-chip
                                    :color="inscription.post.post_color"
                                    variant="tonal"
                                    class="font-weight-medium text-caption"
                                >
                                    {{ inscription.post.name }}
                                </v-chip>
                            </td>
        
                            <td>
                                {{ inscription.tpi.name }}
                            </td>
        
                            <td class="text-center">
                                <div>
                                    <div class="font-weight-medium">
                                        {{ format.formatDate(inscription.date_inscription) }}
                                    </div>
                                    <div class="text-gray-500 text-caption">
                                        {{ format.relativeTime(inscription.date_inscription) }}
                                    </div>
                                </div>
                            </td>
                            
                            <td class="text-center">
                                <VTableAction 
                                    :actions="actions" 
                                    :title="inscription.last_name+' '+inscription.first_name" 
                                    :objet="inscription" @action="handleActions" 
                                />
                            </td>
                        </tr>
                </template>
            </VTable>

            <VPagination
                v-model="page"
                :length="inscriptions.last_page"
                @paginate="paginate"
            />
        </div>
    
        <div v-else
            class="flex flex-col items-center justify-center px-6 py-12 mt-8"
        >
            <!-- Icône -->
            <v-icon size="48" class="mb-4 text-gray-400">
                mdi-circle-off-outline
            </v-icon>
    
            <!-- Texte principal -->
            <p class="mb-1 text-lg font-semibold text-gray-700">
                Aucune inscription trouvée
            </p>
    
            <!-- Texte secondaire -->
        </div>
    
        <v-overlay v-model="overlay" class="flex items-center justify-center">
            <DetailsInscription 
                v-model="overlay" 
                :inscription="objet" 
                v-if="action === 'profil'" 
            />
        </v-overlay>
    </div>
</template>

<script setup>
// Imports
    import { onMounted, ref } from 'vue';
    import VMainHeader from '@/components/VMainHeader.vue';
    import VTable from '@/components/VTable.vue';
    import VTableAction from '@/components/VTableAction.vue';
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import VPagination from '@/components/VPagination.vue';
    import format from '@/utils/format';
    import postService from "@/services/users/postService";
    import userService from "@/services/users/userService";
    import tpiService from '@/services/instances/tpiService';
    import DetailsInscription from './DetailsInscription.vue';
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";
    import FilterInscription from './FilterInscription.vue';

// Variables & state    
    const inscriptions = ref(null);
    const posts = ref(null);
    const tpis = ref(null);

    const overlay = ref(false);
    const action = ref(null);
    const objet = ref(null);

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const page = ref(1);
    const search = ref('');
    const selectedPost = ref('');
    const selectedTPI = ref('');
    const loading = ref(false);

    const actions = [
        {action: 'approve', title: 'Approuver', icon: 'mdi-check'},
        {action: 'reject', title: 'Refuser', icon: 'mdi-close'},
        {action: 'profil', title: 'Profil', icon: 'mdi-account-outline', style: '!border-t'},
    ]

// Functions
    const handleActions = async (act, obj) => {
        action.value = act;
        objet.value = obj;

        action.value === 'approve' 
            ? await requestApproved(objet.value) 
            : action.value === 'reject'
            ? await requestRejected(objet.value)  
            : overlay.value = !overlay.value;        
    }

    const getInitials = (nom, prenom) => {
        return (nom.charAt(0) + prenom.charAt(0)).toUpperCase()
    }


    const paginate = async () => {
        await fetchAllInscription();
    }


    const filterInscription = async (word, postSelected, tpiSelected) => {
        search.value = word;
        selectedPost.value = postSelected;
        selectedTPI.value = tpiSelected;
        page.value = 1;
        await fetchAllInscription();
    }
    
    const requestApproved = async (user) => {
        openLoader(true);

        try {
            const response = await userService.approveRequest(user.id);

            await fetchAllInscription();
            
            setTimeout(async () => {
                openSnackbar("Nouvelle cour d\'appel enregistrée avec succès.", "success");
                openLoader(false);
            }, 1000)
        } catch (error) {
            openLoader(false);

            console.error(error.response.data);
        }
    }

     const requestRejected = async (user) => {
        openLoader(true);

        try {
            const response = await userService.rejectRequest(user.id);

            await fetchAllInscription();
            
            setTimeout(async () => {
                openSnackbar("Nouvelle cour d\'appel enregistrée avec succès.", "success");
                openLoader(false);
            }, 1000)
        } catch (error) {
            openLoader(false);

            console.error(error.response.data);
        }
    }
    
    const fetchAllInscription = async () => {
        try {
            const response = await userService.getAllInscription(search.value, selectedPost.value, selectedTPI.value, page.value);
            inscriptions.value = response.data.inscriptions;
        } catch (error) {
            console.error(error.response.data);
        }
    }
    
    const fetchAllTPI = async () => {
        try {
            const response = await tpiService.listTPI();
            tpis.value = response.data.tpi;

        } catch (error) {
            console.error(error.response.data);
        }
    };


    const fetchAllPost = async () => {
        try {
            const response = await postService.getAllPost();
            posts.value = response.data.posts;

        } catch (error) {
            console.error(error.response.data);
        }
    };
// Lifecycle hooks
    onMounted(async () => {
        loading.value = true;

        await Promise.all([
            fetchAllInscription(),
            fetchAllPost(),
            fetchAllTPI(),
        ]);

        setTimeout(() => {
            loading.value = false;
        }, 700); 
    })
</script>