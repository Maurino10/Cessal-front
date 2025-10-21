<template>
    <v-expansion-panels>
        <v-expansion-panel class=" !transition-all !duration-200 !ease-in hover:-translate-y-1">
            <v-expansion-panel-title class="bg-gray-100">
                <p class="text-base">
                    {{ props.title }}
                </p>
            </v-expansion-panel-title>

            <v-expansion-panel-text>
                <slot name="panel_text"></slot>
            </v-expansion-panel-text>

        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script setup>

    const props = defineProps(['title'])
</script>
