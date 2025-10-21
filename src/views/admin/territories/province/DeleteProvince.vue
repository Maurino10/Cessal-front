<template>
    <VCardDelete 
        :title="`Voulez-vous vraiment supprimer la province ${props.data.name}?`"
    >
        <template #card_actions>
            <VButton 
                title="Annuler" 
                class="btn-cancel" 
                @click="closeDialog"  
            />
            <VButton 
                title="Supprimer" 
                class="btn-delete" 
                @click="removeProvince" 
            />
        </template>
    </VCardDelete>
</template>

<script setup>
// Imports
    import { onMounted, ref } from 'vue';
    import VButton from '@/components/VButton.vue';
    import VCardDelete from '@/components/VCardDelete.vue';
    import provinceService from '@/services/territories/provinceService';
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";

// Variables & state
    const model = defineModel();
    const props = defineProps(['data']);
    const emit = defineEmits(['reload']);


    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const idProvince = ref(null);

    
// Functions
    const closeDialog = () => {
        model.value = !model.value
    }

    const removeProvince = async () => {
        openLoader(true);
        
        try {
            const response = await provinceService.deleteProvince(idProvince.value);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Province supprimée avec succès.", "success");
                openLoader(false);
            }, 1000)
        } catch (error) {
            openLoader(false);
        }
    }

// Lifecycle hooks
    onMounted(() => {
        idProvince.value = props.data.id
    })  
</script>