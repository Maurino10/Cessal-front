<template>
    <v-card width="700" class="relative h-[90vh] !border !shadow-sm !rounded-xl">
            <span class="absolute right-0 p-2 cursor-pointer bg-gray-50"
                @click="closeDialog"
            >
                <v-icon size="24">mdi-close</v-icon>
            </span>
            <v-row no-gutters>
                <v-col cols="5">
                    <div class="flex flex-col items-center justify-center h-full gap-2 p-6">
                        
                        <span>
                            <v-icon size="128">mdi-account-outline</v-icon>
                        </span>

                        <div>
                            <p class="text-xl font-bold text-center text-wrap">
                                {{ user.profil.last_name }} {{ user.profil.first_name }}
                            </p>
                            <div class="flex items-center justify-center gap-2 text-gray-500">
                                <v-icon size="16">mdi-email</v-icon>
                                <span class="text-sm">{{ user.email }}</span>
                            </div>
                        </div>
                        
                    </div>
                </v-col>
                <v-col cols="7">
                    <div class="p-6">
                        <!-- Informations personnelles -->
                        <div class="mb-6">
                            <div class="flex items-center gap-2 mb-4">
                                <h3 class="text-base font-semibold text-gray-800">Informations personnelles</h3>
                            </div>
                            
                            <div class="my-3">
                                <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                    <span class="flex items-center gap-2 text-sm text-gray-500">
                                        <v-icon size="14" color="gray">mdi-calendar</v-icon>
                                        Date de naissance
                                    </span>
                                    <span class="text-sm font-medium text-gray-900">
                                        {{ format.formatDate(user.profil.birthday) }}
                                    </span>
                                </div>
                                
                                <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                    <span class="flex items-center gap-2 text-sm text-gray-500">
                                        <v-icon size="14" color="gray">mdi-human-male-female</v-icon>
                                        Genre
                                    </span>
                                    <span class="text-sm font-medium text-gray-900">
                                        {{ user.profil.gender.name }}
                                    </span>
                                </div>
                                
                                <div class="flex items-start justify-between py-2">
                                    <span class="flex items-center gap-2 text-sm text-gray-500">
                                        <v-icon size="14" color="gray">mdi-map-marker</v-icon>
                                        Adresse
                                    </span>
                                    <span class="text-sm font-medium text-gray-900 text-right max-w-[200px]">
                                        {{ user.profil.address }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Informations d'identification -->
                        <div class="mb-6">
                            <div class="flex items-center gap-2 mb-4">
                                <h3 class="text-base font-semibold text-gray-800">Identification</h3>
                            </div>
                            
                            <div class="space-y-3">
                                <div class="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span class="flex items-center gap-2 text-sm text-gray-500">
                                        <v-icon size="14" color="gray">mdi-card-text</v-icon>
                                        CIN
                                    </span>
                                    <span class="font-mono text-sm font-medium text-gray-900">
                                        {{ user.profil.identity.cin }}
                                    </span>
                                </div>
                                
                                <div class="flex items-center justify-between py-2">
                                    <span class="flex items-center gap-2 text-sm text-gray-500">
                                        <v-icon size="14" color="gray">mdi-identifier</v-icon>
                                        Immatriculation
                                    </span>
                                    <span class="font-mono text-sm font-medium text-gray-900">
                                        {{ user.profil.identity.immatriculation }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Informations professionnelles -->
                        <div>
                            <div class="flex items-center gap-2 mb-4">
                                <h3 class="text-base font-semibold text-gray-800">Informations professionnelles</h3>
                            </div>
                            
                            <div class="space-y-3">
                                <div class="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span class="flex items-center gap-2 text-sm text-gray-500">
                                        <v-icon size="14" color="gray">mdi-account-tie</v-icon>
                                        Poste
                                    </span>
                                    <div class="text-right">
                                        <v-chip
                                            :color="getPostColor(props.user.profil.posts[0].post.role)"
                                            variant="tonal"
                                            size="small"
                                            class="font-weight-medium text-caption"
                                        >
                                            {{ props.user.profil.posts[0].post.name }}
                                        </v-chip>
                                    </div>
                                </div>
                                
                                <div class="flex items-start justify-between py-2">
                                    <span class="flex items-center gap-2 text-sm text-gray-500">
                                        <v-icon size="14" color="gray">mdi-bank</v-icon>
                                        TPI
                                    </span>
                                    <span class="text-sm font-medium text-gray-900 text-right max-w-[200px]">
                                        {{ user.profil.posts[0].tpi.name }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
    </v-card>
</template>

<script setup>
// Imports 
    import format from '@/utils/format';


// Variables & state
    const model = defineModel();
    const props = defineProps({
        user: {
            type: Object,
            required: true
        }
    })

//  Functions
    const closeDialog = () => {
        model.value = !model.value
    }
    
    const getInitials = (nom, prenom) => {
        return (nom.charAt(0) + prenom.charAt(0)).toUpperCase()
    }
    
    const getPostColor = (role) => {
        const colors = {
            'magistrat': '#A855F7',
            'greffier': '#06B6D4',
            'maitre': '#84cc16'
        }
        return colors[role] || 'secondary'
    }

</script>
