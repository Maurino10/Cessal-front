<template>
    <v-table class="!rounded-lg !bg-transparent !w-full">
        <caption>
            <slot name="caption"></slot>
        </caption>
        <thead class="text-sm text-gray-400">
            <slot name="thead"></slot>
        </thead>
        <tbody v-if="$slots.tbody" class="text-sm text-gray-800">
            <slot name="tbody"></slot>
        </tbody>
    </v-table>
</template>

<style scoped>

    /* :deep(.v-table__wrapper > table) {
        table-layout: fixed;
    } */

    :deep(.v-table__wrapper > table > tbody > tr > td) {
        padding: 14px 24px;
    }

    :deep(.v-table__wrapper > table > thead > tr > th) {
        padding: 14px 24px;
    }
</style>