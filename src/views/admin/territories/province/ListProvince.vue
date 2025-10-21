<template>
    
    <VBreadCrumb 
        :items="[
            {title: 'Territoires', disabled: true},
            {title: 'Provinces', disabled: false},
        ]" 
    />

    <div class="main-body">
        <VMainHeader 
            :icon="{ icon: 'mdi-map', bgColor: '!bg-red-700'}"
            title="Liste des provinces" 
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit." 
        >
            <template #actions>
                <VButton title="Nouvelle province" icon="mdi-plus" class="btn-add" @click="handleAdd()"/>
            </template>
        </VMainHeader>
        
        <v-skeleton-loader
          v-if="loading"
          type="table-tbody"
          class="mt-4"
        />
    
        <VTable v-else-if="provinces !== null && provinces.length > 0">
            <template #thead>
                <tr>
                    <th class="text-left">Carte</th>
                    <th class="text-left">Province</th>
                    <th class="text-center">Action</th>
                </tr>
            </template>
            <template #tbody>
                    <tr v-for="province in provinces" :key="province.name">
                        <td>
                            <img
                                :src="`/src/assets/images/province/${province.name}.svg`"
                                width="50"
                                class="rounded-lg"
                            />
                        </td>
                        
                        <td class="font-bold">
                            {{ province.name }}
                        </td>
    
                        <td class="text-center">
                          <VTableAction 
                            :actions="actions" 
                            :title="province.name" 
                            :objet="province" 
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
                Aucune province trouvée
            </p>
    
            <!-- Texte secondaire -->
            <p class="mb-4 text-sm text-gray-500">
                Ajoutez une nouvelle province pour commencer.
            </p>
        </div>
    
        <v-overlay v-model="overlay" class="flex items-center justify-center">
            <AddProvince 
                v-model="overlay" 
                @reload="fetchAllProvince"
                v-if="action === 'add'" 
            />
            <EditProvince 
                v-model="overlay" 
                :data="objet" 
                @reload="fetchAllProvince"
                v-if="action === 'edit'" 
            />
            <DeleteProvince 
                v-model="overlay" 
                :data="objet" 
                @reload="fetchAllProvince"
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
    import VButton from '@/components/VButton.vue';
    import VTableAction from '@/components/VTableAction.vue';
    import provinceService from "@/services/territories/provinceService";
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import AddProvince from './AddProvince.vue';
    import EditProvince from './EditProvince.vue';
    import DeleteProvince from './DeleteProvince.vue';

    
// Variables & state
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

        await fetchAllProvince();

        setTimeout(() => {
            loading.value = false;
        }, 700); 
    })
</script>