<template>
    <v-btn class="px-4 !rounded-md" variant="flat">
        <span class="flex items-center justify-center gap-2 text-xs font-bold text-nowrap" :class="props.color">
             <!-- icône à gauche -->
            <v-icon 
                v-if="props.icon && props.iconPosition === 'left'" 
                :icon="props.icon" 
                size="20" 
            />

            <!-- texte -->
            <p v-if="props.title">{{ props.title }}</p>

            <!-- icône à droite -->
            <v-icon 
                v-if="props.icon && props.iconPosition === 'right'" 
                :icon="props.icon" 
                size="20" 
            />
        </span>
    </v-btn>
</template>

<script setup>

    const props = defineProps({
        title: String, 
        icon: String, 
        color: String,
        iconPosition: {
            type: String,
            default: 'left'
        }
    });
</script>