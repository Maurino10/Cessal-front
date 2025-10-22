<template>
    <div class="flex items-center justify-between">
        <h3 class="text-xl font-bold text-gray-700">Pièces Justificatives</h3>

        <VButton
            v-if="props.cession.signed === 0"
            title="Ajouter Pièces"
            icon="mdi-plus"
            class="btn-cancel"
            @click="handleAdd"
        />
    </div>

    <v-skeleton-loader
      v-if="loading"
      type="heading, heading"
      class="mt-4"
    />
    
    <div v-else-if="justificatifs !== null && justificatifs.length > 0" class="flex flex-col gap-2 mt-6">
        <div 
            v-for="(justif, index) in justificatifs" :key="index"
        >
            <div class="flex items-center gap-3 py-4 pl-4 pr-8 border rounded-lg">
                <v-icon
                    icon="mdi-file-pdf-box"
                    size="64"
                    color="red"
                >
                </v-icon>
    
                <div class="w-full">
                    <h4>{{ justif.name }}</h4>
                    <p class="text-gray-500 text-caption">{{ bytesToKB(justif.size) }}</p>
                </div>

                <div class="flex gap-3">
                    <v-icon
                        icon="mdi-eye-outline"
                        size="20"
                        class="!text-blue-600 cursor-pointer"
                        @click="showAttachment(justif)"
                    ></v-icon>
                    
                    <v-icon
                        v-if="props.cession.signed === 0"
                        icon="mdi-trash-can-outline"
                        size="20"
                        class="!text-red-500"
                        @click="removeAttachment(justif)"
                    ></v-icon>
                </div>
            </div>
        </div>
    </div>

    <div v-else
        class="flex flex-col items-center justify-center px-6 py-12 mt-8"
    >
        <!-- Icône -->
        <v-icon size="48" class="mb-4 text-gray-400">
            mdi-circle-off-outline
        </v-icon>

        <!-- Texte principal -->
        <p class="mb-1 text-lg font-semibold text-gray-700">
            Aucune pièce justificative n’a encore été ajoutée à cette cession
        </p>

        <!-- Texte secondaire -->
        <p class="mb-4 text-sm text-gray-500">
            Ajoutez les justificatifs requis afin d’assurer la conformité du dossier.
        </p>
    </div>
</template>

<script setup>
// Imports
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import VButton from '@/components/VButton.vue'
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";
    import greffierService from '@/services/cessions/greffierService';

// Variables & state

    const route = useRoute();

    const router = useRouter();

    const props = defineProps({
        id: [String, Number],
        cession: Object
    });
    
    const justificatifs = ref(null);

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const loading = ref(false);

// Functions
    const bytesToKB = (bytes) => {
        if (bytes === 0) {
            return 0; // Handle zero bytes case
        }
        return (bytes / 1024).toFixed(1) + " KB";
    } 

    const handleAdd = () => {
        router.push({ name: 'greffier-cession-justificatifs-add',  params: { id: route.params.id } });
    }

    const showAttachment = async (justif) => {
        try {
            const response = await greffierService.showCessionJustificatif(justif.id_cession, justif.id);

            const blob = response.data;
            const blobUrl = URL.createObjectURL(blob);
            
            window.open(blobUrl, '_blank');
        
            setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

        } catch (error) {
            console.log(error);
        }
    }

    const removeAttachment = async (justif) => {

        openLoader(true);

        try {
            const response = await greffierService.deleteCessionJustificatif(justif.id_cession, justif.id);
            
            setTimeout(() => {
                openSnackbar("Pièce justificative supprimée avec succés", "success");
                openLoader(false);
            }, 1000)
        } catch (error) {
            openLoader(false);
            console.log(error);
        }
    }

    const fetchCessionJustificatifs = async () => {
        try {
            const response = await greffierService.getAllCessionJustificatifByCession(route.params.id);
            justificatifs.value = response.data.justifs;
            
        } catch (error) {
            
        }
    }
// Lifecycle hooks
    onMounted(async () => {
        loading.value = true;

        await fetchCessionJustificatifs();
        
        setTimeout(() => {
            loading.value = false;
        }, 700);
    })
</script>