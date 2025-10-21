<template>
    <VCardDelete 
        :title="`Voulez-vous vraiment supprimer le district ${props.data.name}?`"
    >
        <template #card_actions>
            <VButton 
                title="Supprimer" 
                class="btn-delete" 
                @click="removeDistrict" 
            />
            <VButton 
                title="Annuler" 
                class="btn-cancel" 
                @click="closeDialog"  
            />
        </template>
    </VCardDelete>
</template>

<script setup>
// Imports
    import { onMounted, ref } from 'vue';
    import VButton from '@/components/VButton.vue';
    import VCardDelete from '@/components/VCardDelete.vue';
    import districtService from '@/services/territories/districtService';
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";


// Variables & state
    const model = defineModel();
    const props = defineProps(['data']);
    const emit = defineEmits(['reload']);
    
    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const idRegion = ref(null);

    
    const closeDialog = () => {
        model.value = !model.value
    }

// Functions
    const removeDistrict = async () => {
        openLoader(true);

        try {
            const response = await districtService.deleteDistrict(idRegion.value);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("District supprimé avec succès.", "success");
                openLoader(false);
            }, 1000)
        } catch (error) {
            openLoader(false);
        }
    }

// Lifecycle hooks
    onMounted(() => {
        idRegion.value = props.data.id
    })  
</script>