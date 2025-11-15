<template>
  <div class="flex items-center justify-between p-8">
    <div>
        <h3 class="text-xl font-bold text-center">{{ data.name }}</h3>
        <div class="p-8 rounded-lg bg-gray-50">
            <span class="relative before:absolute before:w-2 before:h-2 before:bg-[#2196F3] before:-translate-x-[100%] before:-translate-y-[50%] before:top-[50%] before:rounded-full">
                <p class="pl-2 text-sm">Enregistrée : <strong>{{ data.save }}</strong></p>
            </span>
            <span class="relative before:absolute before:w-2 before:h-2 before:bg-[#FB8C00] before:-translate-x-[100%] before:-translate-y-[50%] before:top-[50%] before:rounded-full">
                <p class="pl-2 text-sm">En cours d'approbation : <strong>{{ data.waiting }}</strong></p>
            </span>
            <span class="relative before:absolute before:w-2 before:h-2 before:bg-[#4CAF50] before:-translate-x-[100%] before:-translate-y-[50%] before:top-[50%] before:rounded-full">
                <p class="pl-2 text-sm">Approuvée : <strong>{{ data.approved }}</strong></p>
            </span>
            <span class="relative before:absolute before:w-2 before:h-2 before:bg-[#F44336] before:-translate-x-[100%] before:-translate-y-[50%] before:top-[50%] before:rounded-full">
                <p class="pl-2 text-sm">Approuvée : <strong>{{ data.rejected }}</strong></p>
            </span>
            <span class="relative before:absolute before:w-2 before:h-2 before:bg-[#8E24AA] before:-translate-x-[100%] before:-translate-y-[50%] before:top-[50%] before:rounded-full">
                <p class="pl-2 text-sm">Signée : <strong>{{ data.signed }}</strong></p>
            </span>
        </div>
    </div>


    <div>
      <canvas ref="canvas"></canvas>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const canvas = ref(null);


onMounted(() => {

  new Chart(canvas.value, {
    type: "bar",
    data: {
        labels: ["Enregistrée", "En cours d'approbation", "Approuvée", "Rejetée", "Signée"],
        
        datasets: [
            {
                label: "Nombre",
                data: [
                    props.data.save,
                    props.data.waiting,
                    props.data.approved,
                    props.data.rejected,
                    props.data.signed,
                ],
                backgroundColor: ['#2196F3', '#FB8C00', '#4CAF50', '#F44336', '#8E24AA'],
                barThickness: 20,      // largeur fixe des barres
                maxBarThickness: 20,   // limite si responsive
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
    },
  });
});

</script>

<style scoped>
canvas {
    width: calc(100vw - 600px) !important;
    height: 150px !important;
}
</style>
