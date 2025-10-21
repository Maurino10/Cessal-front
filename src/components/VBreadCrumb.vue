<template>
    <v-app-bar height="42" class="!absolute !bg-transparent" flat>
        <v-container class="!py-0">
            <ul class="flex items-center">
                <li class="flex items-center text-gray-300">
                    <p class="mx-1">
                        <v-icon 
                            icon="mdi-home" 
                            size="20"
                        ></v-icon>
                    </p>
                </li>
                
                <li
                    v-for="(item, index) in items" :key="`${item.title}-${index}`"
                    class="flex items-center text-gray-400"
                >
                    <span class="!text-gray-300">
                        <v-icon 
                            icon="mdi-chevron-right" 
                            size="20"
                        ></v-icon>
                    </span>
                    
                    <p 
                        class="mx-1 text-sm"
                        :class="{ 'font-bold !text-emerald-500' : !item.disabled }"
                    >
                        {{ item.title }}
                    </p>
                    
                </li>
            </ul>
        </v-container>
    </v-app-bar>


</template>

<script setup>
    const props = defineProps(['items']);
</script>