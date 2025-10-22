<template>
    <label class="ml-1 text-sm font-medium text-gray-500">{{ props.label }}</label>
    
    <v-date-input 
        v-model="model" 
        :label="props.placeholder"
        :type="props.type"
        input-format="dd/mm/yyyy"
        density="compact" 
        variant="outlined" 
        color="#10b981"
        prepend-icon=""
        single-
        autocomplete="off"
        :error-messages="modelError ? [modelError] : []"
        @update:model-value="modelError = null"
        clearable
        :disabled="disabled"
    >
        <template v-slot:prepend-inner>
            <v-icon
                icon="mdi-calendar"
                color="#9ca3af"
            ></v-icon>
        </template>
    </v-date-input>

</template>

<script setup>
    import { ref } from 'vue';
    import { VDateInput } from 'vuetify/labs/VDateInput'


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