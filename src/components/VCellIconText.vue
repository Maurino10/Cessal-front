<template>
  <div class="flex items-center gap-3">
    <div
      class="p-2 rounded-lg shadow-sm"
      :class="props.bgColor"
    >
        <v-icon 
            :icon="props.icon" 
            class="!text-xl" 
            :class="props.iconColor" 
        ></v-icon>
    </div>

    <p class="text-sm font-bold">
      {{ props.text }}
    </p>
  </div>
</template>

<script setup>
    
    const props =defineProps({
        icon: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        iconColor: {
            type: String,
            default: 'text-blue-500',
        },
        bgColor: {
            type: String,
            default: 'bg-blue-100',
        },
    })
</script>
