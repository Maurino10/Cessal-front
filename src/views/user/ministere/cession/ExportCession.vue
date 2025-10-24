<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <VButton
                v-bind="props"
                title="Rapport"
                icon="mdi-tray-arrow-down"
                class="btn-submit"
            />
        </template>
        
        <v-card>

            <div class="flex flex-col py-3">
                <a 
                    class="px-4 py-2 text-gray-500 transition-all duration-300 ease-in cursor-pointer hover:bg-gray-100"
                    @click="downloadCessionPdf()"
                >
                    <span class="flex items-center gap-2 px-4 text-sm">
                        <v-icon 
                            icon="mdi-file-pdf-box" 
                            size="24"
                        ></v-icon>
                        <p>Exporter en format PDF</p>
                    </span>
                </a>
                <a 
                    class="px-4 py-2 text-gray-500 transition-all duration-300 ease-in cursor-pointer hover:bg-gray-100"
                    @click="downloadCessionExcel()"    
                >
                    <span class="flex items-center gap-2 px-4 text-sm">
                        <v-icon 
                            icon="mdi-file-excel-box" 
                            size="24"
                        ></v-icon>
                        <p>Exporter en format XLSX</p>
                    </span>
                </a>
            </div>
        </v-card>
    </v-menu>
    
</template>

<script setup>

    import VButton from '@/components/VButton.vue';
    import ministereService from '@/services/cessions/ministereService';

    const props = defineProps(['tpi', 'statut', 'dateStart', 'dateEnd']);

    const downloadCessionExcel = async () => {
  
        try {

            const response = await ministereService.exportExcelCessions(
                props.tpi, 
                props.statut, 
                props.dateStart, 
                props.dateEnd
            );
            
            if (response.statusText !== "OK") {
                 throw new Error('Erreur lors du téléchargement du fichier');
            }

            const blob = response.data;
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `cessions.xlsx`; // Nom du fichier à télécharger
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('Erreur de téléchargement:', error);
        }
    };

    const downloadCessionPdf = async () => {
  
        try {
            const profil = JSON.parse(localStorage.getItem('profil'));

            const response = await ministereService.exportPdfCessions(
                props.tpi, 
                props.statut, 
                props.dateStart, 
                props.dateEnd
            );
            
            if (response.statusText !== "OK") {
                 throw new Error('Erreur lors du téléchargement du fichier');
            }

            const blob = response.data;
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `cessions.pdf`; // Nom du fichier à télécharger
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('Erreur de téléchargement:', error);
        }
    };

</script>