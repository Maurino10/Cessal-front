<template>
    <v-skeleton-loader v-if="loading"
      type="card"
      class="mt-4"
    />

    <div v-else-if="cessionInfos !== null" class="px-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span>
                    <v-icon
                        icon="mdi-text-box-outline"
                        size="32"
                        color="#10b981"
                    ></v-icon>
                </span>

                <h4 class="text-xl font-bold">
                    Informations Générales
                </h4>
            </div>
            
            <VButton 
                v-if="cessionInfos.signed === 0"
                title="Modifier"
                icon="mdi-pencil"
                class="btn-secondary"
                @click="overlay = !overlay"
            />
        </div>
        
        <div v-if="cessionInfos" class="mt-5 rounded-lg">
            <v-row>
                <v-col cols="12">
                    <div class="flex flex-wrap justify-between gap-4">
                        <div class="flex flex-col flex-grow px-6 py-4 rounded-lg custom-border bg-light_gray">
                            <p class="text-sm leading-9 tracking-wide text-gray-500 uppercase">
                                Numéro du dossier
                            </p>
                            <h4 class="text-base">
                                {{ cessionInfos.numero_dossier }}
                            </h4>
                        </div>
    
                        <div class="flex flex-col flex-grow px-6 py-4 rounded-lg custom-border bg-light_gray">
                            <p class="text-sm leading-9 tracking-wide text-gray-500 uppercase">
                                Date du contrat
                            </p>
                            <h4 class="text-base">
                                {{ format.formatDate(cessionInfos.date_contrat) }}
                            </h4>
                        </div>
    
                        <div class="flex flex-col flex-grow px-6 py-4 rounded-lg custom-border bg-light_gray">
                            <p class="text-sm leading-9 tracking-wide text-gray-500 uppercase">
                                Date de cession
                            </p>
                            <h4 class="text-base">
                                {{ format.formatDate(cessionInfos.date_cession) }}
                            </h4>
                        </div>
    
                        <div class="flex flex-col flex-grow px-6 py-4 rounded-lg custom-border bg-light_gray">
                            <p class="text-sm leading-9 tracking-wide text-gray-500 uppercase">
                                Montant à remboursé
                            </p>
                            <h4 class="text-base">
                                {{ format.formatMontant(cessionInfos.reimbursed_amount) }}
                            </h4>
                        </div>

                        <div class="flex flex-col px-6 py-4 rounded-lg highlight">
                            <p class="text-sm leading-9 tracking-wide text-gray-300 uppercase">
                                Numéro d'ordonnance
                            </p>
                            <h4 class="text-base text-white">
                                {{ cessionInfos.ordonnance?.numero_ordonnance || 'En attente'}}
                            </h4>
                        </div>
                        
                    </div>
                </v-col>
            </v-row>
            
            <v-row>
                <v-col cols="12">
                    <div class="flex flex-col flex-grow px-6 py-4 rounded-lg custom-border bg-light_gray">
                        <p class="text-sm leading-9 tracking-wide text-gray-500 uppercase">
                            Objet de la demande
                        </p>
                        <h4 class="text-base">
                            {{ cessionInfos.request_subject }} 
                        </h4>
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>

    <v-overlay v-model="overlay" class="flex items-center justify-center">
        <EditCession 
            v-model="overlay" 
            :cession="cessionInfos" 
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

    const props = defineProps({
        id: [String, Number],
        cession: Object
    });
    
    const cessionInfos = ref(null);

    const overlay = ref(false);

    const loading = ref(false);
// Functions

    const fetchCessionInfos = async () => {
        try {
            const response = await greffierService.getCession(route.params.id);
            cessionInfos.value = response.data.cession;
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
