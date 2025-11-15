<template>    
    <div class="flex items-center justify-end w-full gap-4 py-4">

        <div class="w-[200px]">
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

        <div class="w-[200px]">
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

        
        <div class="flex gap-2">
            <VButton 
                title="Filtrer"
                class="btn-primary !h-[40px]"
                icon="mdi-filter-variant"
                @click="filter()"
            />
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { VDateInput } from 'vuetify/labs/VDateInput'
    import VButton from '@/components/VButton.vue';
    import format from '@/utils/format';
    
    const emit = defineEmits(['filter']);

    const dateStart = ref(null);
    const dateEnd = ref(null);

    const errorMessage = ref('');
    
    const validateDates =  () => {
        if (!dateStart.value || !dateEnd.value) {
            errorMessage.value = '';
            return true;
        }

        const start = dateStart.value ? new Date(dateStart.value) : null;
        const end = dateEnd.value ? new Date(dateEnd.value) : null;

        if (start > end) {
            errorMessage.value = 'La date de fin ne peut pas être antérieure à la date de début';
            return false;
        }

        errorMessage.value = '';
        return true;
    }

    const filter = () => {
        if (validateDates()) {
            const start = dateStart.value ? format.convertDate(dateStart.value) : null;
            const end = dateEnd.value ? format.convertDate(dateEnd.value) : null;
            emit('filter', start, end);
        }
    }

    const reset = () => {
        dateStart.value = null;
        dateEnd.value = null;
    }

</script>