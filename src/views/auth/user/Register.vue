<template>
    
    <v-container class="!w-[90vw] h-screen">
        <div class="w-full h-full overflow-hidden rounded-xl custom-shadow">
            <v-row class="h-full" no-gutters>
                <v-col cols="12" md="4">
                    <div class="flex flex-col h-full gap-8 p-8 bg-emerald-600">
                        <h1 class="text-3xl text-white">Inscription</h1>
                        <p class="text-gray-300 text-caption">Fournissez vos informations afin de créer un compte. Vous serez notifié(e) par e-mail après validation par l’administrateur.</p>
                    </div>
                </v-col>

                <v-col cols="12" md="8">
                    <div class="flex flex-col h-full gap-4 p-8 !bg-white overflow-hidden">
                        <div class="px-4">
                            <v-row>
                                <v-col>
                                    <h3 class="text-lg">{{ steps[step].title }}</h3>
                                    <p class="text-gray-500 text-caption">
                                        {{ steps[step].subtitle }}
                                    </p>
                                </v-col>
                            </v-row>
                        </div>
                        
                        <div class="flex-grow">
                            <v-window v-model="step">
                                <v-container fluid>
                                    <v-window-item :value="0">  
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
                                        </v-row>
                                    </v-window-item>
                                    
                                    <v-window-item :value="1">
                                        <v-row>
                                            <v-col class="!py-0">
                                                <VAutoComplete v-if="tpi" label="TPI" placeholder="Sélectionner un TPI" :items="tpi" value="id" title="name" 
                                                    v-model:model="form.tpi" 
                                                    v-model:error="errors.tpi" 
                                                />
                                            </v-col>
                                        </v-row>
            
                                        <v-row>
                                            <v-col class="!py-0">
                                                <VSelect v-if="posts" label="Post" placeholder="Sélectionner un post" :items="posts" value="id" title="name" 
                                                    v-model:model="form.post" 
                                                    v-model:error="errors.post" 
                                                />
                                            </v-col>
                                        </v-row>
                                        
                                        <v-row>
                                            <v-col class="!py-0">
                                                <VInput label="Email" placeholder="exemple@justice.mg" type="email" 
                                                    v-model:model="form.email" 
                                                    v-model:error="errors.email" 
                                                />
                                            </v-col>
                                        </v-row>
                        
                                        <v-row>
                        
                                            <v-col class="!py-0">
                                                <VInput label="Mot de passe" placeholder="Choisissez un mot de passe sécurisé"  type="password" 
                                                    v-model:model="form.password" 
                                                    v-model:error="errors.password" 
                                                />
                                            </v-col>
                        
                                            <v-col class="!py-0">
                        
                                                <VInput label="Confirmer le mot de passe" placeholder="Répétez le mot de passe" type="text" 
                                                    v-model:model="form.password_confirmation" 
                                                    v-model:error="errors.password_confirmation" 
                                                />
                                                
                                            </v-col>
                                        </v-row>
                                    </v-window-item>
                                </v-container>
                            </v-window>
                        </div>
                        
                        <div class="px-4">
                            <v-row>
                                <v-col>
                                    <VButton
                                        title="Précédent" 
                                        icon="mdi-arrow-left-thin"
                                        class="btn-secondary"
                                        v-if="step > 0" 
                                        @click="step--" 
                                    />
                                </v-col>
            
                                <v-spacer></v-spacer>
            
                                <v-col align="end">
                                    <VButton
                                        title="Valider"
                                        class="btn-primary"
                                        v-if="step > 0" 
                                        @click="saveUser" 
                                        :disabled="!isSectionValid"
                                    />
                                    
                                    <VButton
                                        title="Suivant" 
                                        icon="mdi-arrow-right-thin"
                                        iconPosition="right"
                                        class="btn-primary"
                                        v-else 
                                        @click="step++" 
                                        :disabled="!isSectionValid" 
                                    />
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                    
                </v-col>
            </v-row>
        </div>
    </v-container>

    
</template>

<script setup>

// Imports 
    import { onMounted, reactive, ref, computed } from "vue";
    import formErrorUtils from "@/utils/formErrorUtils";
    import tpiService from '@/services/instances/tpiService';
    import postService from '@/services/users/postService';
    import genderService from '@/services/users/genderService';
    import authService from '@/services/auth/authService';
    import VInput from "@/components/VInput.vue";
    import VInputDate from '@/components/VInputDate.vue';
    import VSelect from "@/components/VSelect.vue";
    import VButton from "@/components/VButton.vue";
    import VOptInput from "@/components/VOptInput.vue";
    import VAutoComplete from "@/components/VAutoComplete.vue";

    
// Variables & state
    const tpi = ref(null);
    const posts = ref(null);
    const genders = ref(null);
    
    const step = ref(0)

    
    const form = reactive({
        first_name: null,
        last_name: null,
        gender: null,
        birthday: null,
        address: null,
        immatriculation: null,
        cin: null,
        tpi: null,
        post: null,
        email: null,
        password: null,
        password_confirmation: null,
    });

    const errors = reactive({ 
        ...Object.fromEntries(
            Object.keys(form).map(k => [k, null])
        )
    });

    const steps = {
        0:
        {
            key: 'personal',
            title: 'Informations personnelles',
            subtitle: 'Veuillez renseigner vos informations personnelles',
            form: ['first_name', 'last_name', 'gender', 'birthday', 'address', 'cin', 'immatriculation']
        },
        1:
        {
            key: 'professional',
            title: 'Informations professionnelles',
            subtitle: 'Veuillez renseigner vos informations professionnelles',
            form: ['tpi', 'post', 'email', 'password', 'password_confirmation']
        },
    };



// Functions


    const isSectionValid = computed(() => {
        switch (step.value) {
            case 0:
                return steps[0]['form'].every(field => form[field] && form[field].toString().trim() !== '');
            case 1:
                return steps[1]['form'].every(field => form[field] && form[field].toString().trim() !== '');
        }
    });


    
    const saveUser = async () => {
        try {
            const response = await authService.register(form);
            
            alert("Votre demande de compte a bien été enregistrée. Un administrateur validera votre inscription. Vous serez notifié(e) par e-mail dès qu’une décision sera prise.");
        } catch (error) {
            if (error.response.data.errors) {
                formErrorUtils.setErrors(error.response.data.errors, errors)
            }
        }
    };


    const fetchAllTPI = async () => {
        try {
            const response = await tpiService.listTPI();
            tpi.value = response.data.tpi;

        } catch (error) {
            console.error(error.response.data);
        }
    };

    const fetchAllPost = async () => {
        try {
            const response = await postService.getAllPost();
            posts.value = response.data.posts;

        } catch (error) {
            console.error(error.response.data);
        }
    };

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
        await Promise.all([
            fetchAllTPI(),
            fetchAllPost(),
            fetchAllGender(),
        ])
    })

</script>


