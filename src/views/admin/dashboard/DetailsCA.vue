<template>
    <VHeader title="Tableau de bord"   />
    <VBreadCrumb 
        :items="[
            {title: 'tableau de bord', disabled: true},
            {title: 'cours d\'appel', disabled: true},
            {title: route.params.id, disabled: false},
        ]" 
    />
    <div v-if="details" class="flex flex-col items-center gap-3 mb-8">
        <span>
            <v-icon 
                icon="mdi-scale-balance" 
                class="text-white p-8 rounded-lg !bg-purple-500 icon-shadow" 
                size="36"
            ></v-icon>
        </span>
        <div>
            <h2 class="text-xl">
                {{ details.name }}
            </h2>
            <p class="text-gray-500 text-caption whitespace-nowrap">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
        </div>
        <v-chip v-if="route.query.debut && route.query.fin" label>
            <v-icon
                icon="mdi-calendar"
                size="18"
                start
            ></v-icon>
            <p>{{ format.formatDate(route.query.debut) }} - {{ format.formatDate(route.query.fin) }}</p> 
        </v-chip>
    </div>

    <div v-if="details" class="mb-8">
        <v-row>
            <v-col cols="12" md="4">
                <div class="px-4 py-2 overflow-hidden rounded-lg custom-shadow"> 
                    <ChartStatus 
                        :total="details.total" 
                        :value="details.save" 
                        colorValue="#2196F3"
                        label="Enregistrée"
                        icon="mdi-content-save-outline" 
                    />
                </div>
            </v-col>

            <v-col cols="12" md="4">
                <div class="px-4 py-2 overflow-hidden rounded-lg custom-shadow"> 
                    <ChartStatus 
                        :total="details.total" 
                        :value="details.waiting" 
                        colorValue="#FB8C00"
                        label="En cours d'approbation"
                        icon="mdi-timer-sand" 
                    />
                </div>
            </v-col>

            <v-col cols="12" md="4">
                <div class="px-4 py-2 overflow-hidden rounded-lg custom-shadow"> 
                    <ChartStatus 
                        :total="details.total" 
                        :value="details.approved" 
                        colorValue="#4CAF50"
                        label="Approuvée"
                        icon="mdi-check" 
                    />
                </div>
            </v-col>

            <v-col cols="12" md="4">
                <div class="px-4 py-2 overflow-hidden rounded-lg custom-shadow"> 
                    <ChartStatus 
                        :total="details.total" 
                        :value="details.rejected" 
                        colorValue="#F44336"
                        label="Rejetée"
                        icon="mdi-close" 
                    />
                </div>
            </v-col>

            <v-col cols="12" md="4">
                <div class="px-4 py-2 overflow-hidden rounded-lg custom-shadow"> 
                    <ChartStatus 
                        :total="details.total" 
                        :value="details.signed" 
                        colorValue="#8E24AA"
                        label="Signée"
                        icon="mdi-draw" 
                    />
                </div>
            </v-col>

            <v-col cols="12" md="4">
                <div class="px-4 py-2 overflow-hidden rounded-lg custom-shadow"> 
                    <ChartStatus 
                        :total="details.total" 
                        :value="details.total" 
                        colorValue="#455A64"
                        label="Total"
                        icon="mdi-sigma" 
                    />
                </div>
            </v-col>
        </v-row>
    </div>

    <div>
        <h4 class="py-4 text-xl font-bold">Liste des TPI</h4>
        
        <div class="overflow-hidden rounded-lg custom-shadow">
            <TpiBarChart
                v-for="tpi in tpis"
                :key="tpi.id"
                :data="tpi"
                class="border-b last:!border-0"
            />
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import VHeader from '@/components/VHeader.vue'
    import VBreadCrumb from '@/components/VBreadCrumb.vue'
    import dashboardService from '@/services/dashboard/dashboardService';
    import ChartStatus from './ChartStatus.vue';
    import TpiBarChart from './TpiBarChart.vue';
    import format from '@/utils/format';

    const route = useRoute();
    const details = ref(null);
    const tpis = ref(null);


    const fetchDetailsCA  = async () => {
        try {
            const response = await dashboardService.getDetailsCA(
                route.params.id,
                route.query.debut,
                route.query.fin,
            );
            details.value = response.data.details;
            tpis.value = response.data.tpis;
        } catch (error) {
            console.error(error.response.data);

        }
    }

    onMounted(async () => {

        await fetchDetailsCA();
    })
</script>