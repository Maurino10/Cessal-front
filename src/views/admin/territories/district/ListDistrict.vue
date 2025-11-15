<template>
    
    <VBreadCrumb 
        :items="[
            {title: 'Territoires', disabled: true},
            {title: 'Districts', disabled: false},
        ]" 
    />
    
    <div class="main-body">
        <VMainHeader 
            :icon="{ icon: 'mdi-map-marker', bgColor: '!bg-pink-600'}"
            title="Liste des districts" 
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit." 
        >
            <template #actions>
                <VButton title="Nouveau district" icon="mdi-plus" class="btn-primary" @click="handleAdd()"/>
            </template>
        </VMainHeader>
        
        <FilterDistrict
            v-if="provinces && regions"
            :provinces="provinces"
            :regions="regions"
            @filter="filterDistrict"
        />
        
        <v-skeleton-loader v-if="loading"
          type="table-tbody"
          class="mt-4"
        />
        
        <div v-else-if="districts !== null && districts.data.length > 0">
            <VTable>
                <template #thead>
                    <tr>
                    </tr>
                    <tr>
                        <th class="text-left">District</th>
                        <th class="text-left">Région</th>
                        <th class="text-left">Province</th>
                        <th class="text-center">Action</th>
                    </tr>
                </template>
                <template #tbody>
                        <tr v-for="district in districts.data" :key="district.name">
                            <td>
                                <VCellIconText
                                    icon="mdi-map-marker" 
                                    :text="district.name"
                                    iconColor="text-pink-500"
                                    bgColor="bg-pink-100"
                                />  
                            </td>
        
                            <td>
                                {{ district.region.name }}
                            </td>
        
                            <td>
                                {{ district.region.province.name }}
                            </td>
                            
                            <td class="text-center">
                                <VTableAction 
                                    :actions="actions" 
                                    :title="district.name" 
                                    :objet="district" 
                                    @action="handleActions" 
                                /> 
                            </td>
                        </tr>
                </template>
            </VTable>

            <VPagination
                v-model="page"
                :length="districts.last_page"
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
                Aucun district trouvé
            </p>
    
            <!-- Texte secondaire -->
            <p class="mb-4 text-sm text-gray-500">
                Ajoutez un nouveau district pour commencer.
            </p>
        </div>
    
    
        <v-overlay v-model="overlay" class="flex items-center justify-center">
            <AddDistrict 
                v-model="overlay" 
                :regions="regions" 
                @reload="fetchAllDistrict"
                v-if="action === 'add'" 
            />
    
            <EditDistrict 
                v-model="overlay" 
                :data="objet" 
                :regions="regions" 
                @reload="fetchAllDistrict"
                v-if="action === 'edit'" 
            />
            
            <DeleteDistrict 
                v-model="overlay" 
                :data="objet" 
                @reload="fetchAllDistrict"
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
    import VButton from '@/components/VButton.vue';
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import VCellIconText from '@/components/VCellIconText.vue';
    import districtService from "@/services/territories/districtService";
    import regionService from "@/services/territories/regionService";
    import provinceService from "@/services/territories/provinceService";
    import FilterDistrict from './FilterDistrict.vue';
    import AddDistrict from './AddDistrict.vue';
    import EditDistrict from './EditDistrict.vue';
    import DeleteDistrict from './DeleteDistrict.vue';

    
// Variables & state
    const districts = ref(null);
    const regions = ref(null);
    const provinces = ref(null);
    
    const overlay = ref(false);
    const action = ref(null);
    const objet = ref(null);
    
    const loading = ref(false);

    const page = ref(1);
    const search = ref('');
    const selectedProvince = ref(null);
    const selectedRegion = ref(null);
    
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
        await fetchAllDistrict();
    }


    const filterDistrict = async (searchDistrict, provinceSelected, regionSelected) => {
        search.value = searchDistrict;
        selectedProvince.value = provinceSelected;
        selectedRegion.value = regionSelected;
        page.value = 1;
        await fetchAllDistrict();
    }
    
    const fetchAllDistrict = async () => {        
        try {
            const response = await districtService.getAllDistrict(search.value, selectedProvince.value, selectedRegion.value, page.value);
            districts.value = response.data.districts;
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
    
    const fetchAllRegion = async () => {
        try {
            const response = await regionService.listRegion();
            regions.value = response.data.regions;
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
            fetchAllDistrict(),
        ]);

        setTimeout(() => {
            loading.value = false;
        }, 700); 
    })
</script>