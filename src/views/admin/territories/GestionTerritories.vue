<template>
    <VHeader title="Territoires"  :navigations="navigations" />

    <router-view></router-view>

</template>

<script setup>
    import VHeader from '@/components/VHeader.vue';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const navigations = [
        {title: 'Provinces', path: '/admin/territoires/provinces'},
        {title: 'Régions', path: '/admin/territoires/regions'},
        {title: 'Districts', path: '/admin/territoires/districts'},
    ]
     
    const pageActive = computed(() => {
        const find = navigations.find(n => n.path === route.path)
        return {title: find ? find.title : 'Provinces', disabled: false};
    })

</script>