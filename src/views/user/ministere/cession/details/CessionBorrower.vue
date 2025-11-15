<template>

    <div class="overflow-hidden custom-shadow rounded-lg">
        <div class="flex items-center gap-2 p-5">
            <span>
                <v-icon
                    icon="mdi-account-outline"
                    size="32"
                    color="#10b981"
                ></v-icon>
            </span>

            <h4 class="text-xl font-bold">
                Liste des emprunteurs
            </h4>
        </div>
    
        <div v-if="props.borrowers">
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
                    </tr>
                </template>
                
                <template #tbody>
                    <tr v-for="(d, index) in props.borrowers" :key="index">
                        <td class="font-bold !w-80">
                            {{ d.natural_person.last_name }} {{ d.natural_person.first_name }}
                        </td>
                        
                        <td>
                            <v-chip
                                variant="tonal"
                                :color="d.status_color"
                                size="default"
                                :border="d.status_color"
                            >
                                {{ d.status_label  }}
                            </v-chip>
                        </td> 

                        <td class="text-end">
                            {{ format.formatMontant(d.salary_amount) }}
                        </td>

                        <td v-if="d.quota" class="text-end">
                            <p>
                                {{ format.formatMontant(d.quota.granted_amount) }}
                            </p>
                            <span class="text-gray-500">
                                {{ d.quota.percentage }} %
                            </span>
                        </td>

                        <td v-else class="font-bold text-gray-400 text-end">
                            Non défini
                        </td>

                    </tr>
                </template>
            </VTable>
        </div>
    </div>
</template>

<script setup>
// Imports
    import VTable from '@/components/VTable.vue';
    import format from '@/utils/format'
    
// Variables & state

    const props = defineProps(['borrowers']);

// Functions
    
// Lifecycle hooks

</script>
