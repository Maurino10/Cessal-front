<template>
    <router-view />
    <VSnackbar />
    <VLoader />
</template>

<script setup>
    import VSnackbar from '@/components/VSnackbar.vue';
    import VLoader from '@/components/VLoader.vue';

</script>

