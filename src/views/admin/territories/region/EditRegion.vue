<template>
    <VCardForm 
        title="Modification de la région"
        subtitle="Modifiez les informations de la province sélectionnée"
        width="600"
    >
        <template #card_text>
          <v-row>
                <v-col class="!py-0">

                    <VInput 
                        label="Nom région" 
                        placeholder="Nom de la région" 
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
                @click="closeDialog"  
            />
            <VButton 
                title="Mettre à jour" 
                class="btn-primary" 
                @click="editRegion" 
            />
        </template>
    </VCardForm>
</template>

<script setup>
// Imports
    import { onMounted, reactive, ref } from 'vue';
    import VButton from '@/components/VButton.vue';
    import VInput from '@/components/VInput.vue';
    import VSelect from '@/components/VSelect.vue';
    import VCardForm from '@/components/VCardForm.vue';
    import regionService from '@/services/territories/regionService';
    import formErrorUtils from "@/utils/formErrorUtils";
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";

// Variables & state
    const model = defineModel();
    const props = defineProps(['data', 'provinces']);
    const emit = defineEmits(['reload']);


    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const idRegion = ref(null);

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

    const editRegion = async () => {
        openLoader(true);
        
        try {
            const response = await regionService.updateRegion(idRegion.value, form);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Région mise à jour avec succès.", "success");
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
        idRegion.value = props.data.id;
        form.name = props.data.name;
        const selectedProvince = props.provinces.find(province => province.id === props.data.province.id);
        form.province = selectedProvince ? selectedProvince.id : null;
    })  
</script>