<template>
    <div class="w-[450px] h-[95vh] mr-2 rounded-lg bg-white scale-in-hor-right py-4 px-8 overflow-y-auto card">
        <div class="relative">
            <h3 class="text-2xl">
                Saisies non finalisées
            </h3>

            <button class="absolute px-2 py-1 bg-gray-100 rounded-full -top-2 -right-6"
                @click="closeDialog"
            >
                <v-icon
                    icon="mdi-close"
                    size="16"
                >

                </v-icon>
            </button>
        </div>

        <div class="mt-8">
            <v-row v-for="(r, index) in props.data" :key="index">
                <v-col>
                    <div class="p-4 rounded-lg bg-gray-50 custom-shadow">
                        <h4># {{ r.file.split('-')[2].replace('.json', '') }}</h4>

                        <ul>
                            <li class="flex gap-2">
                                <p class="text-sm text-gray-400">Numéro du dossier :</p>
                                <p class="text-sm">{{ r.data.form.numero_dossier }}</p>
                            </li>
                            <li class="flex gap-2">
                                <p class="text-sm text-gray-400">Date de la cession :</p>
                                <p class="text-sm">{{ format.formatDate(r.data.form.date_cession) }}</p>
                            </li>
                             <li class="flex gap-2">
                                <p class="text-sm text-gray-400 text-nowrap">Objet de la demande :</p>
                                <p class="overflow-hidden text-sm truncate text-nowrap">
                                    {{ r.data.form.request_subject }}
                                </p>
                            </li>
                            <li class="flex gap-2">
                                <p class="text-sm text-gray-400">Montant à remboursé :</p>
                                <p class="text-sm">{{ format.formatMontant(r.data.form.reimbursed_amount) }}</p>
                            </li>
                        </ul>

                        <div class="flex justify-between w-full gap-4 pt-4 mt-4 border-t">
                            <VButton  
                                title="Reprendre"
                                class="flex-grow !border !bg-transparent !border-emerald-600 !text-emerald-600"
                                @click="resumeDraft(r)"
                            />
                            <VButton  
                                title="Supprimer"
                                class="flex-grow !border !bg-transparent !border-red-500 !text-red-500"
                                @click="emit('delete-draft', r)"
                            />
                        </div>

                    </div>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script setup>
// Imports
    import VButton from '@/components/VButton.vue'
    import VExpansionPanel from '@/components/VExpansionPanel.vue'
    import format from '@/utils/format';

// Variables & state
    const model = defineModel();

    const props = defineProps(['data']);

    const emit = defineEmits(['resume-draft', 'delete-draft'])

    const keyMap = {
        'numero_dossier': 'Numéro d\'ordonnance',
        'request_subject': 'Objet de la demande',
        'reimbursed_amount': 'Montant à remboursé',
        'date_cession': 'Date de cession',
    };

// Functions
    const closeDialog = () => {
        model.value = !model.value
    }


    const resumeDraft = (draft) => {
        emit('resume-draft', draft);
        closeDialog();
    }
</script>

<style scoped>
    .card {
        scrollbar-gutter: stable; /* évite que le contenu bouge quand la barre apparaît */
    }

    /* optionnel : style custom scrollbar (Webkit) */
    .card::-webkit-scrollbar {
        width: 8px;
        background-color: #ddd;
    }
    .card::-webkit-scrollbar-thumb {
        background: #777;
        border-radius: 10px;
    }

</style>