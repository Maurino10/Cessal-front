<template>
    <VHeader title="Instances"  :navigations="navigations" />

    <router-view></router-view>

</template>

<script setup>
    import VHeader from '@/components/VHeader.vue';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();


    const navigations = [
        {title: 'TPI', path: '/admin/instances/tpi'},
        {title: 'Cour d\'appel', path: '/admin/instances/ca'},
    ]
     
    const pageActive = computed(() => {
        const find = navigations.find(n => n.path === route.path)
        return {title: find ? find.title : 'TPI', disabled: false};
    })
</script>