<template>
    <label class="ml-1 text-sm font-medium text-gray-500">{{ props.label }}</label>
    
    <v-textarea 
        v-model="model" 
        :placeholder="props.placeholder"
        density="compact" 
        variant="outlined" 
        base-color="grey"
        single-line
        :error-messages="modelError ? [modelError] : []"
        @update:model-value="modelError = null"
    ></v-textarea>
</template>

<script setup>
    import { ref } from 'vue';


    const model = defineModel('model');
    const modelError = defineModel('error'); 
    const props = defineProps(['label', 'placeholder']);

    const visible = ref(false);
</script>

<style scoped>
    
    :deep(.v-field__input) {
        display: block !important;
        line-height: 20px;
        font-size: 16px !important;
        
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
        border-block: 1px solid #10b981  !important;
        border-right: 1px solid #10b981  !important;
    }

    :deep(.v-field--focused .v-field__outline__start) {
        border-block: 1px solid #10b981  !important;
        border-left: 1px solid #10b981   !important;
    }
</style>