<template>
    <VCardDelete 
        :title="`Voulez-vous vraiment supprimer le emprunteur '${props.borrower.last_name} ${props.borrower.first_name}'?`"
    >
        <template #card_actions>
            <VButton title="Annuler" class="btn-cancel" @click="closeDialog"  />
            <VButton title="Supprimer" class="btn-delete" @click="removeBorrower" />
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
    const props = defineProps(['borrower'])
    const emit = defineEmits(['reload']);

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();
    
// Functions
    const closeDialog = () => {
        model.value = !model.value
    }

    const removeBorrower = async () => {
        openLoader(true);
        
        try {
            const response = await greffierService.deleteCessionBorrower(props.borrower.id_cession, props.borrower.id);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Emprunteur supprimé avec succès.", "success");
                openLoader(false);
            }, 1000)
            
        } catch (error) {
            openLoader(false);
        }
    }

</script>