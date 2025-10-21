<template>

    <VBreadCrumb 
        :items="[
            {title: 'cessions', disabled: true},
            {title: `${route.params.id}`, disabled: true},
            {title: 'emprunteurs', disabled: true},
            {title: 'détails', disabled: false},
        ]" 
    />

    <div v-if="borrower">
        <VMainHeader 
            :icon="{ icon: 'mdi-chart-donut', bgColor: '!bg-teal-400'}"
            :title="borrower.party.last_name+' '+borrower.party.first_name" 
            subtitle="Emprunteur" 
        >
        </VMainHeader>
        
        <v-row>
            <v-col>
                <div class="flex-grow h-full p-8 rounded-lg custom-shadow">

                    <h1 class="mb-5 text-xl text-center text-gray-800">Informations d'emprunteur</h1>
                    
                    <div class="py-2 text-base border-b">
                        <h4 class="text-gray-400">Nom</h4>
                        <p class="text-lg font-bold tracking-wide text-emerald-500">{{ borrower.party.last_name }}</p>
                    </div>
                    <div class="py-2 text-base border-b">
                        <h4 class="text-gray-400">Prénom</h4>
                        <p class="text-lg font-bold tracking-wide text-emerald-500">{{ borrower.party.first_name }}</p>
                    </div>
                    <div class="py-2 text-base border-b">
                        <h4 class="text-gray-400">CIN</h4>
                        <p class="text-lg font-bold tracking-wide text-emerald-500">{{ borrower.party.cin }}</p>
                    </div>
                    <div class="py-2 text-base">
                        <h4 class="text-gray-400">Adresse</h4>
                        <p class="text-lg font-bold tracking-wide text-emerald-500">{{ borrower.party.address }}</p>
                    </div>
                </div>
            </v-col>
            
            <v-col>
                <div class="flex-grow h-full p-8 rounded-lg custom-shadow">

                    <h1 class="mb-5 text-xl text-center text-gray-800">Détails financiers</h1>
                    
                    <div class="py-2 text-base border-b">
                        <h4 class="text-gray-400">Montant revenu</h4>
                        <p class="text-lg font-bold tracking-wide text-emerald-500">{{ format.formatMontant(borrower.salary_amount) }}</p>
                    </div>
                    <div class="py-2 text-base border-b">
                        <h4 class="text-gray-400">Montant accordé</h4>
                        <p v-if="borrower.quota" class="text-lg font-bold tracking-wide text-emerald-500">
                            {{ format.formatMontant(borrower.quota.granted_amount) }}
                        </p>
                        <p v-else class="text-lg tracking-wide text-amber-500">
                            En attente
                        </p>
                    </div>
                    <div class="py-2 text-base">
                        <h4 class="text-gray-400">Pourcentage</h4>
                        <p v-if="borrower.quota" class="text-lg font-bold tracking-wide text-emerald-500">
                            {{ format.formatMontant(borrower.quota.percentage) }} %
                        </p>
                        <p v-else class="text-lg tracking-wide text-amber-500">
                            En attente
                        </p>
                    </div>
                </div>
            </v-col>

            <v-col>
                <div class="flex-grow h-full p-8 rounded-lg custom-shadow">

                    <h1 class="mb-5 text-xl text-center text-gray-800">Références d’enregistrement</h1>

                    <div v-if="borrower.reference !== null">
                        <div class="py-2 text-base border-b">
                            <h4 class="text-gray-400">Reçu nº</h4>
                            <p class="text-lg font-bold tracking-wide text-emerald-500">{{ borrower.reference.numero_recu }}</p>
                        </div>
                        <div class="py-2 text-base border-b">
                            <h4 class="text-gray-400">Feuillet nº</h4>
                            <p class="text-lg font-bold tracking-wide text-emerald-500">{{ borrower.reference.numero_feuillet }}</p>
                        </div>
                        <div class="py-2 text-base border-b">
                            <h4 class="text-gray-400">Répertoire nº</h4>
                            <p class="text-lg font-bold tracking-wide text-emerald-500">{{ borrower.reference.numero_repertoire }}</p>
                        </div>
                        <div class="py-2 text-base">
                            <h4 class="text-gray-400">Du</h4>
                            <p class="text-lg font-bold tracking-wide text-emerald-500">{{ format.formatDate(borrower.reference.date) }}</p>
                        </div>
    
                        <div class="flex gap-4 mt-8">
                             <VButton
                                title="Modifier"
                                class="flex-grow btn-cancel"
                                @click="handleEdit(borrower.reference)"
                            />
                            <VButton
                                title="Imprimer"
                                class="flex-grow btn-submit"
                                @click="downloadDeclaration(borrower.reference)"
                            />
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
                            <p class="mb-1 text-base font-semibold text-gray-700">
                                Référence non définie
                            </p>

                            <!-- Texte secondaire -->
                            <p class="mb-4 text-xs text-center text-gray-500">
                                Veuillez enregistrer le reçu, le feuillet et le répertoire afin de pouvoir imprimer la déclarattion de cession.
                            </p>

                            <div>
                                <VButton
                                    title="Définir la référence" 
                                    class="btn-submit"
                                    @click="handleAdd"
                                />
                            </div>
                        </div>
                    
                </div>
            </v-col>
            
    
        </v-row>
    </div>

    <v-overlay v-model="overlay" class="flex items-center justify-center">
        <AddReferenceBorrower
            v-if="action === 'add'"
            v-model="overlay"
            :idCession="route.params.id"
            :borrower="borrower"
            @reload="fetchCessionBorrower"
        />

        <EditBorrowerReference
            v-if="action === 'edit'"
            v-model="overlay"
            :idCession="route.params.id"
            :borrower="borrower"
            :reference="objet"
            @reload="fetchCessionBorrower"
        />
    </v-overlay>
</template>

<script setup>
import { useRoute } from 'vue-router';

// Imports
    import { handleError, onMounted, ref } from 'vue';
    import VButton from '@/components/VButton.vue';
    import format from '@/utils/format'
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import VMainHeader from '@/components/VMainHeader.vue';
    import greffierService from '@/services/cessions/greffierService';
    import AddReferenceBorrower from '../add/AddReferenceBorrower.vue';
    import EditBorrowerReference from '../edit/EditBorrowerReference.vue';


// Variables & state


    const route = useRoute();
    
    const borrower = ref(null);

    const overlay = ref(false);
    const objet = ref(null);
    const action = ref(null);

// Functions

    const handleAdd = () => {
        action.value = 'add';
        overlay.value = true;
    }

    const handleEdit = (obj) => {
        action.value = 'edit';
        objet.value = obj
        overlay.value = true;
    }

    const downloadDeclaration = async (reference) => {
        try {
            const response = await greffierService.generateDeclaration(route.params.id, route.params.idBorrower, reference.id);
            
            if (response.statusText !== "OK") {
                throw new Error('Erreur lors du téléchargement du fichier');
            }

            // Générer le blob et ouvrir dans un nouvel onglet
            const blob = response.data;
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl, '_blank');

            setTimeout(() => URL.revokeObjectURL(blobUrl) ,100);
        } catch (error) {
            console.log(error)
        }   
    }

    const fetchCessionBorrower = async () => {
        try {
            const response = await greffierService.getCessionBorrower(route.params.id, route.params.idBorrower);
            borrower.value = response.data.borrower;

        } catch (error) {
            console.log(error)
        }
    }
// Lifecycle hooks 
    onMounted(async () => {
        await fetchCessionBorrower();
    })
</script>