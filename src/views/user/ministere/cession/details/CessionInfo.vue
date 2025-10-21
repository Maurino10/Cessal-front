<template>
    <div class="h-full p-5 rounded-lg custom-border">
        
        <div class="mb-10">
            <h3 class="text-xl font-bold text-gray-700">Informations Générales</h3>
        </div>

        <div v-if="props.cession" class="rounded-lg">
            
            <v-row>
                <v-col cols="12" class="!py-1">
                    <div class="flex flex-col gap-2 px-6 py-5 rounded-lg highlight">
                        <p class="text-sm tracking-wide text-gray-300 uppercase">
                            Numéro d'ordonnance
                        </p>
                        <h4 class="text-base font-bold text-white">
                            {{ props.cession.ordonnance?.numero_ordonnance || 'Non définie'}}
                        </h4>
                    </div>
                </v-col>

                <v-col cols="12" class="!py-1">
                    <div class="flex flex-col gap-2 px-6 py-5 rounded-lg bg-light_gray custom-border">
                        <p class="text-sm tracking-wide text-gray-500 uppercase">
                            Numéro du dossier
                        </p>
                        <h4 class="text-base">
                            {{ props.cession.numero_dossier }}
                        </h4>
                    </div>
                </v-col>

                 <v-col cols="12" class="!py-1">
                    <div class="flex flex-col gap-2 px-6 py-5 rounded-lg bg-light_gray custom-border">
                        <p class="text-sm tracking-wide text-gray-500 uppercase">
                            Date du contrat
                        </p>
                        <h4 class="text-base">
                            {{ format.formatDate(props.cession.date_contrat) }}
                        </h4>
                    </div>
                </v-col>

                <v-col cols="12" class="!py-1">
                    <div class="flex flex-col gap-2 px-6 py-5 rounded-lg bg-light_gray custom-border">
                        <p class="text-sm tracking-wide text-gray-500 uppercase">
                            Date de cession
                        </p>
                        <h4 class="text-base">
                            {{ format.formatDate(props.cession.date_cession) }}
                        </h4>
                    </div>
                </v-col>

                <v-col cols="12" class="!py-1">
                    <div class="flex flex-col gap-2 px-6 py-5 rounded-lg bg-light_gray custom-border">
                        <p class="text-sm tracking-wide text-gray-500 uppercase">
                            Montant à remboursé
                        </p>
                        <h4 class="text-base">
                            {{ format.formatMontant(props.cession.reimbursed_amount) }}
                        </h4>
                    </div>
                </v-col>

                <v-col cols="12" class="!py-1">
                    <div class="flex flex-col gap-2 px-6 py-5 rounded-lg bg-light_gray custom-border">
                        <p class="text-sm tracking-wide text-gray-500 uppercase">
                            Objet de la demande
                        </p>
                        <h4 class="text-base">
                            {{ props.cession.request_subject }}
                        </h4>
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>

</template>

<script setup>
// Imports
    import format from '@/utils/format';
    // Variables & state
    
    const props = defineProps(['cession']);
    const emit = defineEmits(['reload']);
// Functions

// Lifecycle hooks

</script>
