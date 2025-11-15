<template>
    <VCardDelete 
        :title="`Voulez-vous vraiment supprimer le prêteur '${props.lender.last_name} ${props.lender.first_name}'?`"
    >
        <template #card_actions>
            <VButton title="Annuler" class="btn-secondary" @click="closeDialog"  />
            <VButton title="Supprimer" class="btn-delete" @click="removeLender" />
        </template>
    </VCardDelete>
</template>

<script setup>
// Imports
    import { ref } from 'vue';
    import VButton from '@/components/VButton.vue';
    import VCardDelete from '@/components/VCardDelete.vue';
    import greffierService from '@/services/cessions/greffierService';
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";


// Variables & state
    const model = defineModel();
    const props = defineProps(['lender'])
    const emit = defineEmits(['reload']);

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();
    
// Functions
    const closeDialog = () => {
        model.value = !model.value
    }

    const removeLender = async () => {
        openLoader(true);
        
        try {
            const response = await greffierService.deleteCessionLender(props.lender.id_cession, props.lender.id);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Prêteur supprimé avec succès.", "success");
                openLoader(false);
            }, 1000)
            
        } catch (error) {
            openLoader(false);
        }
    }

</script>