<template>

    <div class="flex flex-col gap-3">
        <label class="ml-1 text-sm font-medium">{{ props.label }}</label>

        <v-radio-group
            v-model="model"
            inline
            density="compact"
            :error-messages="modelError ? [modelError] : []"
            @update:model-value="modelError = null"
        >
            <v-radio v-for="d in props.data" :key="d"
                :label="d.label" :value="d.value" color="balck"></v-radio>
    
        </v-radio-group>
    </div>
    
</template>

<script setup>

    const model = defineModel('model');
    const modelError = defineModel('error');
    const props = defineProps(['data', 'label']);

</script>

<style scoped>
    :deep(.v-selection-control-group) {
        gap: 50px;   
    }
</style>