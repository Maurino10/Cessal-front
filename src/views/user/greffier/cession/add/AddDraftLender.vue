<template>
    <VCardForm 
        title="Nouveau prêteur"
        subtitle="Remplissez le formulaire pour ajouter un nouveau prêteur"
        width="800"
    >   
        <template #card_text>
            <v-row>
                <v-col class="!py-0">
                    <VInput label="Nom" placeholder="Entrer le nom du prêteur" type="text"
                        v-model:model="form.last_name"
                    />
                </v-col>
                <v-col class="!py-0">
                    <VInput label="Prénom" placeholder="Entrer le prénom du prêteur" type="text"
                        v-model:model="form.first_name"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col class="!py-0">
                    <VOptInput label="CIN" :length="12"
                        v-model:model="form.cin"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col class="!py-0">
                    <VInput label="Adresse" placeholder="Entrer l'adresse du prêteur" type="text"
                        v-model:model="form.address"
                    />
                </v-col>
            </v-row>
        </template>
        
        <template #card_actions>
            <VButton title="Annuler" class="btn-cancel" @click="closeDialog"  />
            <VButton title="Ajouter" class="btn-submit" @click="addLender" />
        </template>
    </VCardForm>
</template>

<script setup>
// Imports
    import VCardForm from '@/components/VCardForm.vue';
    import VInput from '@/components/VInput.vue';
    import VOptInput from '@/components/VOptInput.vue';
    import VButton from '@/components/VButton.vue';
    import { reactive } from 'vue';

// Variables & state
    const model = defineModel();

    const emits = defineEmits(['add']);

    const form = reactive({
        last_name: null,
        first_name: null,
        cin: null,
        address: null
    });

// Functions
    const closeDialog = () => {
        model.value = !model.value
    }

    const addLender = () => {
        emits('add', form); 
        closeDialog()
    }
</script>
