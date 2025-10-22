<template>
    
    <label class="ml-1 text-sm font-medium text-gray-500">{{ props.label }}</label>

    <v-otp-input 
        v-model="model"
        :length="props.length" 
        density="compact" 
        variant="outlined" 
        autocomplete="off"
        :error="modelError ? true : false"
        @update:model-value="modelError = null"
        :disabled="disabled"
    ></v-otp-input>
    
    <p class="text-xs text-[#B00020] pt-[6px] px-4 h-[21px]">{{ modelError?.[0]}}</p>
</template>

<script setup>
    import { ref } from 'vue';


    const model = defineModel('model');
    const modelError = defineModel('error'); 
    const props = defineProps(['label', 'length', 'disabled']);

    const visible = ref(false);
</script>

<style scoped>
    
    .v-otp-input {
        padding: 0px !important;
        justify-content: start !important;
    }
    
    
    :deep(.v-otp-input__content) {
        align-items: end !important;
        padding: 0px !important;
        height: 40px !important;
        max-width: 100% !important;
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