<template>
    <VBreadCrumb 
        :items="[
            {title: 'Paramètres', disabled: false},
        ]" 
    />

    <div class="main-body">
        <VMainHeader 
            :icon="{ icon: 'mdi-tune', bgColor: '!bg-slate-500'}"
            title="Paramètres" 
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit." 
        ></VMainHeader>
    
        <div>
            <v-row>
                <v-col cols="12">     
                    <div class="flex items-center justify-between p-4 border rounded-lg">
                        <div class="flex items-center gap-2">
                            <span>
                                <v-icon
                                    icon="mdi-cash"
                                    size="42"
                                    color="#9ca3af"
                                ></v-icon>
                            </span>
                
                            <h4 class="text-lg">
                                Provision
                            </h4>
                        </div>
    
                        <v-icon
                            icon="mdi-chevron-right"
                            class="p-4 bg-gray-100 rounded-[14px]"
                            size="16"
                            @click="goToLink('/admin/parametres/provision')"
                        ></v-icon>
                    </div>
                </v-col>
    
            </v-row>
        </div>
    </div>
</template>

<script setup>
    // Imports
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import VMainHeader from '@/components/VMainHeader.vue';
    import { useRouter } from 'vue-router';

// Variables & state

    const router = useRouter();

    const goToLink = (link) => {
        router.push({ path: link });
    }
</script>