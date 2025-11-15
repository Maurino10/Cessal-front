<template>
    <VHeader title="Tableau de bord"   />

    <VBreadCrumb 
        :items="[
            {title: 'tableau de bord', disabled: false},
        ]" 
    />

    <FilterDashboard
        @filter="filterDashboard"
    />
    <div v-if="statCessionGlobal" class="mb-8">
        <v-row>
            <v-col>
                <div class="px-4 py-2 overflow-hidden rounded-lg custom-shadow"> 
                    <ChartStatus 
                        :total="statCessionGlobal.total" 
                        :value="statCessionGlobal.save" 
                        colorValue="#2196F3"
                        label="Enregistrée"
                        icon="mdi-content-save-outline" 
                    />
                </div>
            </v-col>

            <v-col>
                <div class="px-4 py-2 overflow-hidden rounded-lg custom-shadow"> 
                    <ChartStatus 
                        :total="statCessionGlobal.total" 
                        :value="statCessionGlobal.waiting" 
                        colorValue="#FB8C00"
                        label="En cours d'approbation"
                        icon="mdi-timer-sand" 
                    />
                </div>
            </v-col>

            <v-col>
                <div class="px-4 py-2 overflow-hidden rounded-lg custom-shadow"> 
                    <ChartStatus 
                        :total="statCessionGlobal.total" 
                        :value="statCessionGlobal.approved" 
                        colorValue="#4CAF50"
                        label="Approuvée"
                        icon="mdi-check" 
                    />
                </div>
            </v-col>

            <v-col>
                <div class="px-4 py-2 overflow-hidden rounded-lg custom-shadow"> 
                    <ChartStatus 
                        :total="statCessionGlobal.total" 
                        :value="statCessionGlobal.rejected" 
                        colorValue="#F44336"
                        label="Rejetée"
                        icon="mdi-close" 
                    />
                </div>
            </v-col>

            <v-col>
                <div class="px-4 py-2 overflow-hidden rounded-lg custom-shadow"> 
                    <ChartStatus 
                        :total="statCessionGlobal.total" 
                        :value="statCessionGlobal.signed" 
                        colorValue="#8E24AA"
                        label="Signée"
                        icon="mdi-draw" 
                    />
                </div>
            </v-col>

            <v-col>
                <div class="px-4 py-2 overflow-hidden rounded-lg custom-shadow"> 
                    <ChartStatus 
                        :total="statCessionGlobal.total" 
                        :value="statCessionGlobal.total" 
                        colorValue="#455A64"
                        label="Total"
                        icon="mdi-sigma" 
                    />
                </div>
            </v-col>
        </v-row>
    </div>

    <div v-if="statCessionCA">
        <h2 class="py-4 text-xl uppercase">Cours d'appel</h2>
        
        <div class="rounded-lg custom-shadow">
            <v-table class="mt-3 border rounded-lg">
                <thead class="text-sm text-gray-400">
                    <tr>
                        <th>CA</th>
                        <th class="text-center">Nombre TPI</th>
                        <th class="text-center">Total  cession</th>
                        <th class="text-center">Détails</th>
                    </tr>
                </thead>
        
                <tbody class="text-sm text-gray-800">
                    <tr v-for="(ca, index) in statCessionCA" :key="index">
                        <td>
                            <VCellIconText
                                icon="mdi-scale-balance" 
                                :text="ca.name"
                                iconColor="text-purple-500"
                                bgColor="bg-purple-100"
                            />                  
                        </td>                   
                        <td class="text-center">{{ ca.total_tpi }}</td>
                        <td class="text-center">{{ ca.total }}</td>
                        <td class="text-center">
                            <v-icon
                                icon="mdi-chevron-right"
                                class="p-4 bg-gray-100 rounded-[14px]"
                                size="16"
                                @click="detailsCA(ca.id_ca)"
                            ></v-icon>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </div>

</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import VHeader from '@/components/VHeader.vue'
    import VBreadCrumb from '@/components/VBreadCrumb.vue'
    import VCellIconText from '@/components/VCellIconText.vue'
    import dashboardService from '@/services/dashboard/dashboardService';
    import ChartStatus from './ChartStatus.vue';
import FilterDashboard from './FilterDashboard.vue';

    const router = useRouter();

    const statCessionGlobal = ref(null);
    const statCessionCA = ref(null);

    const dateStart = ref(null);
    const dateEnd = ref(null);

    const detailsCA = (id) => {
        router.push({ 
            name: 'admin-dashboard-ca', 
            params: { id: id },
            query: {
                debut: dateStart.value,
                fin: dateEnd.value
            } 
        })
    }

    const filterDashboard = async (start, end) => {
        dateStart.value = start;
        dateEnd.value = end;
        await fetchDashboard();
    }

    const fetchDashboard  = async () => {
        try {
            const response = await dashboardService.getDashboard(dateStart.value, dateEnd.value);
            statCessionGlobal.value = response.data.statCessionGlobal;
            statCessionCA.value = response.data.statCessionCA;
        } catch (error) {
            console.error(error.response.data);

        }
    }

    onMounted(async () => {

        await fetchDashboard();
    })
</script>

<style scoped>


    :deep(.v-table__wrapper > table > tbody > tr > td) {
        padding: 14px 24px;
    }

    :deep(.v-table__wrapper > table > thead > tr > th) {
        padding: 14px 24px;
    }

    .chart-cell {
        min-width: 150px;
    }

    .mini-chart {
        display: flex;
        align-items: center;
        gap: 5px;
        height: 30px;
    }

    .bar {
        height: 100%;
        border-radius: 3px;
        transition: all 0.3s ease;
        position: relative;
        min-width: 3px;
    }
    .bar-save {
        background: #6C757D;
    }
    .bar-waiting {
        background: #0D6EFD;
    }
    .bar-approved {
        background: #11bd6dff;
    }
    .bar-rejected {
        background: #DC3545;
    }
    .bar-signed {
        background: #c920c6ff;
    }

</style>