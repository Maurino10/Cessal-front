<template>

    <div class="px-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span>
                    <v-icon
                        icon="mdi-account-group-outline"
                        size="32"
                        color="#10b981"
                    ></v-icon>
                </span>
    
                <h4 class="text-xl font-bold">
                    Liste des prêteurs
                </h4>
            </div>
            
            <VButton
                v-if="props.cession.signed === 0"
                title="Ajouter Prêteur" 
                icon="mdi-plus"
                class="btn-secondary"
                @click="handleAdd"
            />
        </div>
    
        <v-skeleton-loader v-if="loading"
          type="table-tbody"
          class="mt-4"
        />
    
        <div v-else-if="lenders !== null && lenders.length > 0" class="mt-5">
            <VTable class="custom-border !rounded-lg"> 
                <template #caption>
                    <div class="p-4 bg-blue-100">
                        <h3 class="text-lg font-bold text-blue-500">Prêteur(s)</h3>
                    </div>
                </template>
    
                <template #thead>
                    <tr>
                        <th># Prêteur</th>
                        <th>Adresse</th>
                        <th>CIN</th>
                        <th v-if="props.cession.signed === 0" class="text-center">Actions</th>
                    </tr>
                </template>
                
                <template #tbody>
                    <tr v-for="(p, index) in lenders" :key="index">
                        <template v-if="p.type === 'natural_person'">
                            <td class="font-bold">
                                {{ p.natural_person?.last_name }}
                                {{ p.natural_person?.first_name }}
                            </td>
        
                            <td>
                                {{ p.natural_person_address?.address }}
                            </td>
                            
                            <td class="font-mono">
                                {{ p.natural_person?.cin }}
                            </td>
        
                            
                            <td v-if="props.cession.signed === 0" class="text-center">
                                <VTableAction 
                                    :actions="actions" 
                                    :title="p.natural_person?.first_name"
                                    :objet="p"
                                    @action="handleAction"
                                /> 
                            </td>
                        </template>
                        
                        <template v-else>
                            <td class="font-bold">
                                {{ p.legal_person?.name }}
                            </td>
        
                            <td>
                                {{ p.legal_person_address?.address }}
                            </td>
                            
                            <td>
                            </td>
                            
                            <td v-if="props.cession.signed === 0" class="text-center">
                                <VTableAction 
                                    :actions="[actions[1]]" 
                                    :title="p.legal_person?.name"
                                    :objet="p"
                                    @action="handleAction"
                                /> 
                            </td>
                        </template>
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
                Aucune prêteur trouvé
            </p>
    
            <!-- Texte secondaire -->
            <p class="mb-4 text-sm text-gray-500">
                Ajoutez un nouveau prêteur pour commencer.
            </p>
        </div>
    </div>

    <v-overlay v-model="overlay" class="flex items-center justify-center">

        <AddLender
            v-model="overlay"
            :idCession="route.params.id"
            @reload="fetchCessionLenders"
            v-if="action === 'add'"
        />
        
        <EditLender  
            v-model="overlay" 
            :lender="objet" 
            @reload="fetchCessionLenders"
            v-if="action === 'edit'"
        />

        <DeleteLender
            v-model="overlay" 
            :lender="objet" 
            @reload="fetchCessionLenders"
            v-if="action === 'delete'"
        />
    </v-overlay>


</template>

<script setup>
// Imports
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import VTable from '@/components/VTable.vue';
    import VTableAction from '@/components/VTableAction.vue';
    import VButton from '@/components/VButton.vue';
    import EditLender from '../edit/EditLender.vue';
    import DeleteLender from '../delete/DeleteLender.vue';
    import AddLender from '../add/AddLender.vue';
    import greffierService from '@/services/cessions/greffierService';

// Variables & state
    const route = useRoute();

    const props = defineProps({
        id: [String, Number],
        cession: Object
    });
        
    const lenders = ref(null);

    const overlay = ref(false);
    const action = ref(null);
    const objet = ref(null);

    const loading = ref(false);

    const actions = [
        {action: 'edit', title: 'Modifier', icon: 'mdi-pencil'},
        {action: 'delete', title: 'Supprimer', icon: 'mdi-trash-can-outline'},
    ]
// Functions

    const handleAdd = () => {
        action.value = 'add';
        overlay.value = !overlay.value
    }

    const handleAction = (act, obj) => {
        action.value = act;
        objet.value = obj;
        overlay.value = !overlay.value
    }

    const fetchCessionLenders = async () => {
        try {
            const response = await greffierService.getAllCessionLenderByCession(route.params.id);
            lenders.value = response.data.lenders;

        } catch (error) {
            
        }
    }
// Lifecycle hooks
    onMounted(async () => {
        loading.value = true;
        
        await fetchCessionLenders();

        setTimeout(() => {
            loading.value = false;
        }, 700);
    });
        
</script>