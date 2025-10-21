<template>
    <VCardDelete 
        :title="`Voulez-vous vraiment supprimer la ${props.data.name}?`"
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
                @click="removeCA" 
            />
        </template>
    </VCardDelete>
</template>

<script setup>
// Imports
    import { onMounted, ref } from 'vue';
    import VButton from '@/components/VButton.vue';
    import VCardDelete from '@/components/VCardDelete.vue';
    import caService from '@/services/instances/caService';
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";


//  Variables & state
    const model = defineModel();
    const props = defineProps(['data']);
    const emit = defineEmits(['reload']);

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

    const idCA = ref(null);


// Functions
    const closeDialog = () => {
        model.value = !model.value
    }

    const removeCA = async () => {
        openLoader(true);

        try {
            const response = await caService.deleteCA(idCA.value);
            
            setTimeout(() => {
                emit('reload');
                closeDialog();
                openSnackbar("Cour d\'appel supprimée avec succès.", "success");
                openLoader(false);
            }, 1000)
        } catch (error) {
            openLoader(false);
        }
    }
// Lifecycle hooks
    onMounted(() => {
        idCA.value = props.data.id
    })  
</script>