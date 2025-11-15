<template>
    <VCardDelete 
        :title="`Voulez-vous vraiment supprimer le ${props.data.name}?`"
    >
        <template #card_actions>
            <VButton 
                title="Annuler"  
                @click="closeDialog"  
            />
            <VButton 
                title="Supprimer" 
                class="btn-delete"   
                @click="removeTPI" 
            />
        </template>
    </VCardDelete>
</template>

<script setup>
// Imports
    import { onMounted, ref } from 'vue';
    import VButton from '@/components/VButton.vue';
    import VCardDelete from '@/components/VCardDelete.vue';
    import tpiService from '@/services/instances/tpiService';
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";

// Variables & state
    const model = defineModel();
    const props = defineProps(['data']);
    const emit = defineEmits(['reload']);

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const idTPI = ref(null);

    
// Functions
    const closeDialog = () => {
        model.value = !model.value
    }

    const removeTPI = async () => {
        openLoader(true);
        
        try {
            const response = await tpiService.deleteTPI(idTPI.value);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("TPI supprimé avec succès.", "success");
                openLoader(false);
            }, 1000)
        } catch (error) {
            openLoader(false);
        }
    }

// Lifecycle hooks
    onMounted(() => {
        idTPI.value = props.data.id
    })  
</script>