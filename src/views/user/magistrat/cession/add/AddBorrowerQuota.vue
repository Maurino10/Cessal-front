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
                        <div class="flex flex-col p-4 bg-gray-100 rounded-lg">
                            <p class="text-base tracking-wider text-gray-500">
                                CIN
                            </p>

                            <h5 class="text-base font-medium">
                                {{ props.borrower.natural_person.cin }}
                            </h5>
                        </div>
                    </v-col>
                </v-row>
                
                <v-row>
                    <v-col>
                        <div class="flex flex-col p-4 bg-gray-100 rounded-lg">
                            <p class="text-base tracking-wider text-gray-500">
                                Adresse
                            </p>
    
                            <h5 class="text-base font-medium">
                                {{ props.borrower.natural_person.address }}
                            </h5>
                        </div>
                    </v-col>

                </v-row>

                <v-row>
                    <v-col>
                        <div class="flex flex-col p-4 bg-gray-100 rounded-lg">
                            <p class="text-base tracking-wider text-gray-500">
                                Observation
                            </p>
    
                            <h5 class="text-base font-medium">
                                {{ props.borrower.remark }}
                            </h5>
                        </div>
                    </v-col>

                </v-row>
                
                <v-row>
                    <v-col>
                        <div class="flex flex-col p-4 bg-gray-100 rounded-lg">
                            <p class="text-base tracking-wider text-gray-500">
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
                        <VInput 
                            label="Montant accordé"
                            type="number"
                            v-model:model="form.granted_amount"
                            v-model:error="errors.granted_amount"
                        />
                    </v-col>
                </v-row>
            </div>
            
        </template>

        <template #card_actions>
            <VButton title="Annuler" class="btn-cancel" @click="closeDialog"  />
            
            <VButton title="Enregistrer" class="btn-submit"
                v-if="props.borrower.quota"
                @click="editQuota" 
            />

            <VButton title="Enregistrer" class="btn-submit" 
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