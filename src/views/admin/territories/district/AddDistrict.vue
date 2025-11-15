<template>
    <VCardForm 
        title="Nouveau district"
        subtitle="Remplissez le formulaire pour enregistrer un nouveau district dans le système."
        width="600"
    >
        <template #card_text>
            <v-row>
                <v-col class="!py-0">

                    <VInput 
                        label="Nom district" 
                        placeholder="Nom du district" 
                        v-model:model="form.name" 
                        v-model:error="errors.name" 
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col class="!py-0">
                    <VSelect 
                        label="Région" 
                        placeholder="Sélectionner une région" 
                        :items="regions" 
                        value="id" 
                        title="name" 
                        v-model:model="form.region" 
                        v-model:error="errors.region"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col class="!py-0">
                    <VInput 
                        label="Province" 
                        placeholder="Province de la région" 
                        v-model:model="province" 
                        v-model:error="errors.province" 
                        :readonly="true"
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
                @click="saveDistrict" 
            />
        </template>
    </VCardForm>
</template>

<script setup>
// Imports
    import { computed, reactive, ref } from 'vue';
    import VButton from '@/components/VButton.vue';
    import VInput from '@/components/VInput.vue';
    import VSelect from '@/components/VSelect.vue';
    import VCardForm from '@/components/VCardForm.vue';
    import districtService from '@/services/territories/districtService';
    import formErrorUtils from "@/utils/formErrorUtils";
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";

// Variables & state
    const model = defineModel();
    const props = defineProps(['regions']);
    const emit = defineEmits(['reload']);

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const form = reactive({
        name: null,
        province: null,
        region: null,
    })

    const errors = reactive({
        name: null,
        province: null,
        region: null,
    })



// Functions
    const province = computed(() => {
        const selectedRegion = props.regions.find(region => region.id === form.region);
        form.province = selectedRegion?.province.id;
        return selectedRegion?.province.name;
    });
    
    const closeDialog = () => {
        model.value = !model.value
    }

    const saveDistrict = async () => {
        openLoader(true);

        try {
            const response = await districtService.createDistrict(form);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Nouveau district enregistré avec succès.", "success");
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