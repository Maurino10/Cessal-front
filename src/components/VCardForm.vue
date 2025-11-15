<template>
    <v-card class="!p-8 !flex flex-col gap-8 !rounded-lg border !shadow-sm overflow-y-auto">

        <div class="w-full">
            <v-row>
                <v-col cols="12" md="12">
                    <h3 class="text-xl font-thin text-gray-800 text-nowrap">{{ props.title }}</h3>
                    <p 
                        v-if="props.subtitle" 
                        class="text-gray-500 text-caption text-nowrap"
                    >
                        {{ props.subtitle }}
                    </p>
                </v-col>

                <v-col cols="12" md="12">
                    <slot name="header_actions"></slot>
                </v-col>
            </v-row>
        </div>
        
        <div class="w-full">
            <v-row>
                <v-col>
                    <slot name="card_text"></slot>
                </v-col>
            </v-row>
            
            <v-row>
                <v-col>
                    <div class="flex justify-end w-full gap-4">
                        <slot name="card_actions"></slot>            
                    </div>
                </v-col>
            </v-row>
        </div>

    </v-card>
</template>

<script setup>
    const props = defineProps(['title', 'subtitle', 'loading']);
    
</script>

<style scoped>
    .v-card {
        scrollbar-gutter: stable; /* évite que le contenu bouge quand la barre apparaît */
    }

    /* optionnel : style custom scrollbar (Webkit) */
    .v-card::-webkit-scrollbar {
        width: 6px;
    }
    .v-card::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 4px;
    }

</style>