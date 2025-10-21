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
                    <VInput label="Adresse" placeholder="Entrer l'adresse du prêteur" type="text"
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
            <VButton title="Annuler" class="btn-cancel" @click="closeDialog"  />
            <VButton title="Mettre à jour" class="btn-submit" @click="editBorrower" />
        </template>
    </VCardForm>
</template>

<script setup>
// Imports
    import { onMounted, reactive, ref } from 'vue';
    import VCardForm from '@/components/VCardForm.vue';
    import VInput from '@/components/VInput.vue';
    import VSelect from '@/components/VSelect.vue';
    import VOptInput from '@/components/VOptInput.vue';
    import VTextArea from '@/components/VTextArea.vue';
    import VButton from '@/components/VButton.vue';
    import formErrorUtils from '@/utils/formErrorUtils';
    import greffierService from '@/services/cessions/greffierService';
    import genderService from '@/services/users/genderService';
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";

// Variables & state

    const model = defineModel();

    const props = defineProps(['borrower']);
    const emit = defineEmits(['reload']);

    const genders = ref(null);

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

    const editBorrower = async () => {
        openLoader(true);

        try {
            
            const response = await greffierService.updateCessionBorrower(props.borrower.id_cession, props.borrower.id, form);
            
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
// Lifecycle hooks

    onMounted (async () => {

        await fetchAllGender();
        form.last_name = props.borrower.party.last_name;
        form.first_name = props.borrower.party.first_name;
        form.cin = props.borrower.party.cin;
        form.address = props.borrower.party.address;
        form.gender = props.borrower.party.id_gender;
        form.salary_amount = props.borrower.salary_amount;
        form.remark = props.borrower.remark;
    });
</script>