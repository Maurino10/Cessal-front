<template>
  
    <div class="px-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span>
                    <v-icon
                        icon="mdi-account-outline"
                        size="32"
                        color="#10b981"
                    ></v-icon>
                </span>
    
                <h4 class="text-xl font-bold">
                    Magistrat en charge de la cession
                </h4>
            </div>
    
            <VButton
                v-if="props.cession.signed === 0 && magistrat"
                title="Réassigner"
                class="btn-secondary"
                @click="handleAssign"
            />
        </div>
    
        <div v-if="loading"
            class="flex flex-col items-center mt-12"
        >
            <v-skeleton-loader
                type="image, image"
                width="240"
                class="mt-4"
            />
        </div>
    
        
        <div v-else-if="magistrat" class="flex items-center justify-center w-full mt-5">
            <div class="flex w-full gap-8 p-8 rounded-lg custom-shadow">
                <div class="flex items-center p-8 rounded-full bg-slate-200">
                    <v-icon
                        icon="mdi-account-outline"
                        size="128"
                        color="#64748b"
                    ></v-icon>
                </div>
                
                <div class="flex flex-col justify-center gap-5">
                    <div>
                        <h3 class="text-2xl">
                            {{ magistrat.user.profil.last_name }} {{ magistrat.user.profil.first_name }}
                        </h3>
                        <p class="text-gray-500 text-caption">{{ magistrat.user.profil.email }}</p>
                    </div>
                    
                    <div>
                        <v-chip
                            variant="tonal"
                            :color="magistrat.user.post.post_color"
                        >
                            {{ magistrat.user.post.name }}
                        </v-chip>
                    </div>
        
                    <div>
                        <h4>{{ magistrat.user.tpi.name }}</h4>
                    </div>
                </div>
            </div>
        </div>

        <div v-else
            class="flex flex-col items-center justify-center px-6 py-12 mt-8"
        >
            <!-- Icône -->
            <v-icon size="48" class="mb-4 text-gray-400">
                mdi-circle-off-outline
            </v-icon>
    
            <!-- Texte principal -->
            <p class="mb-1 text-lg font-semibold text-gray-700">
                Cession non assignée
            </p>
    
            <!-- Texte secondaire -->
            <p class="mb-4 text-sm text-gray-500">
                Cette cession n'a pas encore été assignée à un Magistrat
            </p>

            <VButton
                title="Assigner à un Magistrat" 
                class="btn-primary"
                @click="handleAssign"
            />
        </div>
    </div>
</template>

<script setup>
// Imports
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import VButton from '@/components/VButton.vue'
    import greffierService from '@/services/cessions/greffierService';
// Variables & state
    const route = useRoute();
    const router = useRouter();

    const props = defineProps({
        id: [String, Number],
        cession: Object
    });

    const magistrat = ref(null);

    const loading = ref(false);

// Functions
    const handleAssign = () => {
        router.push({ name: 'greffier-cession-magistrat-assign',  params: { id: route.params.id } });
    }

    const fetchCessionAssignment = async () => {
        try {
            const response = await greffierService.getMagistratByCession(route.params.id);
            magistrat.value = response.data.magistrat;
        } catch (error) {
            
        }
    }

// Lifecycle hooks
    onMounted(async () => {
        loading.value = true;

        await fetchCessionAssignment();

        setTimeout(() => {
            loading.value = false;
        }, 700);
    })
</script>   