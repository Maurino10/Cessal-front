<template>
    <VCardForm 
        title="Modification du prêteur"
        subtitle="Modifiez les informations du prêteur sélectionnée:"
        width="800"
        class="!max-h-[95vh]"
    >   
        <template #card_text>
            <v-row>
                <v-col class="!py-0">
                    <VInput label="Nom" placeholder="Entrer le nom du prêteur" type="text"
                        v-model:model="form.last_name"
                        v-model:error="errors.last_name"
                    />
                </v-col>
                <v-col class="!py-0">
                    <VInput label="Prénom" placeholder="Entrer le prénom du prêteur" type="text"
                        v-model:model="form.first_name"
                        v-model:error="errors.first_name"
                    />
                </v-col>
            </v-row>
            
            <v-row>
                <v-col class="!py-0">
                    <VSelect v-if="genders" label="Genre" placeholder="Sélectionner un genre" :items="genders" value="id" title="name" 
                        v-model:model="form.gender" 
                        v-model:error="errors.gender" 
                    />
                </v-col>
            </v-row>

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
                    <VCombobox v-if="naturalPersonAddress" label="Adresse" placeholder="Entrer l'adresse d'emprunteur" :items="naturalPersonAddress" value="id" title="address"
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
        </template>
        
        <template #card_actions>
            <VButton title="Annuler" class="btn-secondary" @click="closeDialog"  />
            <VButton title="Mettre à jour" class="btn-primary" @click="editBorrower" />
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
    import VTextArea from '@/components/VTextArea.vue';
    import VButton from '@/components/VButton.vue';
    import formErrorUtils from '@/utils/formErrorUtils';
    import greffierService from '@/services/cessions/greffierService';
    import genderService from '@/services/users/genderService';
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";
import { ca } from 'vuetify/locale';

// Variables & state

    const model = defineModel();

    const props = defineProps(['borrower']);
    const emit = defineEmits(['reload']);

    const genders = ref(null);
    const naturalPersonAddress = ref(null);

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const form = reactive({
        last_name: null,
        first_name: null,
        cin: null,
        address: null,
        salary_amount: null,
        remark: null,
        gender: null,
        new_address: false
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

    const editBorrower = async () => {
        openLoader(true);

        try {
            if (typeof form.address === 'object' && form.address !== null) {
                form.new_address = false;
                
                const data = { ...form, address: form.address.id };

                const response = await greffierService.updateCessionBorrower(props.borrower.id_cession, props.borrower.id, data);
            } else {
                form.new_address = true;

                const response = await greffierService.updateCessionBorrowerNewAddress(props.borrower.id_cession, props.borrower.id, form);
            }
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Prêteur mis à jour avec succès.", "success");
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

    const fetchAllAddressCessionNaturalPerson = async () => {
        try {
            const response = await greffierService.getAllAddressCessionNaturalPerson(props.borrower.natural_person.id);
            naturalPersonAddress.value = response.data.addresses;
            
        } catch (error) {
            console.error(error.response.data);
        }
    }
// Lifecycle hooks

    onMounted (async () => {

        await Promise.all([
            fetchAllGender(),
            fetchAllAddressCessionNaturalPerson()
        ]);    
        form.last_name = props.borrower.natural_person.last_name;
        form.first_name = props.borrower.natural_person.first_name;
        form.cin = props.borrower.natural_person.cin;
        form.address = props.borrower.natural_person_address;
        form.gender = props.borrower.natural_person.id_gender;
        form.salary_amount = props.borrower.salary_amount;
        form.remark = props.borrower.remark;
    });
</script>