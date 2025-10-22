<template>
    <label class="ml-2 text-sm font-medium text-gray-500">{{ props.label }}</label>
    
    <v-autocomplete 
        v-model="model" 
        :label="props.placeholder"
        :items="props.items" 
        :item-value="props.value" 
        :item-title="props.title"
        density="compact" 
        variant="outlined" 
        base-color="grey"  
        single-line
        hide-no-data
        clearable
        autocomplete="off"
        :error-messages="modelError ? [modelError] : []"
        @update:model-value="modelError = null"
        :disabled="disabled"
    ></v-autocomplete>
</template>

<script setup>
    import { ref } from 'vue';


    const model = defineModel('model');
    const modelError = defineModel('error'); 
    const props = defineProps(['label', 'placeholder', 'items', 'value', 'title', 'disabled']);

</script>

<style scoped>

    :deep(.v-label) {
        color: #9ca3af !important;
        font-size: 14px;
        line-height: 20px;
    }

    :deep(.v-field__outline__end) {
        border-block: 1px solid #9ca3af !important;
        border-right: 1px solid #9ca3af !important;
    }

    :deep(.v-field__outline__start) {
        border-block: 1px solid #9ca3af !important;
        border-left: 1px solid #9ca3af !important;
    }
    
    :deep(.v-field--focused .v-field__outline__end) {
        border-block: 1px solid #10b981 !important;
        border-right: 1px solid #10b981 !important;
    }

    :deep(.v-field--focused .v-field__outline__start) {
        border-block: 1px solid #10b981 !important;
        border-left: 1px solid #10b981 !important;
    }

    
</style>