<template>

   <VBreadCrumb v-if="cession"
        :items="[
            {title: 'cessions', disabled: true},
            {title: `${cession.numero_dossier}`, disabled: false},
        ]" 
    />

    <VMainHeader v-if="cession"
        :icon="{ icon: 'mdi-chart-donut', bgColor: '!bg-teal-400'}"
        :title="cession.numero_dossier" 
        subtitle="Numéro du dossier" 
    >
        <template #status>
            <v-chip :color="cession.status_color">
                {{ cession.status_label }}
            </v-chip>
        </template>
    </VMainHeader>
    
    <v-row>
        <v-col>
            <div class="flex flex-col items-center justify-center">
                <h3 class="text-xl">Assignation d’une cession</h3>
                <p class="text-sm text-gray-500">Sélectionnez le magistrat chargé du traitement de cette cession</p>
            </div>

        </v-col>
    </v-row>
    
    <div v-if="magistrats" class="p-8 mt-4 border rounded-lg">
            <div>
                <v-row>
                    <v-col>
                        <div class="flex items-center gap-2">
                            <span>
                                <v-icon
                                    icon="mdi-account-outline"
                                    size="32"
                                    color="#10b981"
                                ></v-icon>
                            </span>

                            <h4 class="text-xl font-bold">
                                Sélectionner un Magistrat
                            </h4>
                        </div>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col class="!py-0">
                        <div>
                            <VInput placeholder="Rechercher un Magistrat..." v-model:model="search" />
                        </div>
                    </v-col>
                </v-row>
            </div>
            
            <div class="mt-5">
                 <v-row 
                    v-for="(m, index) in filteredMagistrats" 
                    :key="index"
                >
                    <v-col>
                        <div class="flex items-center justify-between p-4 rounded-lg bg-gray-50">

                            <div class="flex items-center gap-3">
                                <v-avatar size="42" class="!bg-slate-200">
                                    <span class="text-sm font-bold text-slate-700">
                                        {{ getInitials(m.profil.last_name, m.profil.first_name) }}
                                    </span>
                                </v-avatar>

                                <div>
                                   <div class="font-bold text-nowrap">
                                        {{ m.profil.last_name }} {{ m.profil.first_name }}
                                    </div>
                                   <div class="font-medium text-gray-500 text-caption">
                                        {{ m.profil.email }}
                                    </div>
                               </div>

                               <div>
                                    <v-chip
                                        :color="m.post.post_color"
                                        variant="tonal"
                                        class="font-weight-medium text-caption"
                                    >
                                        {{ m.post.name }}
                                    </v-chip>
                                </div>
                            </div>

                            <div class="pl-4 border-l">
                                <VButton 
                                    title="Assigner" 
                                    class="!bg-emerald-500 !text-white"
                                    @click="saveAssignCession(m)" 
                                />
                            </div>
                            
                        </div>
                    </v-col>
                </v-row>
            </div>
    </div>
</template>

<script setup>
// Imports
    import { computed, onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import VMainHeader from '@/components/VMainHeader.vue';
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import VButton from '@/components/VButton.vue';
    import VInput from '@/components/VInput.vue';
    import greffierService from '@/services/cessions/greffierService';
    import { useSnackbar } from "@/composables/useSnackbar";
    import { useLoader } from "@/composables/useLoader";
    
// Variables & state    
    const route = useRoute();
    const router = useRouter();
    
    const cession = ref(null);
    const magistrats = ref(null);

    const search = ref('');

    const { openSnackbar } = useSnackbar();
    const { openLoader } = useLoader();

// Functionsprenom

    const getInitials = (nom, prenom) => {
        return (nom.charAt(0) + prenom.charAt(0)).toUpperCase()
    }

    const filteredMagistrats = computed(() => {
        if (!search.value) return magistrats.value;

        return magistrats.value.filter(m =>
            (m.profil.last_name + ' ' + m.profil.first_name)
            .toLowerCase()
            .includes(search.value.toLowerCase())
        );
    });

    const saveAssignCession = async (magistrat) => {

        openLoader(true);
        
        try {

            const data = {
                magistrat: magistrat.id,
            };

            if (cession.value.assignment !== null) {
                const idCessionMagistrat = cession.value.assignment.id;
                const response = await greffierService.editCessionMagistrat(cession.value.id, idCessionMagistrat, data);
            } else {
                const response = await greffierService.storeCessionMagistrat(cession.value.id, data);
            }


            setTimeout(() => {
                openSnackbar("La cession a été assignée avec succès au magistrat.", "success");

                setTimeout(() => {
                    router.push({ name: 'greffier-cession-magistrat',  params: { id: route.params.id } });
                }, 1000)
                
                openLoader(false)
            }, 3000);

        } catch (error) {
            openLoader(false)
            console.log(error)
        }
    } 

    const fetchCession = async () => {
        try {
            const response = await greffierService.getCessionWithHisMagistrat(route.params.id);
            cession.value = response.data.cession;
            
        } catch (error) {
            console.log(error)
        }
    }

    const fetchAllMagistratSelfTPI = async () => {
        try {
            const profil = JSON.parse(localStorage.getItem('profil'));

            const response = await greffierService.getAllMagistratByTPI(profil.user.tpi.id);
            magistrats.value = response.data.magistrats;


        } catch (error) {
            console.log(error)
        }
    }
    
// Lifecycle hooks
    onMounted(async () => {
        await fetchCession();
        await fetchAllMagistratSelfTPI();
    })
</script>