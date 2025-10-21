<template>


    <div v-if="props.borrowers" class="mt-2">
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
                    <th class="text-center">Action</th>
                </tr>
            </template>
            
            <template #tbody>
                <tr v-for="(d, index) in props.borrowers" :key="index">
                    <td class="font-bold !w-80">
                        {{ d.party.last_name }} {{ d.party.first_name }}
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

                    <td class="text-center">
                        <v-icon
                            icon="mdi-list-box-outline"
                            class="p-4 bg-gray-100 rounded-[14px]"
                            size="16"
                            @click="handleAdd(d)"
                        ></v-icon>
                    </td>
                </tr>
            </template>
        </VTable>
    </div>

    <v-overlay v-model="overlay" class="flex items-center justify-center">
        <AddBorrowerQuota
            v-model="overlay"
            :borrower="objet"
            @reload="emit('reload')"
        />
    </v-overlay>

</template>

<script setup>
// Imports
    import { ref } from 'vue';
    import VTable from '@/components/VTable.vue';
    import format from '@/utils/format'
    import AddBorrowerQuota from '../add/AddBorrowerQuota.vue';
    
// Variables & state

    const props = defineProps(['borrowers']);
    const emit = defineEmits(['reload'])


    const overlay = ref(false);
    const objet = ref(null);

// Functions

    const handleAdd = (obj) => {
        objet.value = obj;
        overlay.value = !overlay.value
    }
    
// Lifecycle hooks

</script>
