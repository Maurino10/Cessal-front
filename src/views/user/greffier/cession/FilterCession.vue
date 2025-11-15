<template>
    <div class="mb-5">
        <v-row no-gutters>
            <v-col class="pr-3">
                <v-text-field 
                    v-model="search" 
                    label="Rechercher par numéro de dossier ou prêteur ou emprunteur"
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
                        v-model="statut" 
                        :items="status"
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
                        @click="filterCession"
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

    const emit = defineEmits(['filter']);

    const statut = ref(-1);
    const search = ref('');

    const status = [
        {id: -1, name: 'Toutes'},
        {id: 0, name: 'Enregistrée'},
        {id: 1, name: 'En cours d\'approbation'},
        {id: 2, name: 'Approuvée'},
        {id: 3, name: 'Rejetée'},
        {id: 4, name: 'Signée'},
    ];


    const filterCession= async () => {            
        emit('filter', search.value, statut.value);
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
        border-block: 2px solid #10b981 !important;
        border-right: 2px solid #10b981 !important;
    }

    :deep(.v-field--focused .v-field__outline__start) {
        border-block: 2px solid #10b981 !important;
        border-left: 2px solid #10b981 !important;
    }
</style>