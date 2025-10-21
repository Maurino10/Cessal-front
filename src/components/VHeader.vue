
<template>
  <v-app-bar height="50" class="!bg-white/80 backdrop-blur-md !shadow-sm" flat>
      <v-container class="flex items-center justify-between">

        <h1 class="text-xl font-semibold">{{ props.title }}</h1>
        
        <nav v-if="props.navigations" class="flex gap-2 rounded-lg">
          <router-link
            v-for="(nav, index) in props.navigations"
            :key="`${nav.title}-${index}`"
            :to="nav.path"
            class="p-1 ml-8 text-sm text-gray-400 transition duration-200 hover:text-gray-700"
            active-class="font-bold !text-emerald-500 border-b-2 border-emerald-400"
          >
            {{ nav.title }}
          </router-link>
        </nav>

      </v-container>
  </v-app-bar>
</template>


<script setup>

    const props = defineProps(['title', 'navigations'])
</script>

