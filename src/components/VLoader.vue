<template>
    <div v-if="loading" class="main">
        <div class="loader"></div>
    </div>
</template>

<script setup>
    import { useLoader } from '../composables/useLoader';

    const { loading } = useLoader();

    
</script>

<style scoped>
    .main {
        position: fixed;
        top: 0; bottom: 0; left: 0; right: 0; z-index: 100000;
        background: #ffffffcb;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .loader {
        width: 50px;
        padding: 8px;
        aspect-ratio: 1;
        border-radius: 50%;
        background: #25b09b;
        --_m: 
            conic-gradient(#0000 10%,#000),
            linear-gradient(#000 0 0) content-box;
        -webkit-mask: var(--_m);
                mask: var(--_m);
        -webkit-mask-composite: source-out;
                mask-composite: subtract;
        animation: l3 1s infinite linear;
        }

        @keyframes l3 {
            to{transform: rotate(1turn)}
        }
</style>