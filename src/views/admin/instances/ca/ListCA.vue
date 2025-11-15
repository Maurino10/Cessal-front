<template>
    
    <VBreadCrumb 
        :items="[
            {title: 'Instances', disabled: true},
            {title: 'CA', disabled: false},
        ]" 
    />
    
    <div class="main-body">
        <VMainHeader 
            :icon="{ icon: 'mdi-scale-balance', bgColor: '!bg-purple-500'}"
            title="Liste des CA" 
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit." 
        >
            <template #actions>
                <VButton 
                    title="Nouvelle CA" 
                    icon="mdi-plus" 
                    class="btn-primary" 
                    @click="handleAdd()"
                />
            </template>
        </VMainHeader>
        
        <FilterCA
            @filter="filterCA" 
        />
        <v-skeleton-loader v-if="loading"
          type="table-tbody"
          class="mt-4"
        />
        
        <div v-else-if="ca !== null && ca.data.length > 0">
            <VTable>
        
                <template #thead>
                    <tr>
                        <th class="text-left">CA</th>
                        <th class="text-left">Province</th>
                        <th class="text-center">Action</th>
                    </tr>
                </template>
                
                <template #tbody>
                        <tr v-for="c in ca.data" :key="c.name">
        
                            <td>
                                <VCellIconText
                                    icon="mdi-scale-balance" 
                                    :text="c.name"
                                    iconColor="text-purple-500"
                                    bgColor="bg-purple-100"
                                />                  
                            </td>
        
                            <td>
                                {{ c.province.name }}
                            </td>
                            
                            <td class="text-center">
                                <VTableAction 
                                    :actions="actions" 
                                    :title="c.name" 
                                    :objet="c" 
                                    @action="handleActions" 
                                /> 
                            </td>
                        </tr>
                </template>
            </VTable>

            <VPagination
                v-model="page"
                :length="ca.last_page"
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
                Aucune Cour d’Appel trouvée
            </p>
    
            <!-- Texte secondaire -->
            <p class="mb-4 text-sm text-gray-500">
                Ajoutez une nouvelle CA pour commencer.
            </p>
        </div>
    
        <v-overlay v-model="overlay" class="flex items-center justify-center">
            <AddCA 
                v-model="overlay" 
                :provinces="provinces" 
                @reload="fetchAllCA"
                v-if="action === 'add'" 
            />
            
            <EditCA 
                v-model="overlay" 
                :data="objet" 
                :provinces="provinces" 
                @reload="fetchAllCA"
                v-if="action === 'edit'" 
            />
    
            <DeleteCA 
                v-model="overlay" 
                :data="objet" 
                @reload="fetchAllCA"
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
    import caService from "@/services/instances/caService";
    import provinceService from "@/services/territories/provinceService";
    import AddCA from './AddCA.vue';
    import EditCA from './EditCA.vue';
    import DeleteCA from './DeleteCA.vue';
    import FilterCA from './FilterCA.vue';


// Variables & state
    const ca = ref(null);
    const provinces = ref(null);
    
    const overlay = ref(false);    
    const action = ref(null);
    const objet = ref(null);

    const loading = ref(false);

    const page = ref(1);
    const search = ref('');
    
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
        await fetchAllCA();
    }



    const filterCA = async (searchCA) => {
        search.value = searchCA;
        page.value = 1;
        await fetchAllCA();
    }

    const fetchAllCA= async () => {
        try {
            const response = await caService.getAllCA(search.value, page.value);
            ca.value = response.data.ca;
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
            fetchAllCA(),
            fetchAllProvince()
        ]);

        setTimeout(() => {
            loading.value = false;
        }, 700); 
    })
</script>