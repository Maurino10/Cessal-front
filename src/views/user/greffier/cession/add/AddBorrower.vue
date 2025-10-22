<template>
    <VCardForm 
        title="Nouveau emprunteur"
        subtitle="Remplissez le formulaire pour ajouter un nouveau emprunteur"
        width="800"
        class="h-[90vh]"
    >
        <template #card_text>
            <v-row>
                <v-col class="!py-0">
                    <VOptInput label="CIN" :length="12"
                        v-model:model="form.cin"
                        v-model:error="errors.cin"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col class="!py-0">
                    <VInput label="Nom" placeholder="Entrer le nom du emprunteur" type="text"
                        v-model:model="form.last_name"
                        v-model:error="errors.last_name"
                        :disabled="cinExists || form.cin?.length !== 12"
                    />
                </v-col>
                <v-col class="!py-0">
                    <VInput label="Prénom" placeholder="Entrer le prénom du emprunteur" type="text"
                        v-model:model="form.first_name"
                        v-model:error="errors.first_name"
                        :disabled="cinExists || form.cin?.length !== 12"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col class="!py-0">
                    <VSelect v-if="genders" label="Genre" placeholder="Sélectionner un genre" :items="genders" value="id" title="name" 
                        v-model:model="form.gender" 
                        v-model:error="errors.gender" 
                        :disabled="cinExists || form.cin?.length !== 12"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col class="!py-0">
                    <VCombobox v-if="cinExists" label="Adresse" placeholder="Entrer l'adresse du prêteur" :items="naturalPersonAddress" value="id" title="address"
                        v-model:model="form.address"
                        v-model:error="errors.address"
                    />

                    <VInput v-else label="Adresse" placeholder="Entrer l'adresse du emprunteur" type="text"
                        v-model:model="form.address"
                        v-model:error="errors.address"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col class="!py-0">
                    <VInput label="Montant revenu" placeholder="Entrer la montant revenu du emprunteur" type="number"
                        v-model:model="form.salary_amount"
                        v-model:error="errors.salary_amount"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col class="!py-0">
                    <VTextArea label="Observation" placeholder="Entrer l'observation du emprunteur"
                        v-model:model="form.remark"
                        v-model:error="errors.remark"
                    />
                </v-col>
            </v-row>
            
            <v-row>
                <v-col class="!py-0">
                    <span v-if="cinExists" class="p-2 text-emerald-500">CIN trouvé ✅</span>
                </v-col>
            </v-row>
        </template>
        
        <template #card_actions>
            <VButton title="Annuler" class="btn-cancel" @click="closeDialog"  />
            <VButton title="Ajouter" class="btn-submit" @click="addBorrower" />
        </template>
    </VCardForm>
</template>

<script setup>
// Imports
    import { onMounted, reactive, ref } from 'vue';
    import VCardForm from '@/components/VCardForm.vue';
    import VInput from '@/components/VInput.vue';
    import VCombobox from '@/components/VCombobox.vue';
    import VSelect from '@/components/VSelect.vue';
    import VOptInput from '@/components/VOptInput.vue';
    import VButton from '@/components/VButton.vue';
    import VTextArea from '@/components/VTextArea.vue';
    import greffierService from '@/services/cessions/greffierService';
    import genderService from '@/services/users/genderService';
    import formErrorUtils from "@/utils/formErrorUtils";
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";
import { watch } from 'vue';

// Variables & state
    const model = defineModel();
    
    const props = defineProps(['idCession']);
    const emit = defineEmits(['reload']);4

    const genders = ref(null);

    const cinExists = ref(false);
    const naturalPerson = ref(null);
    const naturalPersonAddress = ref(null);

    let debounceTimer = null;

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const form = reactive({
        last_name: null,
        first_name: null,
        cin: null,
        address: null,
        salary_amount: null,
        remark: null,
        gender: null
    });

    const errors = reactive({
        last_name: null,
        first_name: null,
        cin: null,
        address: null,
        salary_amount: null,
        remark: null,
        gender: null
    });

// Functions
    const closeDialog = () => {
        model.value = !model.value
    }

    watch(() => form.cin, (newVal) => {
        cinExists.value = false;

        if (!newVal || newVal.length !== 12) return; // CIN incomplet → on ne fait rien

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => checkCIN(newVal), 300); // délai debounce
    });

    const checkCIN = async ($cin) => {
        try {
            const response = await greffierService.checkCIN($cin);

            if (response.data.exists) {
                naturalPerson.value = response.data.natural_person;
                naturalPersonAddress.value = naturalPerson.value.address;
                form.last_name = naturalPerson.value.last_name;
                form.first_name = naturalPerson.value.first_name;
                form.address = null;
                form.gender = naturalPerson.value.id_gender;
                cinExists.value = true;
            } else {
                cinExists.value = false;
                form.last_name = null;
                form.first_name = null;
                form.address = null;
                form.gender = null;
            }   
            
        } catch (err) {
            console.error(err);
        }
    }

    const addBorrower = async () => {
        
        openLoader(true);

        try {

            if (cinExists.value === true) {
                if (typeof form.address === 'object' && form.address !== null) {
                    console.log(form.address);
                    const response = await greffierService.createCessionBorrowerExists(props.idCession, { 
                        natural_person: naturalPerson.value.id,
                        natural_person_address: form.address.id,
                        salary_amount: form.salary_amount,
                        remark: form.remark,
                    });
                } else {
                    const response = await greffierService.createCessionBorrowerExistsNewAddress(props.idCession, { 
                        natural_person: naturalPerson.value.id,
                        address: form.address,
                        salary_amount: form.salary_amount,
                        remark: form.remark,
                    });  
                }
            } else {
                const response = await greffierService.createCessionBorrower(props.idCession, form);
            }
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Nouveau emprunteur enregistré avec succès.", "success");
                openLoader(false);
            }, 1000)
        } catch (error) {
            openLoader(false);

            if (error.response.data.errors) {
                formErrorUtils.setErrors(error.response.data.errors, errors)
            }
        }
    }
    
    const fetchAllGender = async () => {
        try {
            const response = await genderService.getAllGender();
            genders.value = response.data.genders;

        } catch (error) {
            console.error(error.response.data);
        }
    };

// Lifecycle hooks
    onMounted(async () => {
        await fetchAllGender();
    })
</script>