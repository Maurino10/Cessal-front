<template>
    <VCardForm 
        title="Nouvelle province"
        subtitle="Remplissez le formulaire pour enregistrer une nouvelle province dans le système."
        width="600"
    >
        <template #card_text>
            <v-row>
                <v-col class="!py-0">
                    <VInput 
                        label="Nom province" 
                        placeholder="Nom de la province" 
                        v-model:model="form.name" 
                        v-model:error="errors.name" 
                    />
                </v-col>
            </v-row>
        </template>
        <template #card_actions>
            <VButton 
                title="Annuler"  
                @click="closeDialog"  
            />
            <VButton 
                title="Enregistrer" 
                class="btn-primary" 
                @click="saveProvince" 
            />
        </template>
    </VCardForm>
</template>

<script setup>
// Imports
    import { reactive, ref } from 'vue';
    import VButton from '@/components/VButton.vue';
    import VInput from '@/components/VInput.vue';
    import VCardForm from '@/components/VCardForm.vue';
    import provinceService from '@/services/territories/provinceService';
    import formErrorUtils from "@/utils/formErrorUtils";
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";

// Variables & state
    const model = defineModel();
    const emit = defineEmits(['reload']);

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const form = reactive({
        name: null
    })

    const errors = reactive({
        name: null
    })

    
// Functions
    const closeDialog = () => {
        model.value = !model.value
    }

    const saveProvince = async () => {
        openLoader(true);
        
        try {
            const response = await provinceService.createProvince(form);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Nouvelle province enregistrée avec succès.", "success");
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