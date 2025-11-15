<template>
    <div class="mb-5">
        <v-row no-gutters>
            <v-col class="pr-3">
                <v-text-field 
                    v-model="search" 
                    label="Rechercher un TPI"
                    density="compact" 
                    variant="outlined" 
                    single-line
                    hide-details
                    autocomplete="off"
                ></v-text-field>
            </v-col>
            <v-col>
                <div class="flex gap-3">
                    <v-select 
                        v-model="selectedCa" 
                        :items="props.ca"
                        item-value="id"
                        item-title="name"
                        label="Choissisez un Cour d'appel pour trier"
                        density="compact" 
                        variant="outlined" 
                        single-line
                        hide-details
                        autocomplete="off"
                        clearable
                    ></v-select>
                    <button 
                        class="bg-gray-100 text-xs font-bold  h-[40px] px-4 rounded-md"
                        @click="filterTPI"
                    >
                       Rechercher
                    </button>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const props = defineProps(['ca']);
    const emit = defineEmits(['filter']);

    const search = ref('');
    const selectedCa = ref(null);

    const filterTPI= async () => {            
        emit('filter', search.value, selectedCa.value);
    }
</script>

<style scoped>

    :deep(.v-label) {
        color: #9ca3af !important;
        font-size: 14px;
        line-height: 20px;
    }

    :deep(.v-field__outline__end) {
        border-block: 1px solid #9ca3af !important;
        border-right: 1px solid #9ca3af !important;
    }

    :deep(.v-field__outline__start) {
        border-block: 1px solid #9ca3af !important;
        border-left: 1px solid #9ca3af !important;
    }
    
    :deep(.v-field--focused .v-field__outline__end) {
        border-block: 1px solid #10b981 !important;
        border-right: 1px solid #10b981 !important;
    }

    :deep(.v-field--focused .v-field__outline__start) {
        border-block: 1px solid #10b981 !important;
        border-left: 1px solid #10b981 !important;
    }
</style>