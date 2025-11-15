<template>
    <VHeader 
        title="Mon Profil"
    />

    <VBreadCrumb 
        :items="[
            {title: 'Mon Profil', disabled: false},
        ]" 
    />

    <div v-if="profil" class="main-body">

        <div class="flex items-center gap-4 p-4 mb-5 rounded-lg custom-shadow">
            <div>
                <span>
                    <v-icon 
                        icon="mdi-account"
                        class="p-10 text-white bg-orange-500 rounded-full"
                        size="42"
                    ></v-icon>
                </span>
            </div>
            <div>
                <h4 class="text-2xl">
                    {{  profil.last_name+" "+profil.first_name }}
                </h4>
                <p class="text-sm text-gray-500">
                    {{ profil.user.post.name }}
                </p>
                <p class="text-sm text-gray-500">
                    {{ profil.user.tpi.name }}
                </p>
            </div>
        </div>
        
        <div class="px-8 py-6 rounded-lg custom-shadow">
            <div class="mb-5">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center gap-2">
                        <span>
                            <v-icon
                                icon="mdi-account-outline"
                                size="32"
                                color="#10b981"
                            ></v-icon>
                        </span>
                        <h3 class="text-xl font-bold">
                            Informations Personnelles
                        </h3>
                    </div>
                    
                    <VButton 
                        icon="mdi-pencil"
                        title="Modifier"
                        class="btn-secondary"
                        @click="handleAction('perso')"
                    />
                </div>
    
                <div>
                    <v-row>
                        <v-col>
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        Nom
                                    </p>
    
                                    <h5 class="text-lg font-medium">
                                        {{ profil.last_name }}
                                    </h5>
                                </div>
                            </v-col>
        
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        Prénom
                                    </p>
    
                                    <h5 class="text-lg font-medium">
                                        {{ profil.first_name }}
                                    </h5>
                                </div>
                            </v-col>
    
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        Date de naissance
                                    </p>
    
                                    <h5 class="text-lg font-medium">
                                        {{ format.formatDate(profil.birthday) }}
                                    </h5>
                                </div>
                            </v-col>
        
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        Genre
                                    </p>
    
                                    <h5 class="text-lg font-medium">
                                        {{ profil.gender.name }}
                                    </h5>
                                </div>
                            </v-col>
                        </v-col>
    
                        <v-col>
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        CIN
                                    </p>
    
                                    <h5 class="text-lg font-medium">
                                        {{ profil.cin }}
                                    </h5>
                                </div>
                            </v-col>
    
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        Immatriculation
                                    </p>
    
                                    <h5 class="text-lg font-medium">
                                        {{ profil.immatriculation }}
                                    </h5>
                                </div>
                            </v-col>
    
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        Email
                                    </p>
    
                                    <h5 class="text-lg font-medium">
                                        {{ profil.email }}
                                    </h5>
                                </div>
                            </v-col>
    
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        Adresse
                                    </p>
    
                                    <h5 class="text-lg font-medium">
                                        {{ profil.address }}
                                    </h5>
                                </div>
                            </v-col>
                        </v-col>
    
                    </v-row>
                </div>
            </div>
            
            <div>
                <div class="flex items-center gap-2 mb-6">
                    <span>
                        <v-icon
                            icon="mdi-bag-personal-outline"
                            size="32"
                            color="#10b981"
                        ></v-icon>
                    </span>
                    <h3 class="text-xl font-bold">
                        Informations Professionnelles
                    </h3>
                </div>
    
                <div>
                    <v-row>
                        <v-col>
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        Poste
                                    </p>
    
                                    <h5 class="text-xl font-medium ">
                                        {{ profil.user.post.name }}
                                    </h5>
                                </div>
                            </v-col>
                        </v-col>
    
                        <v-col>
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        TPI
                                    </p>
    
                                    <h5 class="text-lg font-medium">
                                        {{ profil.user.tpi.name }}
                                    </h5>
                                </div>
                            </v-col>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </div>

        <v-overlay v-model="overlay" class="flex items-center justify-center">
            <EditInfoPerso 
                v-model="overlay"
                :data="profil"
                @reload="fetchProfil"
                v-if="action === 'perso'"
            />
        </v-overlay>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import VHeader from '@/components/VHeader.vue';
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import VButton from '@/components/VButton.vue';
    import userService from '@/services/users/userService';
    import format from '@/utils/format';
    import EditInfoPerso from './EditInfoPerso.vue';

    const profil = ref(null);

    const overlay = ref(false);
    const action = ref('');

    const handleAction = (act) => {
        action.value = act;
        overlay.value = true;
    }

    const fetchProfil = async () => {
        try {
            const idProfil = JSON.parse(localStorage.getItem('profil')).id;

            const response = await userService.getProfil(idProfil);

            profil.value = response.data.profil;
        } catch (error) {
            console.error(error)
        }
    }

    onMounted(async () => {
        await fetchProfil();
    })
</script>
