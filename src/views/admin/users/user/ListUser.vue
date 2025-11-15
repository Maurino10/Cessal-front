<template>  
    <VBreadCrumb 
        :items="[
            {title: 'Utilisateurs', disabled: true},
            {title: 'Utilisateurs', disabled: false},
        ]" 
    />
    
    <div class="main-body">
        <VMainHeader 
            :icon="{ icon: 'mdi-account', bgColor: '!bg-sky-700'}"
            title="Liste des utilisateurs" 
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit." 
        />

        <FilterUser
            v-if="tpis"
            :tpi="tpis"
            :posts="posts"
            @filter="filterUser"
        />
    
        <v-skeleton-loader v-if="loading"
          type="table-tbody"
          class="mt-4"
        />
        
        <div v-else-if="users !== null && users.data.length > 0">
            <VTable>
                <template #thead>
                    <tr>
                        <th>Utilisateur</th>
                        <!-- <th>CIN</th> -->
                        <th>Immatriculation</th>
                        <th>Poste</th>
                        <th>TPI</th>
                        <th class="text-center">Actions</th>
                    </tr>
                </template>
        
                <template #tbody>
                        <tr v-for="(user, index) in users.data" :key="index">
                            
                            <td>
                                <div class="flex items-center gap-3">
                                    <v-avatar size="42" class="!bg-sky-100">
                                        <span class="text-sm font-bold text-sky-700">
                                            {{ getInitials(user.profil.last_name, user.profil.first_name) }}
                                        </span>
                                    </v-avatar>
                                    <div>
                                       <div class="font-bold text-nowrap">
                                            {{ user.profil.last_name }} {{ user.profil.first_name }}
                                        </div>
                                       <div class="font-medium text-gray-500 text-caption">
                                            {{ user.profil.email }}
                                        </div>
                                   </div>
                                </div>
                            </td>
                            
                            <td class="font-mono">
                                {{ user.profil.immatriculation }}
                            </td>
        
                            <td>
                                <v-chip
                                    :color="user.post.post_color"
                                    variant="tonal"
                                    class="font-weight-medium text-caption"
                                >
                                    {{ user.post.name }}
                                </v-chip>
                            </td>
        
                            <td>
                                {{ user.tpi.name }}
                            </td>
                            
                            <td class="text-center">
                                <VTableAction 
                                    :actions="actions" 
                                    :title="user.profil.last_name+' '+user.profil.first_name" 
                                    :objet="user" @action="handleActions" 
                                />
                            </td>
                        </tr>
                </template>
            </VTable>
            
            <VPagination
                v-model="page"
                :length="users.last_page"
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
                Aucun utilisateur trouvé
            </p>
        </div>
    
        <v-overlay v-model="overlay" class="flex items-center justify-center">
            <DetailsUser 
                v-model="overlay" 
                :user="objet" 
                v-if="action === 'details'" 
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
    import userService from "@/services/users/userService";
    import postService from "@/services/users/postService";
    import tpiService from '@/services/instances/tpiService';
    import DetailsUser from './DetailsUser.vue';
    import { useRouter } from 'vue-router';
    import FilterUser from './FilterUser.vue';


// Variables & state    
    const router = useRouter();
    
    const users = ref(null);
    const tpis = ref(null);
    const posts = ref(null);
    
    const overlay = ref(false);
    const action = ref(null);
    const objet = ref(null);

    const page = ref(1);
    const search = ref('');
    const selectedTPI = ref('');
    const selectedPost = ref('');
    const loading = ref(false);

    const actions = [
        {action: 'profil', title: 'Profil', icon: 'mdi-account-outline'},

    ]

// Functions
    const handleActions = (act, obj) => {
        action.value = act;
        objet.value = obj;

        action.value === 'profil' 
            ? router.push({ name: 'admin-user-profil', params:  { id : objet.value.id } }) 
            : overlay.value = !overlay.value;
    }


    const getInitials = (nom, prenom) => {
        return (nom.charAt(0) + prenom.charAt(0)).toUpperCase()
    }

    const paginate = async () => {
        await fetchAllUser();
    }


    const filterUser = async (word, postSelected, tpiSelected) => {
        search.value = word;
        selectedPost.value = postSelected;
        selectedTPI.value = tpiSelected;
        page.value = 1;
        await fetchAllUser();
    }
    
    const fetchAllUser = async () => {
        try {
            const response = await userService.getAllUser(search.value, selectedPost.value, selectedTPI.value, page.value);
            users.value = response.data.users;
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
            fetchAllUser(),
            fetchAllPost(),
            fetchAllTPI(),
        ]);

        setTimeout(() => {
            loading.value = false;
        }, 700); 
    })
</script>