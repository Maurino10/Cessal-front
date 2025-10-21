<template>
    <VCardForm
        title="Modification de la cession"
        subtitle="Modifiez les informations de la cession sélectionnée"
        width="800"
    >
        <template #card_text>
            <v-row>
                <v-col class="!py-0">
                    <VInput label="Numéro du dossier" type="text" placeholder="Entrer le numéro du dossier"
                        v-model:model="form.numero_dossier"
                        v-model:error="errors.numero_dossier"
                    />
                </v-col>
                <v-col class="!py-0">
                    <VInputDate label="Date du contrat"
                        v-model:model="form.date_contrat"
                        v-model:error="errors.date_contrat"
                    />
                </v-col>
                <v-col class="!py-0">
                    <VInputDate label="Date de cession"
                        v-model:model="form.date_cession"
                        v-model:error="errors.date_cession"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col class="!py-0">
                    <VInput label="Montant à remboursé" type="number" placeholder="Entrer la montant à remboursé"
                        v-model:model="form.reimbursed_amount"
                        v-model:error="errors.reimbursed_amount"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col class="!py-0">
                    <VTextArea label="Objet de la demande" placeholder="Entrer l'objet de la demande"
                        v-model:model="form.request_subject"
                        v-model:error="errors.request_subject"
                    />
                </v-col>
            </v-row>
        </template>

        <template #card_actions>
            <VButton title="Annuler" class="btn-cancel" @click="closeDialog"  />
            <VButton title="Mettre à jour" class="btn-submit" @click="editCession" />
        </template>
    </VCardForm>
</template>
<script setup>
// Imports
    import { onMounted, reactive, ref } from 'vue';
    import VCardForm from '@/components/VCardForm.vue';
    import VInput from '@/components/VInput.vue';
    import VInputDate from '@/components/VInputDate.vue';
    import VButton from '@/components/VButton.vue';
    import VTextArea from '@/components/VTextArea.vue';
    import greffierService from '@/services/cessions/greffierService';
    import formErrorUtils from '@/utils/formErrorUtils';
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";

// Variables & state

    const model = defineModel();
    
    const props = defineProps(['cession']);
    const emit = defineEmits(['reload']);
    
    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const form = reactive({
        numero_dossier: null,
        date_contrat: null,
        request_subject: null,
        reimbursed_amount: null,
        date_cession: new Date().toISOString().split("T")[0],
    });

    const errors = reactive({
        numero_dossier: null,
        date_contrat: null,
        request_subject: null,
        reimbursed_amount: null,
        date_cession: null,
    });

// Functions 

    const closeDialog = () => {
        model.value = !model.value
    }
    
    const editCession = async () => {
        openLoader(true);

        try {
            
            const response = await greffierService.updateCession(props.cession.id, form);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Cession mise à jour avec succès.", "success");
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
        form.numero_dossier = props.cession.numero_dossier;
        form.date_contrat = props.cession.date_contrat;
        form.request_subject = props.cession.request_subject;
        form.reimbursed_amount = props.cession.reimbursed_amount;
        form.date_cession = props.cession.date_cession.split(" ")[0];
    })
</script>