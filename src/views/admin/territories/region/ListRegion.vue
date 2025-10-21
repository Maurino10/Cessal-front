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
                <VButton title="Nouvelle région" icon="mdi-plus" class="btn-add" @click="handleAdd()"/>
            </template>
    
        </VMainHeader>
    
        <v-skeleton-loader
          v-if="loading"
          type="table-tbody"
          class="mt-4"
        />
    
        <VTable v-else-if="regions !== null && regions.length > 0">
    
    
            <template #thead>
    
                <tr>
                    <th class="text-left">Carte</th>
                    <th class="text-left">Région</th>
                    <th class="text-left">Province</th>
                    <th class="text-center">Action</th>
                </tr>
            </template>
            
            <template #tbody>
                    <tr v-for="region in regions" :key="region.name">
                        <td>
                            <img
                                :src="`/src/assets/images/region/${region.name}.png`"
                                width="50"
                                class="rounded-lg"
                            />
                        </td>
    
                        <td class="font-bold">
                            {{ region.name }}
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
    import VTable from '@/components/VTable.vue';
    import VTableAction from '@/components/VTableAction.vue';
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import regionService from "@/services/territories/regionService";
    import provinceService from "@/services/territories/provinceService";
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
    
    const actions = [
        {action: 'edit', title: 'Modifier', icon: 'mdi-pencil'},
        {action: 'delete', title: 'Supprimer', icon: 'mdi-trash-can-outline', style: '!border-t !text-red-500'},
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


    const fetchAllRegion = async () => {
        try {
            const response = await regionService.getAllRegion();
            regions.value = response.data.regions;
        } catch (error) {
            console.error(error.response.data);
        }
    }

    const fetchAllProvince  = async () => {
        try {
            const response = await provinceService.getAllProvince();
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