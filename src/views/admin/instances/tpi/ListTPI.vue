<template>
    
    <VBreadCrumb 
        :items="[
            {title: 'Instances', disabled: true},
            {title: 'TPI', disabled: false},
        ]" 
    />
    <div class="main-body">
        <VMainHeader    
            :icon="{ icon: 'mdi-bank', bgColor: '!bg-blue-500'}"
            title="Liste des TPI" 
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit." 
        >
            <template #actions>
                <VButton 
                    title="Nouveau TPI" 
                    icon="mdi-plus" 
                    class="btn-primary" 
                    @click="handleAdd()"
                />
            </template>
    
        </VMainHeader>
        
        <FilterTPI
            v-if="ca"
            :ca="ca"
            @filter="filterTPI"
        />

        <v-skeleton-loader v-if="loading"
          type="table-tbody"
          class="mt-4"
        />  

        
        <div v-else-if="tpis !== null && tpis.data.length > 0">  

            <VTable class="custom-table" density="comfortable">
        
                 <template #thead>
                    <tr>
                        <th class="text-left">TPI</th>
                        <th class="text-left">Cour d'appel</th>
                        <th class="text-center">Actions</th>
                    </tr>
                 </template>
        
                <template #tbody>
                    <tr v-for="tpi in tpis.data" :key="tpi.name">
                        <td>
                            <VCellIconText
                                icon="mdi-bank" 
                                :text="tpi.name"
                                iconColor="text-blue-500"
                                bgColor="bg-blue-100"
                            />
                        </td>
                    
                        <td>
                            {{ tpi.ca.name }}
                        </td>
        
                        <td class="text-center">
                            <VTableAction 
                                :actions="actions" 
                                :title="tpi.name" 
                                :objet="tpi" 
                                @action="handleActions" 
                            /> 
                        </td>
                    </tr>
                </template>
            </VTable>

            <VPagination
                v-model="page"
                :length="tpis.last_page"
                @paginate="paginate"
            />
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
                Aucun TPI trouvé
            </p>
    
            <!-- Texte secondaire -->
            <p class="mb-4 text-sm text-gray-500">
                Ajoutez un nouveau TPI pour commencer.
            </p>
        </div>
    
    
        <v-overlay v-model="overlay" class="flex items-center justify-center">
            <AddTPI v-model="overlay" 
                :ca="ca" 
                :districts="districts"  
                @reload="fetchAllTPI"
                v-if="action === 'add'" 
            />
            
            <EditTPI v-model="overlay" 
                :data="objet" 
                :ca="ca" 
                :districts="districts" 
                @reload="fetchAllTPI"
                v-if="action === 'edit'" 
            />
            
            <DeleteTPI v-model="overlay" 
                :data="objet" 
                @reload="fetchAllTPI"
                v-if="action === 'delete'" 
            />
        </v-overlay>
    </div>

</template>

<script setup>
// Imports
    import { onMounted, ref } from 'vue';
    import VMainHeader from '@/components/VMainHeader.vue';
    import VTable from '@/components/VTable.vue';
    import VTableAction from '@/components/VTableAction.vue';
    import VPagination from '@/components/VPagination.vue';
    import VCellIconText from '@/components/VCellIconText.vue';
    import VButton from '@/components/VButton.vue';
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import FilterTPI from './FilterTPI.vue';
    import axios from "@/services/axiosInstance";
    import tpiService from "@/services/instances/tpiService";
    import caService from "@/services/instances/caService";
    import districtService from "@/services/territories/districtService";
    import AddTPI from './AddTPI.vue';
    import EditTPI from './EditTPI.vue';
    import DeleteTPI from './DeleteTPI.vue';

   
// Variables & state
    const tpis = ref(null);
    const districts = ref(null);
    const ca = ref(null);
    
    const overlay = ref(false);
    const action = ref(null);
    const objet = ref(null);
    
    const loading = ref(false);

    const page = ref(1);
    const search = ref('');
    const selectedCa = ref(null);
    
    const actions = [
        {action: 'edit', title: 'Modifier', icon: 'mdi-pencil'},
        {action: 'delete', title: 'Supprimer', icon: 'mdi-trash-can-outline'},
    ]

// Functions
    const handleAdd = () => {
        action.value = 'add';
        overlay.value = !overlay.value;
    }


    const handleActions = (act, obj) => {
        action.value = act;
        objet.value = obj;
        overlay.value = !overlay.value;
    }
    
    const paginate = async () => {
        await fetchAllTPI();
    }



    const filterTPI = async (searchTPI, caSelected) => {
        search.value = searchTPI;
        selectedCa.value = caSelected;
        page.value = 1;
        await fetchAllTPI();
    }
    
    const fetchAllTPI= async () => {
        try {
            const response = await tpiService.getAllTPI(search.value, selectedCa.value, page.value);
            tpis.value = response.data.tpi;
        } catch (error) {
            console.error(error.response.data); 
        }
    }

    const fetchAllDistrict = async () => {
        try {
            const response = await districtService.listDistrict();
            districts.value = response.data.districts;
        } catch (error) {
            console.error(error.response.data);
        }
    }
    
    const fetchAllCA = async () => {
        try {
            const response = await caService.listCA();
            ca.value = response.data.ca;
        } catch (error) {
            console.error(error.response.data);

        }
    }
    
// Lifecycle hooks
    onMounted(async () => {
        loading.value = true;
        
        await Promise.all([
            fetchAllTPI(),
            fetchAllDistrict(),
            fetchAllCA(),
        ]);

        setTimeout(() => {
            loading.value = false;
        }, 700); 
    })
</script>