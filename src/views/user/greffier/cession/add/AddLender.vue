
<template>
    <VCardForm 
        title="Nouveau prêteur"
        subtitle="Remplissez le formulaire pour ajouter un nouveau prêteur"
        width="800"
    >   
        <template #header_actions>
            <div class="flex p-1 bg-gray-100 rounded-lg">
                <button class="flex-grow p-2 text-gray-500 transition-all duration-200 ease-in rounded-md" 
                    :class="typeLender === 'natural_person' ? 'active' : ''"
                    @click="typeLender = 'natural_person'"
                >
                    Personne
                </button>
                <button class="flex-grow p-2 text-gray-500 transition-all duration-200 ease-in rounded-md"
                    :class="typeLender === 'legal_person' ? 'active' : ''"
                    @click="typeLender = 'legal_person'"
                >
                    Entité
                </button>
            </div>
        </template>
        <template #card_text>
            <div v-if="typeLender === 'natural_person'">
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
                        <VInput label="Nom" placeholder="Entrer le nom du prêteur" type="text"
                            v-model:model="form.last_name"
                            v-model:error="errors.last_name"
                            :disabled="cinExists || form.cin?.length !== 12"
                        />
                    </v-col>
                    <v-col class="!py-0">
                        <VInput label="Prénom" placeholder="Entrer le prénom du prêteur" type="text"
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
                        <VCombobox v-if="cinExists" label="Adresse" placeholder="Entrer l'adresse du prêteur" :items="naturalPersonAddresses" value="id" title="address"
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
                        <span v-if="cinExists" class="p-2 text-emerald-500">CIN trouvé ✅</span>
                    </v-col>
                </v-row>
            </div>

            <div v-else>
                <v-row>
                    <v-col class="!py-0">
                        <VCombobox v-if="legalPersons" label="Entités" placeholder="Entrer le prêteur" :items="legalPersons" value="id" title="name"
                            v-model:model="form.name"
                            v-model:error="errors.name"
                        />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="!py-0">
                        <VCombobox v-if="legalPerson" label="Adresse" placeholder="Entrer l'adresse" :items="legalPersonAddresses" value="id" title="address"
                            v-model:model="form.address"
                            v-model:error="errors.address"
                        />

                        <VInput v-else label="Adresse" placeholder="Entrer l'adresse" type="text"
                            v-model:model="form.address"
                            v-model:error="errors.address"
                        />

                    </v-col>
                </v-row>
            </div>
        </template>
        
        <template #card_actions>
            <VButton title="Annuler" class="btn-secondary" @click="closeDialog"  />
            <VButton title="Ajouter" class="btn-primary" @click="addLender" />
        </template>
    </VCardForm>
</template>

<script setup>
// Imports
    import { onMounted, reactive, ref, watch } from 'vue';
    import VCardForm from '@/components/VCardForm.vue';
    import VInput from '@/components/VInput.vue';
    import VCombobox from '@/components/VCombobox.vue';
    import VSelect from '@/components/VSelect.vue';
    import VOptInput from '@/components/VOptInput.vue';
    import VButton from '@/components/VButton.vue';
    import greffierService from '@/services/cessions/greffierService';
    import genderService from '@/services/users/genderService';
    import formErrorUtils from "@/utils/formErrorUtils";
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";

// Variables & state
    const model = defineModel();

    const props = defineProps(['idCession']);
    const emit = defineEmits(['reload']);

    const genders = ref(null);
    const legalPersons = ref(null);

    const typeLender = ref('natural_person');

    const cinExists = ref(false);
    const naturalPerson = ref(null);
    const naturalPersonAddresses = ref(null);

    const legalPerson = ref(null);
    const legalPersonAddresses = ref(null);
    
    let debounceTimer = null;
     
    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const form = reactive({
        type: 'natural_person',
        last_name: null,
        first_name: null,
        cin: null,
        address: null,
        gender: null,
        name: null,
        tpi: null
    })

    // ✅ Un seul objet errors pour tout
    const errors = reactive({
        last_name: null,
        first_name: null,
        cin: null,
        address: null,
        gender: null,
        name: null,
    })

