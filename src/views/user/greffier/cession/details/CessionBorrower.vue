<template>

    <div class="flex items-center justify-between">
        <h3 class="text-xl font-bold text-gray-700">Liste des emprunteurs</h3>

        <VButton
            title="Ajouter Emprunteur" 
            icon="mdi-plus"
            class="btn-cancel"
            @click="handleAdd"
        />
    </div>

    <v-skeleton-loader
      v-if="loading"
      type="table-tbody"
      class="mt-4"
    />
    
    <div v-else-if="borrowers !== null && borrowers.length > 0" class="mt-6">
        <VTable class="custom-border">
            <template #caption>
                <div class="p-4 bg-amber-100">
                    <h3 class="text-lg font-bold text-amber-500">Emprunteur(s)</h3>
                </div>
            </template>

            <template #thead>
                <tr>
                    <th># Emprunteur</th>
                    <th>Statut</th>
                    <th class="text-end">Montant Revenu</th>
                    <th class="text-end">Montant Accordé</th>
                    <th class="text-center">Actions</th>
                </tr>
            </template>
            
            <template #tbody>
                <tr v-for="(b, index) in borrowers" :key="index">
                    <td class="font-bold">
                        {{ b.party.last_name }} {{ b.party.first_name }}
                    </td>
                    
                    <td>
                        <v-chip
                            variant="tonal"
                            :color="b.status_color"
                            size="default"
                            :border="b.status_color"
                        >
                            {{ b.status_label  }}
                        </v-chip>
                    </td> 

                    <td class="text-end">
                        {{ format.formatMontant(b.salary_amount) }}
                    </td>

                    <td v-if="b.quota" class="text-end">
                        <div>
                            <p>
                                {{ format.formatMontant(b.quota.granted_amount) }}
                            </p>
                            <span class="text-gray-500">
                                {{ b.quota.percentage }} %
                            </span>
                        </div>
                    </td>

                    <td v-else class="font-bold text-gray-400 text-end">
                        Non défini
                    </td>


                    <td class="text-center">
                        <div class="flex justify-center gap-1">
                            <VTableAction 
                                :actions="actions" 
                                :title="b.party.first_name"
                                :objet="b"
                                @action="handleAction"
                            /> 
                        </div>
                    </td>
                </tr>
            </template>
        </VTable>
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
            Aucune emprunteur trouvé
        </p>

        <!-- Texte secondaire -->
        <p class="mb-4 text-sm text-gray-500">
            Ajoutez un nouveau emprunteur pour commencer.
        </p>
    </div>

    <v-overlay v-model="overlay" class="flex items-center justify-center">

        <AddBorrower
            v-model="overlay"
            :idCession="route.params.id"
            @reload="fetchCessionBorrowers"
            v-if="action === 'add'"
        />


        <EditBorrower
            v-model="overlay" 
            :borrower="objet"
            @reload="fetchCessionBorrowers"
            v-if="action === 'edit'"
        />

        <DeleteBorrower
            v-model="overlay" 
            :borrower="objet"
            @reload="fetchCessionBorrowers"
            v-if="action === 'delete'"
        />
    </v-overlay>

</template>

<script setup>
// Imports
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import VTable from '@/components/VTable.vue';
    import VTableAction from '@/components/VTableAction.vue';
    import VButton from '@/components/VButton.vue';
    import EditBorrower from '../edit/EditBorrower.vue';
    import DeleteBorrower from '../delete/DeleteBorrower.vue';
    import AddBorrower from '../add/AddBorrower.vue';
    import greffierService from '@/services/cessions/greffierService';
    import format from '@/utils/format'
    
// Variables & state

    const route = useRoute();
    const router = useRouter();

    const borrowers = ref(null);

    const overlay = ref(false);
    const action = ref(null);
    const objet = ref(null);

    const loading = ref(false);

    const actions = [
        {action: 'details', title: 'Détails', icon: 'mdi-list-box-outline'},
        {action: 'edit', title: 'Modifier', icon: 'mdi-pencil'},
        {action: 'delete', title: 'Supprimer', icon: 'mdi-trash-can-outline'},
    ]
// Functions
    const handleAdd = () => {
        action.value = 'add';
        overlay.value = !overlay.value
    }
    
    const handleAction = (act, obj) => {
        action.value = act === 'details' 
            ? router.push({ 
                name: 'greffier-cession-borrowers-details', 
                params: { 
                    id: route.params.id, 
                    idBorrower: obj.id 
                } 
            }) : act;
        objet.value = obj;
        overlay.value = !overlay.value
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
        loading.value = true;

        await fetchCessionBorrowers();

        setTimeout(() => {
            loading.value = false;
        }, 700);
    });
</script>