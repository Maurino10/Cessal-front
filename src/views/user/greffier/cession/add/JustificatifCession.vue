<template>
   <VBreadCrumb v-if="cession"
        :items="[
            {title: 'cessions', disabled: true},
            {title: `${cession.numero_dossier}`, disabled: false},
        ]" 
    />

    <VMainHeader v-if="cession"
        :icon="{ icon: 'mdi-chart-donut', bgColor: '!bg-teal-400'}"
        :title="cession.numero_dossier" 
        subtitle="Numéro du dossier" 
    >
        <template #status>
            <v-chip :color="cession.status_color">
                {{ cession.status_label }}
            </v-chip>
        </template>

    </VMainHeader>

    <v-row>
        <v-col>
            <div class="flex flex-col items-center justify-center">
                <h3 class="text-xl">Téléversement des pièces justificatives</h3>
                <p class="text-sm text-gray-500">Ajoutez les pièces justificatives requises</p>
            </div>

        </v-col>
    </v-row>

    <div class="mt-4">
        <input
            @change="handleFiles" 
            type="file" 
            id="upload"
            accept="application/pdf"
            multiple
            hidden
        />
        <label for="upload">
            <div class="flex flex-col justify-center items-center gap-3 p-4 bg-gray-50 !border-2 border-dashed rounded-md border-gray-200 hover:bg-emerald-50 hover:border-emerald-200">
                <span class="text-6xl">📄</span>
                <div>
                    <h5>Cliquez pour sélectionner des fichiers</h5>
                    <p class="text-center text-gray-500 text-caption">PDF (max. 2Mb)</p>
                </div>
            </div>
        </label>
    </div>

    <div class="flex flex-col gap-2 mt-4">
        <div v-for="(f, index) in files" :key="index">
            <div class="flex items-center justify-center gap-3 p-4 border rounded-lg">
                <v-icon
                    icon="mdi-file-pdf-box"
                    size="64"
                    color="red"
                >
                </v-icon>
    
                <div class="w-full">
                    <h4>{{ f.name }}</h4>
                    <p class="text-gray-500 text-caption">{{ bytesToKB(f.size) }}</p>
                </div>

                <div>
                    <v-icon
                        icon="mdi-close"
                        size="16"
                        class="!p-3 !bg-red-500 !text-white rounded-full"
                        @click="removeFile(index)"
                    ></v-icon>
                </div>
            </div>
        </div>
    </div>

    <div class="w-full mt-4">
        <button
            v-if="files.length !== 0"
            variant="flat"
            class="!bg-emerald-600 !text-white rounded-md p-4 w-full"
            @click="uploadFiles"
        >
            Uploader
        </button>
    </div>
</template>

<script setup>
// Imports
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import VMainHeader from '@/components/VMainHeader.vue';
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import greffierService from '@/services/cessions/greffierService';
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";

// Variables & state
    const route = useRoute();
    const router = useRouter();

    const cession = ref(null);

    const files = ref([]);

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

// Functions 

    const bytesToKB = (bytes) => {
        if (bytes === 0) {
            return 0; // Handle zero bytes case
        }
        return (bytes / 1024).toFixed(1) + " KB";
    } 
    
    const handleFiles = (event) => {
        const fs = Array.from(event.target.files); // conversion FileList -> Array
        const maxSize = 2 * 1024 * 1024;

        fs.forEach(f => {
            if (f.size > maxSize) {
                console.warn(`${f.name} dépasse la taille limite`);
            } else {
                files.value.push(f);
            }
        });
    };

    const removeFile = (index) => {
        files.value.splice(index, 1);
    }
    
    const uploadFiles = async () => {
        openLoader(true);
        try {
            const formData = new FormData();
            files.value.forEach(file => {
                formData.append("files[]", file);
            });
    
            const response = await greffierService.storeCessionJustificatifs(route.params.id, formData);

            setTimeout(() => {
                openSnackbar("Piéces justificatives sauvegardées avec succées.", "success");
                
                setTimeout(() => {
                    router.push({ name: 'greffier-cession-justificatifs',  params: { id: route.params.id } });
                }, 1000)
                openLoader(false);
                
            }, 3000);

            
        } catch (error) {
            
            openLoader(false);
            console.error(error);
            
        }
    };

    const fetchCession = async () => {
        try {
            const response = await greffierService.getCession(route.params.id);
            cession.value = response.data.cession;

        } catch (error) {
            console.log(error)
        }
    }
// Lifecycle hooks
    onMounted(async () => {
        await fetchCession();
    })
</script>