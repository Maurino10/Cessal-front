<template>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div
            v-for="item in stats"
            :key="item.name"
            class="flex items-center justify-between p-4 rounded-lg"
            :class="item.color"
        >
            <div class="flex items-center gap-3">
                <v-icon :icon="item.icon" size="20" class="opacity-80" />
                <p class="text-xs font-bold">{{ item.name }}</p>
            </div>
            <p class="text-xl font-bold">{{ item.total }}</p>
        </div>
    </div>
    
</template>

<script setup>
    const stats = [
        { icon: 'mdi-bank', name: 'TPI', total: 54, color: 'bg-blue-100 text-blue-600' },
        { icon: 'mdi-scale-balance', name: 'Cours d’appel', total: 10, color: 'bg-purple-100 text-purple-600' },
        { icon: 'mdi-map', name: 'Provinces', total: 6, color: 'bg-red-100 text-red-700' },
        { icon: 'mdi-map-marker-radius', name: 'Régions', total: 22, color: 'bg-orange-100 text-orange-600' },
        { icon: 'mdi-map-marker', name: 'Districts', total: 119, color: 'bg-pink-100 text-pink-600' },
    ]

</script>