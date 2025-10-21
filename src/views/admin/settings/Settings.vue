<template>
    <VHeader title="Paramètres"  />
    
    <router-view></router-view>
</template>

<script setup>
// Imports
    import VHeader from '@/components/VHeader.vue';
    import { useRouter } from 'vue-router';

// Variables & state

    const router = useRouter();

    const goToLink = (link) => {
        router.push({ path: link });
    }
</script>