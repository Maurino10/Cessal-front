<template>
  
    <div class="flex items-center justify-between">
        <h3 class="text-xl font-bold text-gray-700">Magistrat en charge de la cession</h3>

        <VButton 
            title="Réassigner"
            class="btn-cancel"
            @click="handleAssign"
        />
    </div>

    <div
        v-if="loading"
        class="flex flex-col items-center mt-12"
    >
        <v-skeleton-loader
            type="image, image"
            width="240"
            class="mt-4"
        />
    </div>

    
    <div v-else-if="magistrat" class="flex items-center justify-center mt-12">
        <div class="flex gap-8 px-12 py-8 rounded-lg custom-shadow bg-light_gray">
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

    <div v-else class="flex flex-col items-center gap-8 mt-16">
        <div class="flex flex-col items-center">
            <span>
                <v-icon
                    icon="mdi-circle-off-outline"
                    size="64"
                    class="!text-gray-400"
                ></v-icon>
            </span>
            
            <div class="text-gray-400">
                <h3 class="text-2xl font-bold text-center">Cession non assignée</h3>
                <p class="text-base text-center">Cette cession n'a pas encore été assignée à un Magistrat</p>
            </div>
        </div>

        <div>
            <VButton
                title="Assigner à un Magistrat" 
                class="btn-submit"
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