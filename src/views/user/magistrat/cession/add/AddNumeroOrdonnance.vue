<template>
    <VCardForm
        title="Numéro d'ordonnance de la cession "
    >
        <template #card_text>
            <v-row>
                <v-col>
                    <VInput label="Numéro d'ordonnance" placeholder="ex: ORD0001"
                        v-model:model="form.numero_ordonnance"
                        v-model:error="errors.numero_ordonnance"
                    />
                </v-col>
            </v-row>
        </template>

        <template #card_actions>            
            <VButton title="Annuler" class="btn-secondary" @click="closeDialog"  />

            <VButton v-if="props.cession.ordonnance" title="Enregistrer" class="btn-primary" 
                @click="editOrdonnance" 
            />

            <VButton v-else title="Enregistrer" class="btn-primary" 
                @click="saveOrdonnance" 
            />
        </template>
    </VCardForm>
</template>

<script setup>
// Imports
    import { onMounted, reactive } from 'vue';
    import VCardForm from '@/components/VCardForm.vue';
    import VInput from '@/components/VInput.vue';
    import VButton from '@/components/VButton.vue';
    import magistratService from '@/services/cessions/magistratService';
    import formErrorUtils from "@/utils/formErrorUtils";
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";

// Variables & state

    const model = defineModel();

    const props = defineProps(['cession']);
    const emit = defineEmits(['reload']);

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();
    

    const form = reactive({
        numero_ordonnance: null
    });

    const errors = reactive({
        numero_ordonnance: null
    });

// Functions
    const closeDialog = () => {
        model.value = !model.value
    }

    const saveOrdonnance = async () => {
        openLoader(true);

        try {
            const response = await magistratService.storeNumeroOrdonnance(props.cession.id, form);
            
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

    const editOrdonnance = async () => {
        openLoader(true);
        
        try {
            const response = await magistratService.editNumeroOrdonnance(props.cession.id, props.cession.ordonnance.id, form);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Numéro d'ordonnance de la cession a été mis à jour.", "success");
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
        form.numero_ordonnance = props.cession.ordonnance 
            ? props.cession.ordonnance.numero_ordonnance 
            : null;
    })
</script>