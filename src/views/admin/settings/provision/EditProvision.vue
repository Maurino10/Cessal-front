<template>
    <VCardForm 
        title="Modification de la provision"
        subtitle="Modifiez le montant de la provision."
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
                @click="editProvision" 
            />
        </template>
    </VCardForm>
</template>

<script setup>
// Imports
    import { onMounted, reactive, ref } from 'vue';
    import VButton from '@/components/VButton.vue';
    import VInput from '@/components/VInput.vue';
    import VInputDate from '@/components/VInputDate.vue';
    import VCardForm from '@/components/VCardForm.vue';
    import provisionService from '@/services/settings/provisionService';
    import formErrorUtils from "@/utils/formErrorUtils";
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";

// Variables & state
    const idProvision = ref(null);
    
    const model = defineModel();
    const props = defineProps(['data']);
    const emit = defineEmits(['reload']);

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const form = reactive({
        provision_amount: null,
        date_provision: null
    })

    const errors = reactive({
        provision_amount: null,
        date_provision: null
    });

// Functions
    const closeDialog = () => {
        model.value = !model.value
    }

    const editProvision = async () => {
        openLoader(true);
        
        try {
            const response = await provisionService.updateProvision(idProvision.value, form);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Provision modifiée avec succès.", "success");
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
        idProvision.value = props.data.id;
        form.provision_amount = props.data.provision_amount;
        form.date_provision = props.data.date_provision;
    })
</script>