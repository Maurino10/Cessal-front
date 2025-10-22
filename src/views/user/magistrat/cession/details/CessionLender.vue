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
                    <th>Adresse</th>
                    <th>CIN</th>
                </tr>
            </template>
            
            <template #tbody>
                <tr v-for="(p, index) in props.lenders" :key="index">
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
    
                    </template>
                    <template v-else>
                        <td class="font-bold">
                            {{ p.legal_person?.name }}
                        </td>
    
                        <td>
                            {{ p.legal_person?.address }}
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
