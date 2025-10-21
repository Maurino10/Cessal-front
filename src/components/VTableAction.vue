<template>
    <v-menu>
        <template v-slot:activator="{ props }">
                <v-icon
                    icon="mdi-dots-horizontal"
                    class="p-4 bg-gray-100 rounded-[14px]"
                    size="16"
                    v-bind="props"
                ></v-icon>
        </template>

        <v-card>
            <h4 class="px-4 pt-3 text-sm font-bold text-center">
                {{ props.title }}
            </h4>
            
            <div class="flex flex-col py-3">
                <a 
                    v-for="(action, index) in props.actions" :key="`${action.title}-${index}`"
                    class="item"
                    :class="action.style"
                    @click="emit('action', action.action, props.objet)"
                >
                    <span class="flex items-center gap-2 px-4 text-sm">
                        <v-icon 
                            :icon="action.icon" 
                            size="18"
                        ></v-icon>
                        <p>{{ action.title }}</p>
                    </span>
                </a>
            </div>
        </v-card>
    </v-menu>
</template>

<script setup>
    
    const props = defineProps(['actions', 'objet', 'title']);
    const emit = defineEmits(['action']);
    
</script>

<style scoped>
    .item {
        cursor: pointer;
        padding: 8px 16px;
        transition: all .300s ease-in;
        color: #6b7280;
    }

    .item:hover {
        background-color: #f3f4f6;
    }
</style>