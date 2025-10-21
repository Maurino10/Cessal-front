<template>

    <VBreadCrumb 
        :items="[
            {title: 'cessions', disabled: true},
            {title: `${route.params.id}`, disabled: false},
        ]" 
    />

    <div class="main-body">
        <VMainHeader 
            v-if="cession"
            :icon="{ icon: 'mdi-chart-donut', bgColor: '!bg-teal-400'}"
            :title="cession.numero_dossier" 
            subtitle="Numéro du dossier" 
        >
            <template #status>
                <v-chip :color="cession.status_color">
                    {{ cession.status_label }}
                </v-chip>
            </template>
            <template #actions>
                <VButton
                    v-if="cession.can_accept && cession.status_cession !== '2'"
                    title="Accepter"
                    icon="mdi-check"
                    class="!bg-emerald-50 !border !border-emerald-200 !text-emerald-500"
                    @click="cessionAccepted"
                />
                <VButton
                    title="Refuser"
                    icon="mdi-close"
                    class="!bg-red-50 !border !border-red-200 !text-red-500"
                    @click="cessionRefused"
                />
            </template>
        </VMainHeader>
    
    
        <v-row v-if="loading">
            <v-col cols="12" md="8">
                <v-skeleton-loader
                    type="card, card"
                    class="mt-4"
                />
            </v-col>
    
            <v-col cols="12" md="4">
                <v-skeleton-loader
                    type="image, image, image"
                    class="mt-4"
                />
            </v-col>
        </v-row>
    
        <v-row v-else-if="cession !== null">
            <v-col cols="12" md="8">
                <v-row>
                    <v-col>
                        <CessionJustificatifs
                            :justificatifs="justificatifs"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <CessionLender 
                            :lenders="lenders"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <CessionBorrower 
                            :borrowers="borrowers"
                            @reload="reload"
                        />
                    </v-col>
                </v-row>
            </v-col>
    
            <v-col cols="12" md="4">
                <CessionInfo 
                    :cession="cession" 
                    @reload="fetchCession" 
                />
            </v-col>
        </v-row>
    </div>

</template>

<script setup>
// Imports
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import VMainHeader from '@/components/VMainHeader.vue';
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import VButton from '@/components/VButton.vue';
    import magistratService from '@/services/cessions/magistratService';
    import CessionInfo from './details/CessionInfo.vue';
    import CessionBorrower from './details/CessionBorrower.vue';
    import CessionLender from './details/CessionLender.vue';
    import CessionJustificatifs from './details/CessionJustificatifs.vue';


// Variables & state    
    const route = useRoute();

    const cession = ref(null);
    const justificatifs = ref(null);
    const borrowers = ref(null);
    const lenders = ref(null);

    const loading = ref(false);
// Functions

    const reload = async () => {
        await fetchCessionBorrowers();
        await fetchCession();
    }

    const cessionAccepted = async () => {
        try {
            const response = await magistratService.acceptCession(route.params.id);

            await fetchCession();
        } catch (error) {
            console.log(error)
        }
    }

    const cessionRefused = async () => {
        try {
            const response = await magistratService.refuseCession(route.params.id);
            await fetchCession();
            
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCession = async () => {
        try {
            const response = await magistratService.getCession(route.params.id);
            cession.value = response.data.cession;

        } catch (error) {
            console.log(error)
        }
    }

    const fetchCessionBorrowers = async () => {
        try {
            const response = await magistratService.getAllCessionBorrowerByCession(route.params.id);
            borrowers.value = response.data.borrowers;

        } catch (error) {
            
        }
    }

    const fetchCessionJustificatifs = async () => {
        try {
            const response = await magistratService.getAllCessionJustificatifByCession(route.params.id);
            justificatifs.value = response.data.justifs;
            
        } catch (error) {
            
        }
    }

    const fetchCessionLenders = async () => {
        try {
            const response = await magistratService.getAllCessionLenderByCession(route.params.id);
            lenders.value = response.data.lenders;
        } catch (error) {
            
        }
    }
// Lifecycle hooks
    onMounted(async () => {
        loading.value = true;

        await Promise.all([
            fetchCession(),
            fetchCessionJustificatifs(),
            fetchCessionBorrowers(),
            fetchCessionLenders()
        ]);

        setTimeout(() => {
            loading.value = false;
        }, 700);
    })
</script>