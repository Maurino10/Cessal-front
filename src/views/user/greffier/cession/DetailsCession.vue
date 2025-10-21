<template>

    <VBreadCrumb 
        :items="[
            {title: 'cessions', disabled: true},
            {title: `${route.params.id}`, disabled: false},
        ]" 
    />

    <div class="main-body">
        <VMainHeader 
            v-if="cession"
            :icon="{ icon: 'mdi-chart-donut', bgColor: '!bg-teal-400'}"
            :title="cession.numero_dossier" 
            subtitle="Numéro du dossier" 
        >
            <template #status>
                <v-chip :color="cession.status_color">
                    {{ cession.status_label }}
                </v-chip>
            </template>

            <!-- <template #actions>
                 <VButton
                    v-if="cession.status_cession != 4"
                    title="Signée"
                    class="btn-submit"
                    @click="cessionSigned"
                />
            </template> -->
        </VMainHeader>
    
        <div class="mt-6">
            <nav class="flex gap-8 border-b">
                <router-link     
                    v-for="(nav, index) in navigations" :key="index"
                    class="px-2 text-gray-400 transition-all duration-200 ease-in cursor-pointer"
                    activeClass="!text-emerald-500 !border-b-2 !border-emerald-400"
                    :to="nav.path"
                >
                    {{ nav.title}}
                </router-link>
            </nav>
        </div>
    
        <div v-if="cession" class="mt-8">
            <router-view></router-view>
        </div>
    </div>


</template>

<script setup>
// Imports
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import VMainHeader from '@/components/VMainHeader.vue';
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import VButton from '@/components/VButton.vue';
    import greffierService from '@/services/cessions/greffierService';

// Variables & state    
    const route = useRoute();

    const cession = ref(null);

    const navigations = [
        { value: 0, title: 'Informations', path:`infos`},
        { value: 1, title: 'Prêteurs', path:`preteurs`},
        { value: 2, title: 'Emprunteurs', path:`emprunteurs`},
        { value: 3, title: 'Justificatives', path:`justificatifs`},
        { value: 4, title: 'Magistrat', path:`magistrat`},
        { value: 5, title: 'Impressions', path:`impressions`},
    ]

// Functions


    const cessionSigned = async () => {
        try {
            const response = await greffierService.signCession(route.params.id);

            await fetchCession();
        } catch (error) {
            console.log(error)
        }
    }
    
    const fetchCession = async () => {
        try {
            const response = await greffierService.getCession(route.params.id);
            cession.value = response.data.cession;
            
        } catch (error) {
            console.log(error)
        }
    }
// Lifecycle hooks
    onMounted(async () => {
        await fetchCession();
    })
</script>