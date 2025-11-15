<template>
    <VHeader title="Importations"  />
    
    <VBreadCrumb 
        :items="[
            {title: 'Importations', disabled: false},
        ]" 
    />

    <div>
        <VMainHeader    
            :icon="{ icon: 'mdi-database-import', bgColor: '!bg-green-400'}"
            title="Importations de données" 
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit." 
        ></VMainHeader>
        
        <div class="flex items-center justify-between p-8 bg-white border rounded-lg">
            <div>
                <div class="flex items-center gap-4">
                    <div class="text-gray-400">
                        <v-icon size="36" class="text-blue-500">mdi-bank</v-icon>
                    </div>
                    <div>
                        <p class="text-base font-bold leading-5">Territoires et Instances</p>
                        <span class="text-sm text-gray-500">Importer les provinces, régions, districts, cour d'appel et TPI</span>
                    </div>
                </div>
                <div class="flex flex-col gap-2 mt-4">
                    <h5 class="text-sm font-bold text-gray-700">Champs :</h5>
                    <div class="flex gap-1">
                        <span class="p-2 text-xs font-bold text-blue-600 bg-blue-100 rounded-lg">Structure parente</span>
                        <span class="p-2 text-xs font-bold text-blue-600 bg-blue-100 rounded-lg">Structure fille</span>
                        <span class="p-2 text-xs font-bold text-blue-600 bg-blue-100 rounded-lg">Province</span>
                        <span class="p-2 text-xs font-bold text-blue-600 bg-blue-100 rounded-lg">Région</span>
                        <span class="p-2 text-xs font-bold text-blue-600 bg-blue-100 rounded-lg">District</span>
                    </div>
                </div>
            </div>
            <div class="flex gap-4 mt-2">
                <VTableAction title="Territoires et Instances" :actions="actions" :objet="null" @action="handleAction"/>
            </div>  
        </div>
    </div>
    
    <v-overlay v-model="overlay" class="flex items-center justify-center">
        <FileUpload v-model="overlay" v-if="action === 'upload'" />
    </v-overlay>
</template>

<script setup>

// Imports
    import VHeader from '@/components/VHeader.vue';
    import VMainHeader from '@/components/VMainHeader.vue';
    import VTableAction from '@/components/VTableAction.vue';
    import FileUpload from './FileUpload.vue';
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import tpiService from '@/services/instances/tpiService.js';
    import { ref } from 'vue';

// Variables et state
    const overlay = ref(false); 
    const action = ref(null);
    const objet = ref(null);

    const actions = [
        {action: 'download', title: 'Télécharger le modèle', icon: 'mdi-tray-arrow-down'},
        {action: 'upload', title: 'Uploader un fichier', icon: 'mdi-tray-arrow-up'},
    ]

// Functions
    const handleAction = async (act, obj) => {
        if (act === 'download') {
            await downloadModelInstanceExcel();
        } else {
            action.value = act;
            objet.value = obj;
            overlay.value = !overlay.value
        }
    }   
    
    const downloadModelInstanceExcel = async () => {
        try {
            const response = await tpiService.exportModelInstance();

            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'modele_instance.xlsx';
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        }
    }
</script>