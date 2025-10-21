<template>
    <VHeader title="Utilisateurs" :navigations="navigations" />
    <router-view></router-view>

</template>

<script setup>
    import VHeader from '@/components/VHeader.vue';

    const navigations = [
        {title: 'Utilisateurs', path: '/admin/utilisateurs/utilisateurs'},
        {title: 'Inscriptions', path: '/admin/utilisateurs/inscriptions'},
    ]
</script>