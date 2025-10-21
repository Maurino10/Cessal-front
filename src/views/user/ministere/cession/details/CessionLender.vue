<template>
    <div v-if="props.lenders" class="mt-2">
        <VTable class="custom-border">
            <template #caption>
                <div class="p-4 bg-blue-100">
                    <h3 class="text-lg font-bold text-blue-500">Prêteur(s)</h3>
                </div>
            </template>

            <template #thead>
                <tr>
                    <th># Prêteur</th>
                    <th>CIN</th>
                    <th>Adresse</th>
                </tr>
            </template>
            
            <template #tbody>
                <tr v-for="(p, index) in props.lenders" :key="index">
                    <template v-if="p.type === 'person'">
                        <td class="font-bold">
                            {{ p.party?.last_name }}
                            {{ p.party?.first_name }}
                        </td>
    
                        <td class="font-mono">
                            {{ p.party?.cin }}
                        </td>
    
                        <td>
                            {{ p.party?.address }}
                        </td>
                    </template>
                    <template v-else>
                        <td class="font-bold">
                            {{ p.entity?.name }}
                        </td>
    
                        <td>
                        </td>
    
                        <td>
                        </td>
                    </template>
                </tr>
            </template>
        </VTable>
    </div>


</template>

<script setup>
// Imports
    import VTable from '@/components/VTable.vue';

// Variables & state
    const props = defineProps(['lenders']);
    

// Functions


// Lifecycle hooks

        
</script>
