<template>
    <div>
        <div class="mb-8">
            <h3 class="relative py-2 text-xl text-emerald-500 before:absolute before:w-16 before:h-1 before:bg-emerald-400 before:bottom-0 before:rounded-full"> 
                2 - Informations sur le(s) prêteur(s)
            </h3>
        </div>
        
        <div v-if="lenders !== null && lenders.length > 0" class="mt-6">
            <VTable class="custom-border"> 
                <template #caption>
                    <div class="p-4 bg-blue-100">
                        <h3 class="text-lg font-bold text-blue-500">Prêteur(s)</h3>
                    </div>
                </template>

                <template #thead>
                    <tr>
                        <th># Prêteur</th>
                        <th>CIN</th>
                        <th>Adresse</th>
                    </tr>
                </template>
                
                <template #tbody>
                    <tr v-for="(p, index) in lenders" :key="index">
                        <td class="font-bold">
                            {{ p.party?.last_name }}
                            {{ p.party?.first_name }}
                            {{ p.entity?.name }}
                        </td>

                        <td class="font-mono">
                            {{ p.party?.cin }}
                        </td>

                        <td>
                            {{ p.party?.address }}
                        </td>
                    </tr>
                </template>
            </VTable>
        </div>

        <div v-else
            class="flex flex-col items-center justify-center mt-8"
        >
            <!-- Icône -->
            <v-icon size="48" class="mb-4 text-gray-400">
                mdi-circle-off-outline
            </v-icon>

            <!-- Texte principal -->
            <p class="mb-1 text-lg font-semibold text-gray-700">
                Aucune prêteur ajouté
            </p>

            <!-- Texte secondaire -->
            <p class="mb-4 text-sm text-gray-500">
                Ajoutez un prêteur pour commencer.
            </p>
            
        </div>

        <div class="mt-4">
            <button 
                class="w-full p-4 text-black !border border-emerald-500 border-solid rounded-lg bg-emerald-100"
                @click="overlay = true"
            
            >
                <span class="flex items-center justify-center w-full gap-2 text-sm">
                    <v-icon 
                        icon="mdi-plus" 
                        size="20"
                        class="text-emerald-500"
                    ></v-icon>
                    <p>Ajouter un prêteur</p>
                </span>
            </button>
        </div>

        <div class="flex justify-end mt-4">
            <VButton
                title="Suivant"
                icon="mdi-arrow-right-thin"
                iconPosition="right"
                class="btn-submit"
                :disabled="!lenders"
                @click="nextStep()"
            />
        </div>
    </div>

    <v-overlay v-model="overlay" class="flex items-center justify-center">

        <AddLender
            v-model="overlay"
            :idCession="route.params.id"
            @reload="fetchCessionLenders"
        />
    </v-overlay>
</template>

<script setup>

// Imports
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import AddLender from '../add/AddLender.vue';
    import VTable from '@/components/VTable.vue';
    import VButton from '@/components/VButton.vue';
    import greffierService from '@/services/cessions/greffierService';
    
// Variables & state
    const route = useRoute();
    const router = useRouter();
    
    const overlay = ref(false)

    const lenders = ref(null);

// Functions

    const nextStep = () => {
        router.push({ name: 'greffier-cession-add-borrowers', params: { id: route.params.id } });
    }

    const fetchCessionLenders = async () => {
        try {
            const response = await greffierService.getAllCessionLenderByCession(route.params.id);
            lenders.value = response.data.lenders;
        } catch (error) {
            console.error(error);
        }
    }
// Lifecycle hooks
    onMounted(async () => {
        await fetchCessionLenders();
    })
</script>
