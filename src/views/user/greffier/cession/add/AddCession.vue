<template>
    <VBreadCrumb 
        :items="[
            {title: 'cessions', disabled: true},
            {title: 'Ajouter', disabled: false},
        ]" 
    />

    <div class="main-body">
        <VMainHeader 
            :icon="{ icon: 'mdi-chart-donut', bgColor: '!bg-teal-400'}"
            title="Nouvelle Cession" 
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit." 
        ></VMainHeader>
        
        
        
        <div class="p-8 rounded-lg custom-shadow">
            <router-view></router-view>
        </div>
    </div>

</template>

<script setup>
// Imports 
    import VBreadCrumb from '@/components/VBreadCrumb.vue';
    import VMainHeader from '@/components/VMainHeader.vue';
 
</script>
