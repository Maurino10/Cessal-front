
<template>
    <VCardForm 
        title="Modification de la déclaration de cession"
        subtitle="Remplissez le formulaire pour modifier la déclaration de cession"
        width="800"
    >   
        <template #card_text>
            <v-row>
                <v-col class="!py-0">
                    <VInput label="Reçu nº" placeholder="numéro du reçu" type="text"
                        v-model:model="form.numero_recu"
                        v-model:error="errors.numero_recu"
                    />
                </v-col>
                <v-col class="!py-0">
                    <VInput label="Feuillet nº " placeholder="numéro du feuillet" type="text"
                        v-model:model="form.numero_feuillet"
                        v-model:error="errors.numero_feuillet"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col class="!py-0">
                    <VInput label="Répertoire nº" placeholder="numéro du répertoire" type="text"
                        v-model:model="form.numero_repertoire"
                        v-model:error="errors.numero_repertoire"
                    />
                </v-col>
                <v-col class="!py-0">
                    <VInputDate label="Du "
                        v-model:model="form.date"
                        v-model:error="errors.date"
                    />
                </v-col>
            </v-row>
        </template>
        
        <template #card_actions>
            <VButton title="Annuler" class="btn-secondary" @click="closeDialog"  />
            <VButton title="Modifier" class="btn-primary" @click="editReferenceBorrower" />
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
    import greffierService from '@/services/cessions/greffierService';
    import formErrorUtils from "@/utils/formErrorUtils";
    import format from "@/utils/format";
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";
    import { useRoute } from 'vue-router';

// Variables & state
    const route = useRoute();

    const model = defineModel();

    const props = defineProps(['idCession', 'borrower', 'reference']);
    const emit = defineEmits(['reload']);


    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const form = reactive({
        numero_recu: null,
        numero_feuillet: null,
        numero_repertoire: null,
        date: null,
    });

    const errors = reactive({
        numero_recu: null,
        numero_feuillet: null,
        numero_repertoire: null,
        date: null,
    })

// Functions
    const closeDialog = () => {
        model.value = !model.value
    }

    const editReferenceBorrower = async () => {
        openLoader(true);

        try {
            const data = {
                ...form,
                date: format.convertDate(form.date)
            }
                        
            const response = await greffierService.updateCessionReference(
                route.params.id,
                props.borrower.id,
                props.reference.id,
                data
            );

            
            // Nettoyer après 1s
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Référence mise à jour avec succès.", "success");
                openLoader(false);
            }, 1000);

        } catch (error) {
            openLoader(false);

            // Gestion des erreurs de validation pour responseType = blob
            if (error.response.data.errors) {
                formErrorUtils.setErrors(error.response.data.errors, errors);
            } 
        }
    };

// Lifecycle hooks
    onMounted(() => {
        form.numero_recu = props.reference.numero_recu;
        form.numero_feuillet = props.reference.numero_feuillet;
        form.numero_repertoire = props.reference.numero_repertoire;
        form.date = props.reference.date;
    })


</script>
