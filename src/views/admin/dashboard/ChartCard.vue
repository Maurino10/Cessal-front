<template>
      <div v-if="hasData" style="width: 250px; height: 250px; margin: auto;">
        <canvas ref="canvas"></canvas>
      </div>
    <div v-else class="text-center text-grey">
      <v-sheet
        class="justify-center rounded-lg d-flex flex-column align-center pa-6"
        color="grey-lighten-4"
        width="100%"
        style="min-height: 160px;"
      >
        <v-icon color="grey-darken-1" size="40">mdi-database-off</v-icon>
        <span class="mt-2 text-grey-darken-2 text-body-2">
          Aucune donnée disponible
        </span>
      </v-sheet>
    </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import Chart from 'chart.js/auto';

  const props = defineProps({
    save: Number,
    load: Number,
    accepted: Number,
    refused: Number,
    signed: Number,
  })

  const canvas = ref(null);
  const hasData = computed(() => {
    return [props.save, props.load, props.accepted, props.refused, props.signed].some(v => v > 0);
  })

  onMounted(() => {
    if (!hasData.value) return; 
     
    new Chart(canvas.value, {
      type: 'pie',
      data: {
        labels: ['Enregistrée', 'En cours', 'Approuvée', 'Rejetée', 'Signée'],
        datasets: [
          {
            data: [props.save, props.load, props.accepted, props.refused, props.signed],
            backgroundColor: ['#475569', '#0284c7', '#0d9488', '#dc2626', '#9333ea'],
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            align: 'center',
            position: 'bottom',   // ✅ Légende en bas
            labels: {
              color: '#1e293b',
              boxWidth: 14,
              font: { size: 13 },
              usePointStyle: true,
              pointStyle: 'circle',
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#1e293b', // 🟦 Fond sombre
            borderColor: '#38bdf8', // 🟦 Bordure cyan
            borderWidth: 1,
            titleColor: '#f8fafc', // 🟩 Titre clair
            bodyColor: '#e2e8f0', // 🟩 Texte gris clair
            titleFont: {
              size: 14,
              weight: 'bold',
            },
            bodyFont: {
              size: 13,
            },
            padding: 10,
            displayColors: true,
            boxPadding: 5,
            usePointStyle: true, // Affiche les petits ronds de couleur
            callbacks: {
              // Exemple : personnaliser le texte du tooltip
              label: function (context) {
                const label = context.label || '';
                const value = context.parsed || 0;
                return `${label} : ${value}`;
              },
              title: function (context) {
                return 'Détail du statut';
              },
            },
          }
        },
      }
    })
  })
</script>
