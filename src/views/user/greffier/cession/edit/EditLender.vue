<template>
    <VCardForm 
        title="Modification du prêteur"
        subtitle="Modifiez les informations du prêteur sélectionnée:"
        width="800"
    >   
        <template #card_text>
            <div v-if="props.lender.type === 'person'">
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
            </div>

            <div v-else>
                <v-row>
                    <v-col class="!py-0">
                        <!-- <VInput label="Nom" placeholder="Entrer le prêteur" type="text"
                            v-model:model="form.name"
                            v-model:error="errors.name"
                        /> -->
                        <VCombobox v-if="entities" label="Entités" placeholder="Entrer le prêteur" :items="entities" value="id" title="name"
                            v-model:model="form.name"
                            v-model:error="errors.name"
                        />
                    </v-col>
                </v-row>
            </div>
        </template>
        
        <template #card_actions>
            <VButton title="Annuler" class="btn-cancel" @click="closeDialog"  />
            <VButton title="Mettre à jour" class="btn-submit" @click="editLender" />
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
    import formErrorUtils from '@/utils/formErrorUtils';
    import greffierService from '@/services/cessions/greffierService';
    import genderService from '@/services/users/genderService';
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";

// Variables & state

    const model = defineModel();

    const props = defineProps(['lender']);
    const emit = defineEmits(['reload']);

    const genders = ref(null);
    const entities = ref(null);
    
    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();


    const form = reactive({
        type: null,
        last_name: null,
        first_name: null,
        cin: null,
        address: null,
        gender: null,
        name: null,
        tpi: null
    });
    
    const errors = reactive({
        last_name: null,
        first_name: null,
        cin: null,
        address: null,
        gender: null,
        name: null
    });
// Functions

    const closeDialog = () => {
        model.value = !model.value
    }

    const editLender = async () => {
        openLoader(true);

        try {   
            const response = await greffierService.updateCessionLender(props.lender.id_cession, props.lender.id, form);
            
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
    }
    const fetchEntityByTPI = async () => {
        try {
            const profil = JSON.parse(localStorage.getItem('profil'));

            const response = await greffierService.getEntityByTPI(profil.user.tpi.id);
            entities.value = response.data.entities;
        } catch (error) {
            console.error(error.response.data);
        }
    };
// Lifecycle hooks

    onMounted (async () => {

        if (props.lender.type === 'person') {
            await fetchAllGender();
            form.type = props.lender.type; 
            form.last_name = props.lender.party.last_name;
            form.first_name = props.lender.party.first_name;
            form.cin = props.lender.party.cin;
            form.address = props.lender.party.address;
            form.gender = props.lender.party.id_gender;
        } else {
            await fetchEntityByTPI();
            const profil = JSON.parse(localStorage.getItem('profil'));
            form.tpi = profil.user.tpi.id
            form.type = props.lender.type; 
            form.name = props.lender.entity.name
        }
        
    });
</script>