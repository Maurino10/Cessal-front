<template>
    <div>
        <div class="mb-12">
            <h3 class="text-2xl"> 
                <span class="font-bold text-emerald-500">03. </span>
                Informations sur le(s) emprunteurs(s)
            </h3>
        </div>
        
        <div v-if="borrowers !== null && borrowers.length > 0" class="mt-6">
            <VTable class="custom-border">
                <template #caption>
                    <div class="p-4 bg-amber-100">
                        <h3 class="text-lg font-bold text-amber-500">Emprunteur(s)</h3>
                    </div>
                </template>

                <template #thead>
                    <tr>
                        <th># Emprunteur</th>
                        <th>Adresse</th>
                        <th>CIN</th>
                        <th class="text-end">Montant Revenu</th>
                    </tr>
                </template>
                
                <template #tbody>
                    <tr v-for="(b, index) in borrowers" :key="index">
                        <td class="font-bold">
                            {{ b.natural_person.last_name }} {{ b.natural_person.first_name }}
                        </td>
                        
                        <td>
                            {{ b.natural_person_address.address }}
                        </td>
                        
                        <td class="font-mono">
                            {{ b.natural_person.cin }}
                        </td>


                        <td class="text-end">
                            {{ format.formatMontant(b.salary_amount) }}
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
                Aucun emprunteur trouvé
            </p>

            <!-- Texte secondaire -->
            <p class="mb-4 text-sm text-gray-500">
                Ajoutez un emprunteur pour commencer.
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
                    <p>Ajouter un emprunteur</p>
                </span>
            </button>
        </div>

        <div class="flex justify-end mt-4">
            <VButton
                title="Enregistrer"
                class="btn-primary"
                :disabled="!borrowers"
                @click="nextStep()"
            />
        </div>
    </div>

    <v-overlay v-model="overlay" class="flex items-center justify-center">
        <AddBorrower
            v-model="overlay"
            :idCession="route.params.id"
            @reload="fetchCessionBorrowers"
        />
    </v-overlay>
</template>

<script setup>

// Imports
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import AddBorrower from './AddBorrower.vue';
    import VTable from '@/components/VTable.vue';
    import VButton from '@/components/VButton.vue';
    import format from '@/utils/format'
    import greffierService from '@/services/cessions/greffierService';
    
// Variables & state
    const route = useRoute();
    const router = useRouter();
    
    const overlay = ref(false)

    const borrowers = ref(null);

// Functions

    const nextStep = () => {
        router.push({ name: 'greffier-cession-details',  params: { id: route.params.id } });
    }

    const fetchCessionBorrowers = async () => {
        try {
            const response = await greffierService.getAllCessionBorrowerByCession(route.params.id);
            borrowers.value = response.data.borrowers;

        } catch (error) {
            console.log(error)
        }
    }
// Lifecycle hooks
    onMounted(async () => {
        await fetchCessionBorrowers();
    })
</script>
