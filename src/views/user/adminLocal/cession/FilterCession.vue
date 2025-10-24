<template>

    <v-menu v-model="menu" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <VButton
                v-bind="props"
                title="Filtre"
                icon="mdi-filter-variant"
                class="!border"
            />
        </template>
        
        <v-card min-width="300">
            <div class="flex flex-col w-full gap-4 p-4">
                <div class="flex-grow">
                    <label class="px-2 text-sm text-gray-400">Statut</label>
                    <div>
                        <v-select
                            v-model="statut"
                            :items="status"
                            item-title="name"
                            item-value="id"
                            density="compact"
                            variant="outlined"
                            base-color="#9ca3af"
                            color="#10b981"
                            hide-details
                        ></v-select>
                    </div>
                </div>
        
                <div class="flex-grow">
                    <label class="px-2 text-sm text-gray-400">Date début</label>
                    <div> 
                        <v-date-input
                            v-model="dateStart"
                            input-format="dd/mm/yyyy"
                            prepend-icon=""
                            density="compact"
                            variant="outlined"
                            base-color="#9ca3af"
                            color="#10b981"
                            hide-details
                            autocomplete="off"
                            clearable
                        >
                            <template v-slot:prepend-inner>
                                <v-icon
                                    icon="mdi-calendar"
                                    color="#9ca3af"
                                ></v-icon>
                            </template>
                        </v-date-input>
                    </div>
                </div>
        
                <div class="flex-grow">
                    <label class="px-2 text-sm text-gray-400">Date fin</label>
                    <div>
                        <v-date-input
                            v-model="dateEnd"
                            input-format="dd/mm/yyyy"
                            prepend-icon=""
                            density="compact"
                            variant="outlined"
                            base-color="#9ca3af"
                            color="#10b981"
                            :error-messages="errorMessage"
                            @update:model-value="validateDates"
                            clearable
                            autocomplete="off"
                        >
                            <template v-slot:prepend-inner>
                                <v-icon
                                    icon="mdi-calendar"
                                    color="#9ca3af"
                                ></v-icon>
                            </template>
                        </v-date-input>
                    </div>
                </div>
        
                
                <div class="flex justify-between w-full gap-2">
                    <VButton 
                        title="Reset"
                        class="btn-cancel"
                        icon="mdi-restore"
                        @click="reset()"
                    />
                        
                    <VButton 
                        title="Filtrer"
                        class="btn-submit"
                        icon="mdi-filter-variant"
                        @click="filter()"
                    />
                </div>
            </div>
        </v-card>
    </v-menu>
</template>

<script setup>
    import { ref } from 'vue';
    import { VDateInput } from 'vuetify/labs/VDateInput'
    import VButton from '@/components/VButton.vue';
    import format from '@/utils/format';
    
    const emit = defineEmits(['filter']);

    const statut = ref(0);
    const dateStart = ref(null);
    const dateEnd = ref(null);

    const errorMessage = ref('');

    const menu = ref(false);
    
    const status = [
        {id: 0, name: 'Toutes'},
        {id: 1, name: 'En cours de traitement'},
        {id: 2, name: 'Acceptée'},
        {id: 3, name: 'Refusée'},
        {id: 4, name: 'Clôturée'},
        {id: 5, name: 'En cours d\'exécution'},
    ];

    const validateDates =  () => {
        if (!dateStart.value || !dateEnd.value) {
            errorMessage.value = '';
            return true;
        }

        const start = dateStart.value ? new Date(dateStart.value) : null;
        const end = dateEnd.value ? new Date(dateEnd.value): null;
        
        if (start > end) {
            errorMessage.value = 'La date de fin ne peut pas être antérieure à la date de début';
            dateEnd.value = null;
            return false;
        }

        errorMessage.value = '';
        return true;
    }

    const filter = () => {
    
        if (validateDates()) {
            const start = dateStart.value ? format.convertDate(dateStart.value) : null;            
            const end = dateEnd.value ? format.convertDate(dateEnd.value) : null;

            emit('filter', statut.value, start, end);
            menu.value = false;
        }
    }

    const reset = () => {
        statut.value = 0;
        dateStart.value = null;
        dateEnd.value = null;
    }

</script>