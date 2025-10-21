<template>
    <VCardForm 
        title="Nouveau emprunteur"
        subtitle="Remplissez le formulaire pour ajouter un nouveau emprunteur"
        width="800"
        class="h-[90vh]"
    >
        <template #card_text>
            <v-row>
                <v-col class="!py-0">
                    <VInput label="Nom" placeholder="Entrer le nom du emprunteur" type="text"
                        v-model:model="form.last_name"
                    />
                </v-col>
                <v-col class="!py-0">
                    <VInput label="Prénom" placeholder="Entrer le prénom du emprunteur" type="text"
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
                    <VInput label="Adresse" placeholder="Entrer l'adresse du emprunteur" type="text"
                        v-model:model="form.address"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col class="!py-0">
                    <VInput label="Montant revenu" placeholder="Entrer la montant revenu du emprunteur" type="number"
                        v-model:model="form.salary_amount"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col class="!py-0">
                    <VTextArea label="Observation" placeholder="Entrer l'observation du emprunteur"
                        v-model:model="form.remark"
                    />
                </v-col>
            </v-row>
        </template>
        
        <template #card_actions>
            <VButton title="Annuler" class="btn-cancel" @click="closeDialog"  />
            <VButton title="Ajouter" class="btn-submit" @click="addBorrower" />
        </template>
    </VCardForm>
</template>

<script setup>
// Imports
    import VCardForm from '@/components/VCardForm.vue';
    import VInput from '@/components/VInput.vue';
    import VOptInput from '@/components/VOptInput.vue';
    import VButton from '@/components/VButton.vue';
    import VTextArea from '@/components/VTextArea.vue';
    import { reactive } from 'vue';

// Variables & state
    const model = defineModel();
    const emits = defineEmits(['add']);

    const form = reactive({
        last_name: null,
        first_name: null,
        cin: null,
        address: null,
        salary_amount: null,
        remark: null
    });

// Functions
    const closeDialog = () => {
        model.value = !model.value
    }

    const addBorrower = () => {
        emits('add', form); 
        closeDialog()
    }
</script>