<template>
    <VBreadCrumb 
        :items="[
            {title: 'Utilisateurs', disabled: true},
            {title: 'Utilisateurs', disabled: true},
            {title: `${route.params.id}`, disabled: true},
            {title: 'Profil', disabled: false},
        ]" 
    />

    <div v-if="user" class="main-body">
        <VMainHeader 
            v-if="user"
            :icon="{ icon: 'mdi-account', bgColor: '!bg-sky-700'}"
            :title="user.profil.last_name+' '+user.profil.first_name" 
            :subtitle="user.profil.email" 
        >
            <template #status>
                <v-chip :color="user.post.post_color">
                    {{ user.post.name }}
                </v-chip>
            </template>
        </VMainHeader>
    
        
        <div class="px-8 py-6 rounded-lg custom-shadow">
            <div>
                <div class="flex items-center justify-between">
                    <h3 class="relative py-2 text-xl font-bold text-emerald-500 before:absolute before:w-16 before:h-1 before:bg-emerald-500 before:bottom-0">
                        Informations Personnelles
                    </h3>
    
                </div>
    
                <div class="py-4">
                    <v-row>
    
                        <v-col>
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        Nom
                                    </p>
    
                                    <h5 class="text-lg font-medium">
                                        {{ user.profil.last_name }}
                                    </h5>
                                </div>
                            </v-col>
        
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        Prénom
                                    </p>
    
                                    <h5 class="text-lg font-medium">
                                        {{ user.profil.first_name }}
                                    </h5>
                                </div>
                            </v-col>
    
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        Date de naissance
                                    </p>
    
                                    <h5 class="text-lg font-medium">
                                        {{ format.formatDate(user.profil.birthday) }}
                                    </h5>
                                </div>
                            </v-col>
        
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        Genre
                                    </p>
    
                                    <h5 class="text-lg font-medium">
                                        {{ user.profil.gender.name }}
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
                                        {{ user.profil.cin }}
                                    </h5>
                                </div>
                            </v-col>
    
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        Immatriculation
                                    </p>
    
                                    <h5 class="text-lg font-medium">
                                        {{ user.profil.immatriculation }}
                                    </h5>
                                </div>
                            </v-col>
    
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        Email
                                    </p>
    
                                    <h5 class="text-lg font-medium">
                                        {{ user.profil.email }}
                                    </h5>
                                </div>
                            </v-col>
    
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        Adresse
                                    </p>
    
                                    <h5 class="text-lg font-medium">
                                        {{ user.profil.address }}
                                    </h5>
                                </div>
                            </v-col>
                        </v-col>
    
                    </v-row>
                </div>
            </div>
    
            <div>
                <div class="flex items-center justify-between">
                    <h3 class="relative py-2 text-xl font-bold text-emerald-500 before:absolute before:w-16 before:h-1 before:bg-emerald-500 before:bottom-0">
                        Informations Professionnelles
                    </h3>
    
                </div>
    
                <div class="py-4">
                    <v-row>
                        <v-col>
                            <v-col>
                                <div class="flex flex-col">
                                    <p class="text-sm tracking-wider text-gray-500">
                                        Poste
                                    </p>
    
                                    <h5 class="text-xl font-medium ">
                                        {{ user.post.name }}
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
                                        {{ user.tpi.name }}
                                    </h5>
                                </div>
                            </v-col>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
// Imports
    import { useRoute } from 'vue-router';
    import { onMounted, ref } from 'vue';
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import VMainHeader from '@/components/VMainHeader.vue';
    import VButton from '@/components/VButton.vue';
    import userService from '@/services/users/userService';
    import format from '@/utils/format';
    
// Variables & state

    const route = useRoute();
    const user = ref(null);


// Functions

    const fetchUser = async () => {
        try {
            const response = await userService.getUser(route.params.id);
            
            user.value = response.data.user

        } catch (error) {
            
        }
    }
// Lifecycle hooks

    onMounted(async () => {
        await fetchUser();
    })
</script>