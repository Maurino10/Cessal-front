<template>
    <v-skeleton-loader
      v-if="loading"
      type="card"
      class="mt-4"
    />

    <div v-else-if="cession !== null">
        <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-700">Informations Générales</h3>
            
            <VButton 
                v-if="cession.signed === 0"
                title="Modifier"
                icon="mdi-pencil"
                class="btn-cancel"
                @click="overlay = !overlay"
            />
        </div>
        
        <div v-if="cession" class="mt-6 rounded-lg">
            <v-row>
                <v-col cols="12" md="6">
                    <div class="flex flex-col gap-3 px-6 py-5 rounded-lg bg-light_gray custom-border">
                        <p class="text-sm tracking-wide text-gray-500 uppercase">
                            Numéro du dossier
                        </p>
                        <h4 class="text-lg">
                            {{ cession.numero_dossier }}
                        </h4>
                    </div>
                </v-col>
                
                <v-col cols="12" md="6">
                    <div class="flex flex-col gap-3 px-6 py-5 rounded-lg highlight">
                        <p class="text-sm tracking-wide text-gray-300 uppercase">
                            Numéro d'ordonnance
                        </p>
                        <h4 class="text-lg text-white">
                            {{ cession.ordonnance?.numero_ordonnance || 'En attente'}}
                        </h4>
                    </div>
                </v-col>
            </v-row>
            
            <v-row>
                <v-col cols="12" md="4">
                    <div class="flex flex-col gap-3 px-6 py-5 rounded-lg bg-light_gray custom-border">
                        <p class="text-sm tracking-wide text-gray-500 uppercase">
                            Date du contrat
                        </p>
                        <h4 class="text-lg">
                            {{ format.formatDate(cession.date_contrat) }}
                        </h4>
                    </div>
                </v-col>

                <v-col cols="12" md="4">
                    <div class="flex flex-col gap-3 px-6 py-5 rounded-lg bg-light_gray custom-border">
                        <p class="text-sm tracking-wide text-gray-500 uppercase">
                            Date de cession
                        </p>
                        <h4 class="text-lg">
                            {{ format.formatDate(cession.date_cession) }}
                        </h4>
                    </div>
                </v-col>
                
                <v-col cols="12" md="4">
                    <div class="flex flex-col gap-3 px-6 py-5 rounded-lg bg-light_gray custom-border">
                        <p class="text-sm tracking-wide text-gray-500 uppercase">
                            Montant à remboursé
                        </p>
                        <h4 class="text-lg">
                            {{ format.formatMontant(cession.reimbursed_amount) }}
                        </h4>
                    </div>
                </v-col>
            </v-row>
            
            <v-row>
                <v-col cols="12">
                    <div class="flex flex-col gap-3 px-6 py-5 rounded-lg bg-light_gray custom-border">
                        <p class="text-sm tracking-wide text-gray-500 uppercase">
                            Objet de la demande
                        </p>
                        <h4 class="text-lg">
                            {{ cession.request_subject }} 
                        </h4>
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>

    <v-overlay v-model="overlay" class="flex items-center justify-center">
        <EditCession 
            v-model="overlay" 
            :cession="cession" 
            @reload="fetchCessionInfos"
        />
    </v-overlay>
</template>

<script setup>
// Imports
    import { onMounted, ref } from 'vue';
    import VButton from '@/components/VButton.vue';
    import EditCession from '../edit/EditCession.vue';
    import greffierService from '@/services/cessions/greffierService.js';
    import format from '@/utils/format';
    import { useRoute } from 'vue-router';
// Variables & state
    const route = useRoute();
    
    const cession = ref(null);

    const overlay = ref(false);

    const loading = ref(false);
// Functions

    const fetchCessionInfos = async () => {
        try {
            const response = await greffierService.getCession(route.params.id);
            cession.value = response.data.cession;
        } catch (error) {
            
        }
    }
// Lifecycle hooks
    onMounted(async () => {
        loading.value = true;

        await fetchCessionInfos();

        setTimeout(() => {
            loading.value = false;
        }, 700);
    })
</script>
