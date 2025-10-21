<template>
    <div class="flex items-center pl-3 bg-gray-100 rounded-lg h-9">
        <v-icon 
            icon="mdi-magnify" 
            class="text-gray-400"
        ></v-icon>
        
        <input 
            v-model="model" 
            type="text" 
            placeholder="Recherche district" 
            class="flex-grow h-full ml-2 outline-none" 
        />
    </div>
</template>

<script setup>

    const model = defineModel();
</script>