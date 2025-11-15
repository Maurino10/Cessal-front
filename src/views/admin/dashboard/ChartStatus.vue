<template>
    <div class="flex items-center justify-between gap-5">
        <div class="flex items-center gap-3">
            <span>
                <v-icon 
                    :icon="props.icon" 
                    class="p-8 rounded-xl bg-gray-50"
                    :color="colorValue"
                    size="42"
                    start
                ></v-icon>
            </span>
            <div class="font-bold">
                <p class="text-xs">{{ props.label }}</p>
                <h4 class="text-3xl text-gray-800">{{ props.value }}</h4>
            </div>
        </div>
        <div class="chart-container">
          <canvas ref="canvas"></canvas>
          <div class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              <p class="text-xs font-bold text-gray-500">{{ pourcentage }}%</p>
          </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue'
    import Chart from 'chart.js/auto';

    const props = defineProps({
        total: { type: Number, required: true },
        value: { type: Number, required: true },
        colorValue: {type: String, required: true},
        label: {type: String, required: true},
        icon: {type: String, required: true}
    });

    const canvas = ref(null);
    const pourcentage = ref(0);
    let chartInstance = null;

    const buildChart = () => {
        // Calculer pourcentage
        pourcentage.value = ((props.value / props.total) * 100).toFixed(2);

        // Détruire l'ancien chart s'il existe
        if (chartInstance) chartInstance.destroy();

        // Construire le nouveau chart
        chartInstance = new Chart(canvas.value, {
            type: 'doughnut',
            data: {
                datasets:[{
                    data: [props.value, props.total - props.value],
                    backgroundColor: [props.colorValue, '#E0E0E0'],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '75%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => `${ctx.parsed} (${pourcentage.value}%)`
                        }
                    }
                }
            }
        });
    };

    onMounted(buildChart);

// 👇 Se met à jour automatiquement quand les props changent
    watch(props, buildChart, { deep: true });
</script>


<style scoped>
.chart-container {
  position: relative;
  width: 80px;
  height: 80px;
}
</style>
