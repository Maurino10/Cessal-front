<template>

    <VBreadCrumb 
        :items="[
            {title: 'Territoires', disabled: true},
            {title: 'Régions', disabled: false},
        ]" 
    />
    
    <div class="main-body">
        <VMainHeader 
            :icon="{ icon: 'mdi-map-marker-radius', bgColor: '!bg-orange-500'}"
            title="Liste des régions" 
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit." 
        >
            <template #actions>
                <VButton title="Nouvelle région" icon="mdi-plus" class="btn-primary" @click="handleAdd()"/>
            </template>
    
        </VMainHeader>
        
        <FilterRegion
            v-if="provinces"
            :provinces="provinces"
            @filter="filterRegion"
        />
        <v-skeleton-loader v-if="loading"
          type="table-tbody"
          class="mt-4"
        />
        
        <div v-else-if="regions !== null && regions.data.length > 0">
            <VTable>        
                <template #thead>
        
                    <tr>
                        <th class="text-left">Région</th>
                        <th class="text-left">Province</th>
                        <th class="text-center">Action</th>
                    </tr>
                </template>
                
                <template #tbody>
                        <tr v-for="region in regions.data" :key="region.name">
                            <td>
                                <VCellIconText
                                    icon="mdi-map-marker-radius" 
                                    :text="region.name"
                                    iconColor="text-orange-500"
                                    bgColor="bg-orange-100"
                                /> 
                            </td>
        
                            <td>
                                {{ region.province.name }}
                            </td>
                            
                            <td class="text-center">
                                <VTableAction 
                                    :actions="actions" 
                                    :title="region.name" 
                                    :objet="region" 
                                    @action="handleActions" 
                                /> 
                            </td>
                        </tr>
                </template>
            </VTable>

            <VPagination
                v-model="page"
                :length="regions.last_page"
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
                Aucune région trouvée
            </p>
    
            <!-- Texte secondaire -->
            <p class="mb-4 text-sm text-gray-500">
                Ajoutez une nouvelle région pour commencer.
            </p>
        </div>
    
        <v-overlay v-model="overlay" class="flex items-center justify-center">
            <AddRegion 
                v-model="overlay" 
                :provinces="provinces"  
                @reload="fetchAllRegion"
                v-if="action === 'add'" 
            />
    
            <EditRegion 
                v-model="overlay" 
                :data="objet" 
                :provinces="provinces"  
                @reload="fetchAllRegion"
                v-if="action === 'edit'" 
            />
            
            <DeleteRegion 
                v-model="overlay" 
                :data="objet"  
                @reload="fetchAllRegion"
                v-if="action === 'delete'" 
            />
        </v-overlay>
    </div>
</template>

<script setup>
// Imports
    import { onMounted, ref } from 'vue';
    import VButton from '@/components/VButton.vue';
    import VMainHeader from '@/components/VMainHeader.vue';
    import VCellIconText from '@/components/VCellIconText.vue';
    import VTable from '@/components/VTable.vue';
    import VTableAction from '@/components/VTableAction.vue';
    import VPagination from '@/components/VPagination.vue';
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import regionService from "@/services/territories/regionService";
    import provinceService from "@/services/territories/provinceService";
    import FilterRegion from './FilterRegion.vue';
    import AddRegion from './AddRegion.vue';
    import EditRegion from './EditRegion.vue';
    import DeleteRegion from './DeleteRegion.vue';

// Variables & state   
    const regions = ref(null);
    const provinces = ref(null);
    
    const overlay = ref(false);
    const action = ref(null);
    const objet = ref(null);

    const loading = ref(false);  
    
    const page = ref(1);
    const search = ref('');
    const selectedProvince = ref(null);
    
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
        await fetchAllRegion();
    }


    const filterRegion = async (searchRegion, provinceSelected) => {
        search.value = searchRegion;
        selectedProvince.value = provinceSelected;
        page.value = 1;
        await fetchAllRegion();
    }


    const fetchAllRegion = async () => {
        try {
            const response = await regionService.getAllRegion(search.value, selectedProvince.value, page.value);
            regions.value = response.data.regions;
        } catch (error) {
            console.error(error.response.data);
        }
    }

    const fetchAllProvince  = async () => {
        try {
            const response = await provinceService.listProvince();
            provinces.value = response.data.provinces;
        } catch (error) {
            console.error(error.response.data);

        }
    }
    
// Lifecycle hooks
    onMounted(async () => {
        loading.value = true;
        
        await Promise.all([
            fetchAllRegion(),
            fetchAllProvince(),            
        ]);

        setTimeout(() => {
            loading.value = false;
        }, 700); 
    })
</script>