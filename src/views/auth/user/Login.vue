<template>
    
        <v-container class="flex items-center justify-center h-screen" fluid>
                    
            <v-card class="w-[400px] !rounded-xl !p-8 custom-shadow ">
                <v-card-title>
                    <h1 class="text-4xl text-center">Login</h1>
                    <p class="mt-2 text-center text-gray-500 text-caption">Entrez vos infromations pour vous connecter</p>
                </v-card-title>
                <v-card-text class="mt-8">

                    <div class="flex p-1 mb-5 bg-gray-100 rounded-lg">
                        <button class="flex-grow px-4 py-3 text-gray-500 transition-all duration-300 ease-in border-none rounded-md" 
                            :class="typeLogin === 'cin' ? 'active' : ''"
                            @click="typeLogin = 'cin'"
                        >
                            CIN
                        </button>
                        <button class="flex-grow px-4 py-3 text-gray-500 transition-all duration-300 ease-in border-none rounded-md"
                            :class="typeLogin === 'immatriculation' ? 'active' : ''"
                            @click="typeLogin = 'immatriculation'"
                        >
                            Immatriculation
                        </button>
                    </div>
                    <div>
                        <v-row no-gutters>
                            <v-col>
                                <VInput :label="field['label']" :type="field['type']" :placeholder="field['placeholder']"
                                    v-model:model="form.login" 
                                    v-model:error="errors.login" 
                                />
                            </v-col>
                        </v-row>
        
                        <v-row no-gutters>
                            <v-col>
                                <VInput label="Mot de passe" type="password" placeholder="Entrer votre mot de passe"
                                    v-model:model="form.password" 
                                    v-model:error="errors.password" 
                                />
                            </v-col>
                        </v-row>
                    </div>
                    
                    <div class="flex flex-col gap-3 mt-8">
                        <v-btn class="text-white !bg-emerald-600" variant="flat"
                            @click="signIn()"
                        >
                            Se connecter
                        </v-btn>
                        <v-btn class="!text-emerald-600 !border-emerald-600" variant="outlined"
                            @click="register()"
                        >
                            Inscrivez-vous
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card>

        </v-container>

</template>

<script setup>
// Imports
    import { reactive, ref, watch } from "vue";
    import { useRouter } from "vue-router";
    import authService from "@/services/auth/authService";
    import VInput from "@/components/VInput.vue";
    import formErrorUtils from "@/utils/formErrorUtils";

// Variables & state
    const router = useRouter();    

    const typeLogin = ref('cin');
    const field = ref({
        type: 'number',
        label: 'CIN',
        placeholder: 'Entrer votre cin',
    });
    const fields = {
        cin: {
            type: 'number',
            label: 'CIN',
            placeholder: 'Entrer votre cin',
        },
        immatriculation: {
            type: 'text',
            label: 'Immatriculation',
            placeholder: 'Entrer votre immatriculation',
        }
    };

    const form = reactive({
        login_type: null,
        login: null,
        password: null
    });

    const errors = reactive({
        ...Object.fromEntries(
            Object.keys(form).map(k => [k, null])
        )
    });

// Functions
    watch(typeLogin, (newType) => {
        form.login = null;
        field.value = fields[newType];
    })

    const register = () => {
        router.push('/register');
    }

    const signIn  = async () => {
        try {
            form.login_type = typeLogin.value;
            
            const response = await authService.login(form);
            
            const token = response.data.token;
            const profil = response.data.profil;
            const role = profil.user.post.role;

            localStorage.setItem('token', token);
            localStorage.setItem('profil', JSON.stringify(profil));
            localStorage.setItem('role', role);

            switch (role) {
                case 'greffier':
                    router.push('/greffier/accueil');
                    break;
                case 'magistrat':
                    router.push('/magistrat/accueil');
                    break;
                case 'admin_local':
                    router.push('/administrateur/local/accueil');
                    break;
                default:
                    router.push('/login');
            }

        } catch (error) {
            if (error.response.data.errors) {
                formErrorUtils.setErrors(error.response.data.errors, errors)
            }
        }
    }
</script>

<style scoped>
    button.active {
        background: #fff;
        color: #059669;
    }
</style>
