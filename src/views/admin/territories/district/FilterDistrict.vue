<template>
    <div class="mb-5">
        <v-row no-gutters>
            <v-col class="pr-3">
                <v-text-field 
                    v-model="search" 
                    label="Rechercher un District"
                    density="compact" 
                    variant="outlined" 
                    single-line
                    hide-details
                    autocomplete="off"
                ></v-text-field>
            </v-col>
            <v-col>
                <div class="pr-3">
                    <v-select 
                        v-model="selectedRegion" 
                        :items="props.regions"
                        item-value="id"
                        item-title="name"
                        label="Choissisez une Région"
                        density="compact" 
                        variant="outlined" 
                        single-line
                        hide-details
                        autocomplete="off"
                        clearable
                    ></v-select>
                </div>
            </v-col>
            <v-col>
                <div class="flex gap-3">
                    <v-select 
                        v-model="selectedProvince" 
                        :items="props.provinces"
                        item-value="id"
                        item-title="name"
                        label="Choissisez une Province"
                        density="compact" 
                        variant="outlined" 
                        single-line
                        hide-details
                        autocomplete="off"
                        clearable
                    ></v-select>
                    <button 
                        class="bg-gray-100 text-xs font-bold  h-[40px] px-4 rounded-md"
                        @click="filterDistrict"
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

    const props = defineProps(['provinces', 'regions']);
    const emit = defineEmits(['filter']);

    const search = ref('');
    const selectedProvince = ref(null);
    const selectedRegion= ref(null);

    const filterDistrict= async () => {            
        emit('filter', search.value, selectedProvince.value, selectedRegion.value);
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