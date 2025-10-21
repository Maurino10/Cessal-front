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
            title="Liste des Cession" 
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit." 
        >
            <template #actions>
                <FilterCession
                    @filter="filterCession"
                />
                <ExportCession 
                    :statut="statut"
                    :dateStart="dateStart"
                    :dateEnd="dateEnd"
                />
            </template>
        </VMainHeader>
    
        <v-skeleton-loader
          v-if="loading"
          type="table-tbody"
          class="mt-4"
        />
    
        <div v-else-if="cessions !== null && cessions.length > 0">
    
    
            <VTable>
                <template #thead>
                    <tr>
                        <th>Numéro Dossier</th>
                        <th>Objet de la demande</th>
                        <th class="text-right">Montant à remboursé</th>
                        <th class="text-center">Date</th>
                        <th>Statut</th>
                        <th class="text-center">Actions</th>
                    </tr>
                </template>
                <template #tbody>
                    <tr v-for="(c, index) in cessions" :key="index">
                        <td>
                            <div class="flex items-center gap-3">
                                <div class="flex items-center justify-center p-2 bg-teal-100 rounded-lg shadow-sm">
                                    <v-icon icon="mdi-chart-donut" class="!text-xl text-teal-500"></v-icon>
                                </div>
        
                                <p class="text-sm font-bold">{{ c.numero_dossier }}</p>
                            </div>
                        </td>
        
                        <td class="overflow-hidden truncate whitespace-nowrap max-w-0">
                            {{ c.request_subject }}
                            <v-tooltip activator="parent" max-width="300" location="bottom">
                                {{ c.request_subject }}
                            </v-tooltip>
                        </td>
                        
                        <td class="text-end">
                            {{ format.formatMontant(c.reimbursed_amount)  }}
                        </td>
                        <td class="text-center">
                            {{ format.formatDate(c.date_cession)}}
                        </td>
                        <td>
                            <v-chip 
                                :color="c.status_color" 
                                size="small"
                                variant="tonal" 
                            >
                                {{ c.status_label }}
                            </v-chip>
                        </td>
                        
                        <td class="text-center">
                            <v-icon
                                icon="mdi-chevron-right"
                                class="p-4 bg-gray-100 rounded-[14px]"
                                size="16"
                                @click="details(c)"
                            ></v-icon>
                        </td>
                    </tr>
                </template>
            </VTable>
    
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
    import VTable from '@/components/VTable.vue';
    import format from '@/utils/format';
    import ministereService from '@/services/cessions/ministereService';
    import FilterCession from './FilterCession.vue';
    import ExportCession from './ExportCession.vue';
    
// Variables & sate
    const cessions = ref(null);
    
    const router = useRouter();

    const loading = ref(false);
    
    const statut = ref(0);
    const dateStart = ref(null);
    const dateEnd = ref(null);
// Functions

    const details = (obj) => {
        router.push({ name: 'ministere-cession-details', params: { id: obj.id } })
    }

    const filterCession = async (state, start, end) => {
        statut.value = state;
        dateStart.value = start;
        dateEnd.value = end;
        
        try {
            
            const profil = JSON.parse(localStorage.getItem('profil'));

            const response = await ministereService.filterCessionByTPI(
                profil.user.id_tpi, 
                statut.value, 
                dateStart.value, 
                dateEnd.value
            );
            
            cessions.value = response.data.cessions
            
        } catch (error) {
            console.error(error)
        }
    }

    const fetchAllCession = async() => {
        try {
            const profil = JSON.parse(localStorage.getItem('profil'));

            const response = await ministereService.getAllCessionByTPI(profil.user.id_tpi);
            cessions.value = response.data.cessions

        } catch (error) {
            console.error(error)
        }
    }

// Lifecycle hooks
    onMounted(async() =>{
        loading.value = true;
        
        await fetchAllCession();

        setTimeout(() => {
            loading.value = false;
        }, 700);
    });
</script>