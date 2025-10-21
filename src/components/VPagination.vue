<template>

    <div class="w-full">
        <ul class="flex justify-center w-full gap-1">
            <li 
                v-for="(link, index) in props.links" :key="index"
                class="px-4 py-2 rounded-md cursor-pointer"
                :class="{
                    '!bg-emerald-100 !text-emerald-500' : link.active,
                    '!text-gray-400 pointer-events-none' : link.url === null
                }"
                @click="goToPage(link.url)"
            >
                {{ link.label }}
            </li>
        </ul>
    </div>

</template>

<script setup>
    import axios from '@/services/axiosInstance.js';
    

    const props = defineProps(['links']);
    const emit = defineEmits(['pagination'])

    const goToPage = async (url) => {
        const path = url.replace('http://localhost:8000/api', '');
        const response = await axios.get(path);
        console.log(response.data)
        
        emit('pagination', response.data);
    }
</script>