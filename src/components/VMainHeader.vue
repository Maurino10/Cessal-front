<template>
    <v-row class="mb-4">
        <v-col>
            <div class="flex items-center gap-3">
                <div class="flex items-center justify-center p-2 rounded-lg icon-shadow" :class="icon.bgColor">
                    <v-icon 
                        :icon="props.icon.icon" 
                        class="!text-3xl" 
                        :class="props.icon.color || 'text-white'"
                    ></v-icon>
                </div>
                <div>
                    <h2 class="text-xl">{{ props.title }}</h2>
                    <p class="text-gray-500 text-caption whitespace-nowrap">{{ props.subtitle }}</p>
                </div>
                <div>
                    <slot name="status"></slot>
                </div>
            </div>
        </v-col>

        <v-col align-self="center">
            <div class="flex items-center justify-end gap-2">
                
                <slot name="actions"></slot>

            </div>
        </v-col>
    </v-row>
</template>

<script setup>
    
    const props = defineProps(['icon', 'title', 'subtitle'])

</script>