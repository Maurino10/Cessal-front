<template>

    <VCardForm
        title="Modification de l'informations personnelles"
        subtitle="Modifiez les informations pour mettre à jour"
        class="!max-w-[90vw] !max-h-[95vh]"
    >
        <template #card_text>
            <div>
                <v-row>
                    <v-col class="!py-0">
                        <VInput label="Nom" placeholder="Entrer votre nom" type="text" 
                            v-model:model="form.last_name" 
                            v-model:error="errors.last_name" 
                        />
                    </v-col>
        
                    <v-col class="!py-0">
                        <VInput label="Prénom" placeholder="Entrer votre prénom" type="text" 
                            v-model:model="form.first_name" 
                            v-model:error="errors.first_name" 
                        />
                    </v-col>
                </v-row>
        
                <v-row>
                    <v-col class="!py-0" cols="12" md="6">
                        <VInputDate label="Date de naissance"
                            v-model:model="form.birthday"
                            v-model:error="errors.birthday"
                        />
                    </v-col>
        
                    <v-col class="!py-0" cols="12" md="6">
                        <VSelect v-if="genders" label="Genre" placeholder="Sélectionner un genre" :items="genders" value="id" title="name" 
                            v-model:model="form.gender" 
                            v-model:error="errors.gender" 
                            />
                    </v-col>
                </v-row>
        
                <v-row>
                    <v-col class="!py-0" cols="12" md="8">
                        <VOptInput label="Cin" length="12" 
                            v-model:model="form.cin" 
                            v-model:error="errors.cin" 
                        />
                    </v-col>
        
                    <v-col class="!py-0" cols="12" md="4">
                        <VInput label="Immatriculation" placeholder="Entrer votre immatriculation" type="text" 
                            v-model:model="form.immatriculation" 
                            v-model:error="errors.immatriculation" 
                        />
                    </v-col>
                </v-row>
                
                <v-row>
        
                    <v-col class="!py-0">
                        <VInput label="Adresse" placeholder="Entrer votre adresse" type="adresse" 
                            v-model:model="form.address" 
                            v-model:error="errors.address" 
                        />
                    </v-col>
                    <v-col class="!py-0">
                        <VInput label="Email" placeholder="exemple@justice.mg" type="email" 
                            v-model:model="form.email" 
                            v-model:error="errors.email" 
                        />
                    </v-col>
                </v-row>
            </div>
        </template>


        <template #card_actions>
            <VButton title="Annuler" class="btn-secondary" @click="closeDialog"  />
            
            <VButton title="Modifier" class="btn-primary" @click="editProfil"/>
        </template>
    </VCardForm>
</template>

<script setup>
    import { onMounted, reactive } from "vue";
    import { ref } from "vue";
    import formErrorUtils from "@/utils/formErrorUtils";
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";
    import VCardForm from "@/components/VCardForm.vue";
    import VInput from "@/components/VInput.vue";
    import VInputDate from '@/components/VInputDate.vue';
    import VSelect from "@/components/VSelect.vue";
    import VButton from "@/components/VButton.vue";
    import VOptInput from "@/components/VOptInput.vue";
    import format from '@/utils/format.js'
    import userService from '@/services/users/userService';
    import genderService from '@/services/users/genderService';

    const model = defineModel();
    const props = defineProps(['data']);
    const emit = defineEmits(['reload']);
    
    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const genders = ref(null);

    const form = reactive({
        first_name: null,
        last_name: null,
        gender: null,
        birthday: null,
        address: null,
        immatriculation: null,
        cin: null,
        email: null,
    });

    const errors = reactive({ 
        ...Object.fromEntries(
            Object.keys(form).map(k => [k, null])
        )
    });

    const closeDialog = () => {
        model.value = !model.value
    }

    const editProfil = async () => {
        openLoader(true);
        
        try {
            const data = {
                ...form,
                birthday: format.convertDate(form.birthday)
            }
            
            const response = await userService.updateProfil(props.data.id, data);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Information personnelles mise à jour avec succès.", "success");
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

    onMounted(async () => {
        await fetchAllGender();
        form.last_name = props.data.last_name;
        form.first_name = props.data.first_name;
        form.gender = props.data.gender.id;
        form.address = props.data.address;
        form.birthday = props.data.birthday;
        form.cin = props.data.cin;
        form.immatriculation = props.data.immatriculation;
        form.email = props.data.email;
    })
</script>