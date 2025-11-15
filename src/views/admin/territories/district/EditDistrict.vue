<template>
    <VCardForm 
        title="Modification du district"
        subtitle="Modifiez les informations du district sélectionné"
        width="600"
    >
        <template #card_text>
           <v-row>
                <v-col class="!py-0">

                    <VInput 
                        label="Nom district" 
                        placeholder="Nom du disctrict" 
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
                        v-model:error="errors.region" :disabled="form.province === null"
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
                title="Mettre à jour" 
                class="btn-primary" 
                @click="editDistrict" 
            />
        </template>
    </VCardForm>
</template>

<script setup>
// Imports
    import { computed, onMounted, reactive, ref } from 'vue';
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
    const props = defineProps(['data', 'regions']);
    const emit = defineEmits(['reload']);

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const idDistrict = ref(null);

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

    const editDistrict = async () => {
        openLoader(true);

        try {
            const response = await districtService.updateDistrict(idDistrict.value, form);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("District mis à jour avec succès.", "success");
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
        idDistrict.value = props.data.id;
        form.name = props.data.name;

        const selectedRegion = props.regions.find(region => region.id === props.data.region.id);
        form.region = selectedRegion.id;
        
        const selectedProvince = selectedRegion?.province;
        form.province = selectedProvince ? selectedProvince.id : null;
    })  
</script>