<template>
    <VCardForm 
        title="Nouvelle cour d'appel"
        subtitle="Remplissez le formulaire pour enregistrer une nouvelle cour d'appel dans le système."
        width="600"
    >
        <template #card_text>
            <v-row>
                <v-col class="!py-0">
                    <VInput 
                        label="Nom cour d'appel" 
                        placeholder="Nom de la Cour d'Appel" 
                        type="text" 
                        v-model:model="form.name" 
                        v-model:error="errors.name"
                    />
                </v-col>
            </v-row>
            
            <v-row>
                <v-col class="!py-0">
                    <VSelect 
                        label="Province" 
                        placeholder="Sélectionner une province"  
                        :items="props.provinces" 
                        value="id" 
                        title="name" 
                        v-model:model="form.province" 
                        v-model:error="errors.province"
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
                @click="saveCA" 
            />
        </template>
    </VCardForm>
</template>

<script setup>

// Imports
    import { reactive, ref } from 'vue';
    import VButton from '@/components/VButton.vue';
    import VInput from '@/components/VInput.vue';
    import VSelect from '@/components/VSelect.vue';
    import VCardForm from '@/components/VCardForm.vue';
    import caService from '@/services/instances/caService';
    import formErrorUtils from "@/utils/formErrorUtils";
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";

// VAriables & state
    const model = defineModel();
    const props = defineProps(['provinces']);
    const emit = defineEmits(['reload']);

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const form = reactive({
        name: null,
        province: null
    })

    const errors = reactive({
        name: null,
        province: null
    })

    
// Functions
    const closeDialog = () => {
        model.value = !model.value
    }

    const saveCA = async () => {
        openLoader(true);
        
        try {
            const response = await caService.createCA(form);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Nouvelle cour d\'appel enregistrée avec succès.", "success");
                openLoader(false);
            }, 1000)
        } catch (error) {
            openLoader(false);

            if (error.response.data.errors) {
                formErrorUtils.setErrors(error.response.data.errors, errors)
            }
        }
    }
</script>