<template>
    <div class="flex items-center justify-center p-8">
        <div 
            v-for="(s, index) in props.headers" :key="index"
            class="step"
            :class="{
                'completed': index < props.step,
                'active': index == props.step,
            }"
        >
            <div class="flex flex-col items-center gap-2">

                    <v-icon 
                        v-if="index < step" 
                        icon="mdi-check"
                        size="24"
                        class="icon"
                    ></v-icon>

                
  
                    <v-icon 
                        v-else 
                        :icon="s.icon" 
                        size="28"
                        class="icon"
                    ></v-icon>

                
                <p class="text-nowrap">
                    {{ s.title }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>

    const props = defineProps({
        headers: Object,
        step: Number
    })
    
</script>

<style scoped>
    .step {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #6b7280;
    }

    .step:not(:last-child)::after {
        content: '';
        width: 150px;
        height: 2px;
        background-color: #e5e7eb;
        margin: 0 24px;
    }   

    .step .icon {
        background-color: #e5e7eb;
        border-radius: 100%;
        padding: 16px;
    }

    .step.completed::after {
        background-color: #10b981;
    }

    .step.completed {
        color: #10b981;
    }

    .step.completed .icon {
        background-color: #10b981;
        color: #FFFFFF;
    }

    .step.active {
        color: #10b981;
    }

    .step.active .icon {
        background-color: #d1fae5;
    }

</style>