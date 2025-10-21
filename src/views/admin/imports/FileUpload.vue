<template>
    <VCardForm 
        title="Importer un fichier" 
        subtitle="Importer un fichier pour ajouter les provinces, régions, districts, cour d'appel et TPI"
    >

        <template #card_text>
            <input @change="handleFileSelect" type="file" accept=".xlsx, .csv"  id="upload" hidden>
            <label for="upload" class="cursor-pointer">
                <p class="ml-2 text-base">Fichier</p>
                <div class="flex gap-4 p-4 border rounded-lg">
                    <span>
                        <v-icon class="text-gray-400" size="48">mdi-tray-arrow-up</v-icon>
                    </span>
                    <div>
                        <h4 class="text-lg">Uploader le fichier de données</h4>
                        <p class="text-sm text-gray-400">En format XLSX</p>
                    </div>
                </div>
            </label>
            <p v-if="messageType === 'error'" class="text-xs text-[#B00020] pt-[6px] px-4 h-[22px]">{{ message }}</p>

            <div v-if="selectedFile" class="flex justify-between px-4 py-2 mt-2 bg-gray-100 rounded-lg ">
                <h4 class="overflow-hidden text-sm text-nowrap w-96">{{ selectedFile.name }}</h4>
                <v-icon class="!text-red-500 cursor-pointer" size="20" @click="selectedFile = ''">mdi-close</v-icon>
            </div>
            

        </template>

        <template #card_actions>
            <VButton title="Annuler" class="btn-cancel" @click="closeDialog"  />
            <VButton title="Uploader" class="btn-submit" @click="uploadFile"  />
        </template>

    </VCardForm>
</template>

<script setup>
// Imports
    import VCardForm from '@/components/VCardForm.vue';
    import VButton from '@/components/VButton.vue';
    import tpiService from '@/services/instances/tpiService.js';
    import { ref } from 'vue';

// Variables
    const model = defineModel();

    const selectedFile = ref(null);
    const message = ref('');
    const messageType = ref('');

// Functions
    const closeDialog = () => {
        model.value = !model.value
    }

    const handleFileSelect = (event) => {
        const file = event.target.files[0]
        if (file) {
            // Validation de la taille (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                showMessage('Le fichier ne doit pas dépasser 10MB', 'error')
                return
            }
            
            selectedFile.value = file
            clearMessage()
        }
    }

    const showMessage = (text, type) => {
        message.value = text;
        messageType.value = type;
    }

    const clearMessage = () => {
        message.value = '';
        messageType.value = '';
    }

    const uploadFile = async () => {
        if (!selectedFile.value) return

        const formData = new FormData();
        formData.append('file', selectedFile.value)

        try {
            const response = await tpiService.importTPI(formData);

            console.log(response.data)
            showMessage('Fichier uploadé avec succès!', 'success');
        } catch (error) {
            console.error(error)
        }
    }

</script>
