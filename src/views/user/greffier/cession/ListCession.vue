<template>
    <VBreadCrumb 
        :items="[
            {title: 'cessions', disabled: true},
            {title: 'Liste', disabled: false},
        ]" 
    />
    
    <div class="main-body">
        <VMainHeader 
            :icon="{ icon: 'mdi-chart-donut', bgColor: '!bg-teal-400'}"
            title="Liste des Cessions" 
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit." 
        >
            <template #actions>
                <VButton 
                    title="Nouvelle cession" 
                    icon="mdi-plus" 
                    class="btn-primary" 
                    @click="handleAdd"
                />
            </template>
        </VMainHeader>

        <FilterCession
            @filter="filterCession"
        />
        <v-skeleton-loader v-if="loading"
          type="table-tbody"
          class="mt-4"
        />

        <div v-else-if="cessions !== null && cessions.data.length > 0">
            <VTable>
                <template #thead>
                    <tr>
                        <th>Numéro Dossier</th>
                        <th>Objet de la demande</th>
                        <th class="text-right">Montant à remboursé</th>
                        <th class="text-center">Date de cession</th>
                        <th>Status</th>
                        <th class="text-center">Actions</th>
                    </tr>
                </template>
                <template #tbody>
                    <tr v-for="(cession, index) in cessions.data" :key="index">
                        <td>
                            <div class="flex items-center gap-3">
                                <div class="flex items-center justify-center p-2 bg-teal-100 rounded-lg shadow-sm">
                                    <v-icon icon="mdi-chart-donut" class="!text-xl text-teal-500"></v-icon>
                                </div>
        
                                <p class="text-sm font-bold">{{ cession.numero_dossier }}</p>
                            </div>
                        </td>
        
                        <td class="overflow-hidden truncate max-w-0 whitespace-nowrap">
                            {{ cession.request_subject }}
                            <v-tooltip activator="parent" max-width="300" location="bottom">
                                {{ cession.request_subject }}
                            </v-tooltip>
                        </td>
                        
                        <td class="text-right">
                            {{ format.formatMontant(cession.reimbursed_amount)  }}
                        </td>
                        <td class="text-center">
                            {{ format.formatDate(cession.date_cession)}}
                        </td>
                        <td>
                            <v-chip 
                                :color="cession.status_color" 
                                size="small"
                                variant="tonal" 
                            >
                                {{ cession.status_label }}
                            </v-chip>
                        </td>
                        
                        <td class="text-center">
                            <v-icon
                                icon="mdi-chevron-right"
                                class="p-4 bg-gray-100 rounded-[14px]"
                                size="16"
                                @click="details(cession)"
                            ></v-icon>
                        </td>
                    </tr>
                </template>
            </VTable>

            <VPagination
                v-model="page"
                :length="cessions.last_page"
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
                Aucune cession trouvés
            </p>
    
            <!-- Texte secondaire -->
            <p class="mb-4 text-sm text-gray-500">
                Ajoutez une nouvelle cession pour commencer.
            </p>
        </div>
    </div>
</template> 

<script setup>
// Imports
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import VMainHeader from '@/components/VMainHeader.vue';
    import VButton from '@/components/VButton.vue';
    import VTable from '@/components/VTable.vue';
    import VPagination from '@/components/VPagination.vue';
    import greffierService from '@/services/cessions/greffierService';
    import format from '@/utils/format';
    import FilterCession from './FilterCession.vue';

// Variables & state
    const cessions = ref(null);

    const router = useRouter();

    const loading = ref(false);

    const page = ref(1);
    const search = ref('');
    const statut = ref(-1);

// Functions 

    const handleAdd = () => {
        router.push({name: 'greffier-cession-add'})
    }

    const details = (obj) => {
        router.push({ name: 'greffier-cession-details', params: { id: obj.id } })
    }

    const paginate = async () => {
        await fetchAllCession();
    }

    const filterCession = async (srch, stat) => {
        search.value = srch;
        statut.value = stat;
        page.value = 1;
        await fetchAllCession();
    }
    
    const fetchAllCession = async() => {
        try {
            const profil = JSON.parse(localStorage.getItem('profil'));

            const response = await greffierService.getAllCessionByGreffier(
                profil.user.id, 
                search.value, 
                statut.value,
                page.value
            );
            cessions.value = response.data.cessions
        } catch (error) {
            console.error(error)
        }
    }


// Lifecycle hooks

    onMounted(async() => {
        loading.value = true;
        
        await fetchAllCession();

        setTimeout(() => {
            loading.value = false;
        }, 700);
    });

</script>