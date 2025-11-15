<template>
    <VCardForm
        :title="`${ props.borrower.natural_person.last_name } ${ props.borrower.natural_person.first_name  }`"
        width="700"
        class="!max-h-[95vh]"
    >
        <template #card_text>

            <div>
                <v-row>
                    <v-col>
                        <div class="flex flex-col px-4 py-2 border rounded-lg">
                            <p class="text-sm leading-9 tracking-wide text-gray-400">
                                CIN
                            </p>

                            <h5 class="font-mono text-base">
                                {{ props.borrower.natural_person.cin }}
                            </h5>
                        </div>
                    </v-col>
                </v-row>
                
                <v-row>
                    <v-col>
                        <div class="flex flex-col px-4 py-2 border rounded-lg">
                            <p class="text-sm leading-9 tracking-wide text-gray-400">
                                Adresse
                            </p>
    
                            <h5 class="text-base font-medium">
                                {{ props.borrower.natural_person_address.address }}
                            </h5>
                        </div>
                    </v-col>

                </v-row>

                <v-row>
                    <v-col>
                        <div class="flex flex-col px-4 py-2 border rounded-lg">
                            <p class="text-sm leading-9 tracking-wide text-gray-400">
                                Observation
                            </p>
    
                            <h5 class="text-base font-medium">
                                {{ props.borrower.remark ?? 'Aucune' }}
                            </h5>
                        </div>
                    </v-col>

                </v-row>
                
                <v-row>
                    <v-col>
                        <div class="flex flex-col px-4 py-2 border rounded-lg">
                            <p class="text-sm leading-9 tracking-wide text-gray-400">
                                Montant Revenu
                            </p>

                            <h5 class="text-base font-medium">
                                {{ format.formatMontant(props.borrower.salary_amount) }}
                            </h5>
                        </div>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <div>
                            <label class="ml-1 text-sm leading-9 tracking-wide text-gray-400">Montant accordé (en Ariary)</label>
                            
                            <v-text-field 
                                v-model="form.granted_amount" 
                                label="Montant accordé (en Ariary)"
                                type="number"
                                density="compact" 
                                variant="outlined" 
                                color="#10b981"
                                bg-color="#f1f1f1"
                                base-color="#f1f1f1"
                                single-line
                                autocomplete="off"
                                :error-messages="errors.granted_amount ? [errors.granted_amount] : []"
                                @update:model-value="errors.granted_amount = null"
                            ></v-text-field>
                        </div>
                    </v-col>
                </v-row>
            </div>
            
        </template>

        <template #card_actions>
            <VButton title="Annuler" class="btn-secondary" @click="closeDialog"  />
            
            <VButton title="Modifier" class="btn-primary"
                v-if="props.borrower.quota"
                @click="editQuota" 
            />

            <VButton title="Enregistrer" class="btn-primary" 
                v-else
                @click="saveQuota" 
            />
        </template>
    </VCardForm>
</template>

<script setup>
// Imports
    import { onMounted, reactive, ref } from 'vue';
    import VCardForm from '@/components/VCardForm.vue';
    import VInput from '@/components/VInput.vue';
    import VButton from '@/components/VButton.vue';
    import magistratService from '@/services/cessions/magistratService';
    import format from '@/utils/format'
    import formErrorUtils from "@/utils/formErrorUtils";
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";

// Variables & state
    const model = defineModel();

    const props = defineProps(['borrower']);
    const emit = defineEmits(['reload']);    

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const form = reactive({
        granted_amount: null,
    });

    const errors = reactive({
        granted_amount: null,
    });

// Functions

    const closeDialog = () => {
        model.value = !model.value
    }


    const saveQuota = async () => {
        openLoader(true);

        try {
                        
            const response = await magistratService.storeCessionBorrowerQuota(props.borrower.id_cession, props.borrower.id, form);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Numéro d'ordonnance de la cession enregistré avec succès.", "success");
                openLoader(false);
            }, 1000)
        } catch (error) {
            openLoader(false);

            if (error.response.data.errors) {
                formErrorUtils.setErrors(error.response.data.errors, errors)
            }
        }
    }

    const editQuota = async () => {
        openLoader(true);

        try {
                        
            const response = await magistratService.editCessionBorrowerQuota(props.borrower.id_cession, props.borrower.id, props.borrower.quota.id, form);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Numéro d'ordonnance de la cession enregistré avec succès.", "success");
                openLoader(false);
            }, 1000)
        } catch (error) {
            openLoader(false);

            if (error.response.data.errors) {
                formErrorUtils.setErrors(error.response.data.errors, errors)
            }
        }
    }

// Lifecycle hooks
    onMounted(() => {
        form.granted_amount = props.borrower.quota ? props.borrower.quota.granted_amount : null;
    })
</script>