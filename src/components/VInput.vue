<template>
    <label class="ml-1 text-sm font-medium text-gray-500">{{ props.label }}</label>
    
    <template v-if="props.type !== 'password'">
        <v-text-field 
            v-model="model" 
            :label="props.placeholder"
            :type="props.type"
            density="compact" 
            variant="outlined" 
            single-line
            autocomplete="off"
            :error-messages="modelError ? [modelError] : []"
            @update:model-value="modelError = null"
            :readonly="props.readonly === true"
            :disabled="disabled"
        ></v-text-field>
    </template>
    <template v-else>
        <v-text-field 
            v-model="model" 
            :label="props.placeholder"
            :type="visible ? 'text' : 'password'"
            density="compact" 
            variant="outlined" 
            single-line
            autocomplete="off"
            :error-messages="modelError ? [modelError] : []"
            @update:model-value="modelError = null"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="visible = !visible"
            :disabled="disabled"
        ></v-text-field>
    </template>
</template>

<script setup>
    import { ref } from 'vue';


    const model = defineModel('model');
    const modelError = defineModel('error'); 
    const props = defineProps(['label', 'placeholder', 'type', 'readonly', 'disabled']);

    const visible = ref(false);
</script>

<style scoped>

    :deep(.v-label) {
        color: #9ca3af !important;
        font-size: 14px;
        line-height: 20px;
    }
    
    :deep(.v-field__input) {
        display: block !important;
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