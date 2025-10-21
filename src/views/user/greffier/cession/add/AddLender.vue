
<template>
    <VCardForm 
        title="Nouveau prêteur"
        subtitle="Remplissez le formulaire pour ajouter un nouveau prêteur"
        width="800"
    >   
        <template #header_actions>
            <div class="flex p-1 mb-5 bg-gray-100 rounded-lg">
                <button class="flex-grow px-4 py-3 text-gray-500 transition-all duration-300 ease-in border-none rounded-md" 
                    :class="typeLender === 'person' ? 'active' : ''"
                    @click="typeLender = 'person'"
                >
                    Personne
                </button>
                <button class="flex-grow px-4 py-3 text-gray-500 transition-all duration-300 ease-in border-none rounded-md"
                    :class="typeLender === 'entity' ? 'active' : ''"
                    @click="typeLender = 'entity'"
                >
                    Entité
                </button>
            </div>
        </template>
        <template #card_text>
            <div v-if="typeLender === 'person'">
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
                        <VCombobox v-if="cinExists" label="Adresse" placeholder="Entrer l'adresse du prêteur" :items="partyAddress" value="id" title="address"
                            v-model:model="form.address"
                            v-model:error="errors.address"
                        />
                        
                        <VInput v-else label="Adresse" placeholder="Entrer l'adresse du prêteur" type="text"
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
                        <VCombobox v-if="entities" label="Entités" placeholder="Entrer le prêteur" :items="entities" value="id" :title="formatEntityLabel"
                            v-model:model="form.name"
                            v-model:error="errors.name"
                        />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="!py-0">
                        <VInput label="Adresse" placeholder="Entrer l'adresse" type="text"
                            v-model:model="form.address"
                            v-model:error="errors.address"
                        />
                    </v-col>
                </v-row>
            </div>
        </template>
        
        <template #card_actions>
            <VButton title="Annuler" class="btn-cancel" @click="closeDialog"  />
            <VButton title="Ajouter" class="btn-submit" @click="addLender" />
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
    const entities = ref(null);

    const typeLender = ref('person');

    const cinExists = ref(false);
    const party = ref(null);
    const partyAddress = ref(null);
    
    let debounceTimer = null;
     
    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const form = reactive({
        type: 'person',
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
    const formatEntityLabel = (entity) => {
        if (typeof entity === 'string') return entity; // ⚠️ Permet de taper librement !
        return entity && entity.name
            ? `${entity.name} — ${entity.address || 'Adresse inconnue'}`
            : '';
    };
    
    const closeDialog = () => {
        model.value = !model.value
    }

    watch(typeLender, (newType) => {
        form.type = newType
        if (newType === 'person') {
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
            form.address = newVal.address
        } else {
            form.address = null;
        }
    });

    const checkCIN = async ($cin) => {
        try {
            const response = await greffierService.checkCIN($cin);

            if (response.data.exists) {
                party.value = response.data.party;
                partyAddress.value = party.value.address;
                form.last_name = party.value.last_name;
                form.first_name = party.value.first_name;
                form.address = party.value.address[0];
                form.gender = party.value.id_gender;
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

    const addLender = async () => {

        openLoader(true);
        
        try {
            form.type = typeLender.value;



            if (typeLender.value === 'entity') {

                if (typeof form.name === 'object' && form.name !== null) {
                    const response = await greffierService.createCessionLenderEntityExists(props.idCession, { party: form.name.id });
                    
                } else {
                    const profil = JSON.parse(localStorage.getItem('profil'));
                    form.tpi = profil.user.tpi.id;
                    
                    const response = await greffierService.createCessionLender(props.idCession, form);
                }

            } else {
                if (cinExists.value === true) {
                    if (typeof form.address === 'object' && form.address !== null) {
                        const response = await greffierService.createCessionLenderExists(props.idCession, { party: party.value.id });
                    } else {
                        const response = await greffierService.createCessionLenderExistsNewAddress(props.idCession, { party: party.value.id, address: form.address });
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
                console.log(error.response.data.errors);
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
    onMounted(async () => {
        await Promise.all([
            fetchAllGender(),
            fetchEntityByTPI(),
        ]);
    })
</script>

<style scoped>
    button.active {
        background: #fff;
        color: #059669;
    }
</style>