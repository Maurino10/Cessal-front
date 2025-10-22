<template>
    <VCardForm 
        title="Ajout provision"
        subtitle="Remplissez le formulaire pour enregistrer la provision dans le système."
        width="600"
    >
        <template #card_text>
            <v-row>
                <v-col class="!py-0">
                    <VInput 
                        label="Montant" 
                        type="number"
                        placeholder="Montant de la provision" 
                        v-model:model="form.provision_amount" 
                        v-model:error="errors.provision_amount" 
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col class="!py-0">
                    <VInputDate 
                        label="Date" 
                        v-model:model="form.date_provision" 
                        v-model:error="errors.date_provision" 
                    />
                </v-col>
            </v-row>
        </template>
        <template #card_actions>
            <VButton 
                title="Annuler" 
                class="btn-cancel" 
                @click="closeDialog"  
            />
            <VButton 
                title="Enregistrer" 
                class="btn-submit" 
                @click="saveProvision" 
            />
        </template>
    </VCardForm>
</template>

<script setup>
// Imports
    import { reactive, ref } from 'vue';
    import VButton from '@/components/VButton.vue';
    import VInput from '@/components/VInput.vue';
    import VInputDate from '@/components/VInputDate.vue';
    import VCardForm from '@/components/VCardForm.vue';
    import provisionService from '@/services/settings/provisionService';
    import formErrorUtils from "@/utils/formErrorUtils";
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";

// Variables & state
    const model = defineModel();
    const emit = defineEmits(['reload']);

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const form = reactive({
        provision_amount: null,
        date_provision: new Date().toISOString().split("T")[0]
    })

    const errors = reactive({
        provision_amount: null,
        date_provision: null
    })

    
// Functions
    const closeDialog = () => {
        model.value = !model.value
    }

    const saveProvision = async () => {
        openLoader(true);
        
        try {
            const response = await provisionService.createProvision(form);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Provision enregistrée avec succès.", "success");
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

</script>