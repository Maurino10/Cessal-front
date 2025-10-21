<template>
    <VCardForm 
        title="Nouveau TPI"
        subtitle="Remplissez le formulaire pour enregistrer un nouveau TPI dans le système."
        width="800"
    >
        <template #card_text>
            <v-row>
                <v-col class="!py-0">
                    <VInput 
                        label="Nom TPI" 
                        placeholder="Nom du TPI" 
                        v-model:model="form.name" 
                        v-model:error="errors.name"
                    />
                </v-col>
            </v-row>
            
            <v-row>
                <v-col class="!py-0">
                    <VSelect 
                        label="Cour d'appel" 
                        placeholder="Sélectionner une Cour d'Appel"  
                        :items="props.ca" 
                        value="id" 
                        title="name" 
                        v-model:model="form.ca" 
                        v-model:error="errors.ca" 
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col class="!py-0">
                    <VSelect 
                        label="District" 
                        placeholder="Sélectionner un disctrict"  
                        :items="props.districts" 
                        value="id" 
                        title="name" 
                        v-model:model="form.district" 
                        v-model:error="errors.district" 
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col class="!py-0">
                    <VInput 
                        label="Région" 
                        placeholder="Région du district"   
                        v-model:model="selectedRegion" 
                        v-model:error="errors.region" 
                        :readonly="true"
                    />
                </v-col>

                <v-col class="!py-0">
                    <VInput 
                        label="Province" 
                        placeholder="Province de la région" 
                        v-model:model="selectedProvince" 
                        v-model:error="errors.province"
                        :readonly="true"
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
                @click="saveTPI"
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
    import tpiService from '@/services/instances/tpiService';
    import formErrorUtils from "@/utils/formErrorUtils";
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";

// Variables & state
    const model = defineModel();
    const props = defineProps(['ca', 'districts']);
    const emit = defineEmits(['reload']);

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();


    const form = reactive({
        name: null,
        province: null,
        ca: null,
        region: null,
        district: null,
    })

    const errors = reactive({
        name: null,
        province: null,
        ca: null,
        region: null,
        district: null,
    })


// Functions

    const selectedRegion = computed(() => {
        const selectedDistrict = props.districts.find(district => district.id === form.district);
        form.region = selectedDistrict?.region.id;
        return selectedDistrict?.region.name
    });

    const selectedProvince = computed(() => {
        const selectedDistrict = props.districts.find(district => district.id === form.district);
        form.province = selectedDistrict?.region.province.id;
        return selectedDistrict?.region.province.name
    });

    const closeDialog = () => {
        model.value = !model.value
    }

    const saveTPI = async () => {
        openLoader(true); 

        try {
            const response = await tpiService.createTPI(form);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Nouveau TPI enregistré avec succès.", "success");
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