<template>

    <div class="p-4">
        <v-pagination
            v-model="model"
            :length="props.length"
            total-visible="7"
            @update:model-value="goToPage"
        ></v-pagination>
    </div>

</template>

<script setup>
    const model = defineModel();
    const props = defineProps(['length']);
    const emit = defineEmits(['paginate']);

    const goToPage = () => {
        emit('paginate');
    }
</script>