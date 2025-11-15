<template>
    <v-card width="600" class="!p-6 !rounded-xl border !shadow-sm">
        <div 
            v-if="props.loading" 
            class="absolute top-0 right-0 z-50 flex items-center justify-center w-full h-full bg-white/80"
        >
            <v-progress-circular
               :size="50"
               color="primary"
               indeterminate
           ></v-progress-circular>
        </div>

        <v-card-title>
            <h3 class="flex items-center justify-center gap-4 text-lg font-thin text-wrap">
                <span>⚠️</span>
                {{ props.title }}
            </h3>
        </v-card-title>
        
        <v-card-actions class="!p-4">
            <div class="flex justify-end w-full gap-4">
                <slot name="card_actions"></slot>
            </div>
        </v-card-actions>
    </v-card>
</template>

<script setup>

    const props = defineProps(['title', 'loading']);
</script>