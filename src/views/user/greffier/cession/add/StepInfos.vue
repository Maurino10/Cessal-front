<template>
    
    <div>
        <div class="mb-12">
            <h3 class="text-2xl"> 
                <span class="font-bold text-emerald-500">01. </span>
                Informations générales
            </h3>
        </div>
        
        <v-row>
            <v-col class="!py-0">
                <VInput label="Numéro du dossier" type="text" placeholder="Entrer le numéro du dossier"
                    v-model:model="form.numero_dossier"
                    v-model:error="errors.numero_dossier"
                />
            </v-col>
            <v-col class="!py-0">
                <VInputDate label="Date du contrat"
                    v-model:model="form.date_contrat"
                    v-model:error="errors.date_contrat"
                />
            </v-col>
            <v-col class="!py-0">
                <VInputDate label="Date de cession"
                    v-model:model="form.date_cession"
                    v-model:error="errors.date_cession"
                />
            </v-col>
        </v-row>
        
        <v-row>
            
            <v-col class="!py-0">
                <VInput label="Montant à remboursé" type="number" placeholder="Entrer la montant à remboursé"
                    v-model:model="form.reimbursed_amount"
                    v-model:error="errors.reimbursed_amount"
                />
            </v-col>
        </v-row>
        
        <v-row>
            <v-col class="!py-0">
                <VTextArea label="Objet de la demande" placeholder="Entrer l'objet de la demande"
                    v-model:model="form.request_subject"
                    v-model:error="errors.request_subject"
                />
            </v-col>
        </v-row>
        

        <div class="flex justify-end mt-4">
            <VButton
                title="Suivant"
                icon="mdi-arrow-right-thin"
                iconPosition="right"
                class="btn-primary"
                @click="saveCession"
            />
        </div>
    </div>
</template>

<script setup>
// Imports
    import { reactive } from 'vue';
    import VInput from '@/components/VInput.vue';
    import VInputDate from '@/components/VInputDate.vue';
    import VTextArea from '@/components/VTextArea.vue';
    import VButton from '@/components/VButton.vue';
    import formErrorUtils from "@/utils/formErrorUtils";
    import greffierService from '@/services/cessions/greffierService';
    import { useRouter } from 'vue-router';
    import format from '@/utils/format.js'

// Variables & state

    // const props = defineProps(['form', 'errors']);
    const router = useRouter();

    const form = reactive({
        numero_dossier: null,
        date_contrat: null,
        request_subject: null,
        reimbursed_amount: null,
        date_cession: new Date(),
        tpi: null,
        user: null,
    });
    
    const errors = reactive({
        numero_dossier: null,
        date_contrat: null,
        request_subject: null,
        reimbursed_amount: null,
        date_cession: null,
    });
    
// Functions
    const saveCession = async () => { 
        const profil = JSON.parse(localStorage.getItem('profil'));
        try {
            form.tpi = profil.user.tpi.id;
            form.user = profil.user.id;

            const data = { 
                ...form, 
                date_cession: format.convertDate(form.date_cession), 
                date_contrat: format.convertDate(form.date_contrat)
            }
            const response = await greffierService.createCession(data);
            const idCession = response.data.cession;
            
            router.push({ name: 'greffier-cession-add-lenders', params: { id: idCession } })
        } catch (error) {

            if (error.response.data.errors) {
                formErrorUtils.setErrors(error.response.data.errors, errors)
            }
        }
    }
// Lifecycle hooks
</script>