<template>
    <v-card width="700" class="relative h-[90vh] !border !shadow-sm !rounded-xl">
            <span class="absolute right-0 p-2 bg-gray-100 cursor-pointer"
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
                                {{ inscription.last_name }} {{ inscription.first_name }}
                            </p>
                        </div>
                        
                    </div>
                </v-col>
                <v-col cols="7">
                    <div class="p-6">
                        <!-- Informations personnelles -->
                        <div class="section">
                            <div class="section-title">
                                <h3>Informations personnelles</h3>
                            </div>
                            
                            <div class="space-y-3 section-text">
                                <div class="section-text-item">
                                    <span class="flex items-center gap-2 text-sm text-gray-500">
                                        <v-icon size="14" color="#6b7280">mdi-calendar</v-icon>
                                        Date de naissance
                                    </span>
                                    <span class="text-sm font-medium text-gray-900">
                                        {{ format.formatDate(inscription.birthday) }}
                                    </span>
                                </div>
                                
                                <div class="section-text-item">
                                    <span class="flex items-center gap-2 text-sm text-gray-500">
                                        <v-icon size="14" color="#6b7280">mdi-human-male-female</v-icon>
                                        Genre
                                    </span>
                                    <span class="text-sm font-medium text-gray-900">
                                        {{ inscription.gender.name }}
                                    </span>
                                </div>
                                
                                <div class="section-text-item">
                                    <span class="flex items-center gap-2 text-sm text-gray-500">
                                        <v-icon size="14" color="#6b7280">mdi-card-text</v-icon>
                                        CIN
                                    </span>
                                    <span class="font-mono text-sm font-medium text-gray-900">
                                        {{ inscription.cin }}
                                    </span>
                                </div>

                                <div class="section-text-item">
                                    <span class="flex items-center gap-2 text-sm text-gray-500">
                                        <v-icon size="14" color="#6b7280">mdi-identifier</v-icon>
                                        Immatriculation
                                    </span>
                                    <span class="font-mono text-sm font-medium text-gray-900">
                                        {{ inscription.immatriculation }}
                                    </span>
                                </div>

                                <div class="section-text-item">
                                    <span class="flex items-center gap-2 text-sm text-gray-500">
                                        <v-icon size="14" color="#6b7280">mdi-map-marker</v-icon>
                                        Adresse
                                    </span>
                                    <span class="text-sm font-medium text-gray-900 text-right max-w-[200px]">
                                        {{ inscription.address }}
                                    </span>
                                </div>

                                <div class="section-text-item">
                                    <span class="flex items-center gap-2 text-sm text-gray-500">
                                        <v-icon size="14" color="#6b7280">mdi-email</v-icon>
                                        Email
                                    </span>
                                    <span class="text-sm font-medium text-gray-900 text-right max-w-[200px]">
                                        {{ inscription.email }}
                                    </span>
                                </div>
                                
                            </div>
                        </div>
                        
                        <!-- Informations professionnelles -->
                        <div class="section">
                            <div class="section-title">
                                <h3>Informations professionnelles</h3>
                            </div>
                            
                            <div class="space-y-3 section-text">
                                <div class="section-text-item">
                                    <span class="flex items-center gap-2 text-sm text-gray-500">
                                        <v-icon size="14" color="#6b7280">mdi-account-tie</v-icon>
                                        Poste
                                    </span>
                                    <div class="text-right">
                                        <v-chip
                                            :color="getPostColor(props.inscription.post.role)"
                                            variant="tonal"
                                            size="small"
                                            class="font-weight-medium text-caption"
                                        >
                                            {{ props.inscription.post.name }}
                                        </v-chip>
                                    </div>
                                </div>
                                
                                <div class="section-text-item">
                                    <span class="flex items-center gap-2 text-sm text-gray-500">
                                        <v-icon size="14" color="#6b7280">mdi-bank</v-icon>
                                        TPI
                                    </span>
                                    <span class="text-sm font-medium text-gray-900 text-right max-w-[200px]">
                                        {{ inscription.tpi.name }}
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
        inscription: {
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

<style scoped>

    .section {
        display: flex;
        flex-direction: column;
        margin-bottom: 14px;
    }

    .section-title {
        margin-bottom: 12px;
    }

    .section-title h3 {
        color: #1f2937;
        font-size: 16px;
        line-height: 24px;
        font-weight: 600;
    }

    .section-text-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
        border-bottom: 1px solid #e5e7eb;
    }
</style>