// 🔸 Pour vider les champs non utilisés selon le type sélectionné

// Functions
    // const formatEntityLabel = (legalPerson) => {
    //     if (typeof legalPerson === 'string') return legalPerson; // ⚠️ Permet de taper librement !
    //     return legalPerson && legalPerson.name
    //         ? `${legalPerson.name} — ${legalPerson.address || 'Adresse inconnue'}`
    //         : '';
    // };
    
    const closeDialog = () => {
        model.value = !model.value
    }

    watch(typeLender, (newType) => {
        form.type = newType
        if (newType === 'natural_person') {
            form.name = null
            form.address = null
        } else {
            form.last_name = null
            form.first_name = null
            form.cin = null
            form.address = null
            form.gender = null
        }
    });

    watch(() => form.cin, (newVal) => {
        cinExists.value = false;

        if (!newVal || newVal.length !== 12) return; // CIN incomplet → on ne fait rien

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => checkCIN(newVal), 300); // délai debounce
    });


    watch(() => form.name, (newVal) => {
        if (typeof form.name === 'object' && form.name !== null) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => checkLegalPerson(newVal), 300);    
        } else {
            form.address = null;
        }
    });

    const checkCIN = async (cin) => {
        try {
            const response = await greffierService.checkCIN(cin);

            if (response.data.exists) {
                naturalPerson.value = response.data.natural_person;
                naturalPersonAddresses.value = naturalPerson.value.address;
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

    const checkLegalPerson = async (legal) => {
        try {
            const response = await greffierService.getAllAddressCessionLegalPerson(legal.id);

            if (response.data.addresses) {
                legalPerson.value = legal.id;
                legalPersonAddresses.value = response.data.addresses;
                form.address = null;
            } else {
                form.address = null;
            }   
            
        } catch (err) {
            console.error(err);
        }
    }

    const addLender = async () => {

        openLoader(true);
        
        try {
            form.type = typeLender.value;

            if (typeLender.value === 'legal_person') {

                if (typeof form.name === 'object' && form.name !== null) {
                    if (typeof form.address === 'object' && form.address !== null) {
                        const response = await greffierService.createCessionLenderLegalPersonExists(props.idCession, { 
                            legal_person: form.name.id,
                            legal_person_address: form.address.id
                        });
                    } else {
                        const response = await greffierService.createCessionLenderLegalPersonExistsNewAddress(props.idCession, { 
                            legal_person: form.name.id,
                            legal_person_address: form.address
                        });
                    }
                    
                } else {
                    const profil = JSON.parse(localStorage.getItem('profil'));
                    form.tpi = profil.user.tpi.id;
                    
                    const response = await greffierService.createCessionLender(props.idCession, form);
                }

            } else {
                if (cinExists.value === true) {
                    if (typeof form.address === 'object' && form.address !== null) {
                        const response = await greffierService.createCessionLenderNaturalPersonExists(props.idCession, { 
                            natural_person: naturalPerson.value.id,
                            natural_person_address: form.address.id
                        });
                    } else {
                        const response = await greffierService.createCessionLenderNaturalPersonExistsNewAddress(props.idCession, { 
                            natural_person: naturalPerson.value.id, 
                            natural_person_address: form.address 
                        });
                    }
                } else {
                    const response = await greffierService.createCessionLender(props.idCession, form);
                }
            }
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Nouveau prêteur enregistré avec succès.", "success");
                openLoader(false);
            }, 1000);
            
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

    const fetchLegalPersonByTPI = async () => {
        try {
            const profil = JSON.parse(localStorage.getItem('profil'));

            const response = await greffierService.getLegalPersonByTPI(profil.user.tpi.id);
            legalPersons.value = response.data.legal_persons;
        } catch (error) {
            console.error(error.response.data);
        }
    };


// Lifecycle hooks
    onMounted(async () => {
        await Promise.all([
            fetchAllGender(),
            fetchLegalPersonByTPI(),
        ]);
    })
</script>

<style scoped>
    button.active {
        background: #fff;
        color: #10b981;
    }
</style>