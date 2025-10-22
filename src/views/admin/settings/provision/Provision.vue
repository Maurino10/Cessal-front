<template>
    <VBreadCrumb 
        :items="[
            {title: 'Paramètres', disabled: true},
            {title: 'Provision', disabled: false},
        ]" 
    />

    <div class="main-body">
        <VMainHeader 
            :icon="{ icon: 'mdi-tune', bgColor: '!bg-slate-500'}"
            title="Provision" 
            subtitle="La provision applicable aux déclarations de cession." 
        >
            <template #actions>
                <VButton 
                    title="Nouvelle provision" 
                    icon="mdi-plus" 
                    class="btn-add" 
                    @click="handleAdd"
                />
            </template>
        </VMainHeader>
    
        <v-skeleton-loader v-if="loading"
          type="card"
          class="mt-4"
        />
    
        

        <div v-else-if="provisions" class="flex flex-col gap-2">
            <div 
                v-for="(provision, index) in provisions" :key="index"
                class="flex items-center justify-between p-8 rounded-lg highlight"
            >
                <div class="flex items-center gap-4">
                    <v-icon 
                        icon="mdi-cash"
                        size="96"
                        class="text-emerald-700"
                    ></v-icon>
                    <h4 class="text-4xl text-white">{{ format.formatMontant(provision.provision_amount) }}</h4>
                </div>
                <div class="flex flex-col gap-2 text-lg text-gray-200">
                    <p>{{ format.formatDate(provision.date_provision) }}</p>
                </div>
                <div>
                    <VButton
                        title="Modifier"
                        @click="handleEdit(provision)"
                    />
                </div>
            </div>
        </div>
    
        <div v-else class="flex flex-col items-center gap-8 mt-16">
            <div class="flex flex-col items-center">
                <span>
                    <v-icon
                        icon="mdi-circle-off-outline"
                        size="64"
                        class="!text-gray-400"
                    ></v-icon>
                </span>
                
                <div class="text-gray-400">
                    <h3 class="text-2xl font-bold text-center">Provision non définie</h3>
                    <p class="text-base text-center">La provision applicable aux déclarations de cession n’est pas encore définie.</p>
                </div>
            </div>
    
            <div>
                <VButton
                    title="Définir la provision" 
                    class="btn-submit"
                    @click="handleAdd"
                />
            </div>
        </div>
    
        <v-overlay v-model="overlay" class="flex items-center justify-center">
            <AddProvision 
                v-model="overlay" 
                @reload="fetchProvision"
                v-if="action === 'add'" 
            />
    
            <EditProvision 
                v-model="overlay" 
                :data="objet"
                @reload="fetchProvision"
                v-if="action === 'edit'" 
            />
        </v-overlay>
    </div>
</template>

<script setup>
// Imports
    import { onMounted, ref } from 'vue';
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import VMainHeader from '@/components/VMainHeader.vue';
    import VButton from '@/components/VButton.vue';
    import provisionService from '@/services/settings/provisionService';
    import format from '@/utils/format'
    import AddProvision from './AddProvision.vue';
    import EditProvision from './EditProvision.vue';

// Variables & state
    const loading = ref(false);

    const overlay = ref(false);
    const action = ref(null);
    const objet = ref(null);

    const provisions = ref(null);

// Functions 

    const handleAdd = () => {
        action.value = 'add';
        overlay.value = true;
    }

    const handleEdit = (obj) => {
        action.value = 'edit';
        objet.value = obj;
        overlay.value = true;
    }
    
    const fetchProvision = async () => {
        try {
            const response = await provisionService.getProvision();
            provisions.value = response.data.provisions;
        } catch (error) {
            console.error(error.response.data);
        }
    }

// Lifecycle hooks
    onMounted(async () => {
        loading.value = true;

        await fetchProvision();

        setTimeout(() => {
            loading.value = false;
        }, 700); 
    })

</script>