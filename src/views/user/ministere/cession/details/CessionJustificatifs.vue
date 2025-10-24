<template>
    <div class="p-5 rounded-lg custom-border">

        <div class="mb-8">
            <h3 class="text-xl font-bold text-gray-700">Pièces Justificatives</h3>
        </div>
        
        <div v-if="props.justificatifs !== null && props.justificatifs.length > 0" class="flex flex-wrap items-center gap-5">
            <div 
                v-for="(justif, index) in displayedJustificatifs" :key="index"
            >
                <div class="relative flex flex-col items-center h-full gap-3 p-5 overflow-hidden rounded-md group w-52 custom-border">
                    <v-icon
                        icon="mdi-file-pdf-box"
                        size="42"
                        color="red"
                    >
                    </v-icon>
        
                    <div class="w-full">
                        <h4 class="text-center truncate">{{ justif.name }}</h4>
                    </div>
    
                    <div 
                        class="absolute top-0 left-0 items-center justify-center hidden w-full h-full gap-1 cursor-pointer group-hover:flex bg-gray-200/80 backdrop-blur-sm"
                        @click="showAttachment(justif)"
                    >
                        <v-icon
                            icon="mdi-eye-outline"
                            size="24"
                            class="cursor-pointer text-emerald-500"
                        ></v-icon>
                        <p class="text-emerald-500">Voir</p>
                    </div>
                </div>
            </div>

        </div>
        
        <div
            v-else
            class="flex flex-col items-center justify-center px-6 py-6 mt-8"
        >
            <!-- Texte principal -->
            <p class="mb-1 font-semibold text-gray-400">
                Aucune pièce justificative n’a encore été ajoutée à cette cession
            </p>

        </div>
        
        <div v-if="showViewAllButton" class="mt-3 text-center">
            <button 
                @click="showAll = !showAll"
                class="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
                {{ showAll ? 'Voir moins' : `Voir tous (${props.justificatifs.length})` }}
            </button>
        </div>
    </div>
</template>

<script setup>
// Imports
    import { computed, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import ministereService from '@/services/cessions/ministereService.js'

// Variables & state

    const route = useRoute();

    const props = defineProps(['justificatifs']);
    
    const showAll = ref(false);
// Functions


    // Calculer les justificatifs à afficher
    const displayedJustificatifs = computed(() => {
        if (showAll.value) {
            return props.justificatifs
        } else {
            return props.justificatifs?.slice(0, 3)
        }
    });

    // Vérifier si on doit afficher le bouton "Voir tous"
    const showViewAllButton = computed(() => {
        return props.justificatifs?.length > 3
    });

    const showAttachment = async (justif) => {
        try {
            const response = await ministereService.showCessionJustificatif(justif.id_cession, justif.id);

            const blob = response.data;
            const blobUrl = URL.createObjectURL(blob);
            
            window.open(blobUrl, '_blank');
        
            setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

        } catch (error) {
            console.log(error);
        }
    }

// Lifecycle hooks

</script>

<style scoped>
    
</style>