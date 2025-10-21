<template>
    
        <v-container class="flex items-center justify-center h-screen" fluid>
                    
            <v-card class="w-[400px] !rounded-xl !p-8 custom-shadow">
                <v-card-title>
                    <h1 class="text-4xl text-center">Login</h1>
                </v-card-title>
                <v-card-text class="mt-8">
                    <div>
                        <v-row>
                            <v-col>
                                <VInput label="Email" type="email" placeholder="Entrer votre email"
                                    v-model:model="form.login" 
                                    v-model:error="errors.login" 
                                />
                            </v-col>
                        </v-row>
        
                        <v-row>
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
                    </div>
                </v-card-text>
            </v-card>

        </v-container>
</template>

<script setup>
    import { reactive, ref } from "vue";
    import '@assets/css/login.css';
    import authService from "@/services/auth/authService";
    import { useRouter } from "vue-router";
    import VInput from "@/components/VInput.vue";
    import formErrorUtils from "@/utils/formErrorUtils";

    const router = useRouter();
    
    const form = reactive({
        login: 'admin',
        password: 'admin123098'
    });

    const errors = reactive({
        ...Object.fromEntries(
            Object.keys(form).map(k => [k, null])
        )
    });

    const signIn  = async () => {
        try {
            const response = await authService.loginAdmin(form);
            const token = response.data.token;
            localStorage.setItem('token', token);
            
            router.push('/admin/accueil');
        } catch (error) {
            if (error.response.data.errors) {
                formErrorUtils.setErrors(error.response.data.errors, errors)

            }
        }
    }

</script>
