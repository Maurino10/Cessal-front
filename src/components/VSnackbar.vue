<template>
  <v-snackbar v-model="show" 
    :color="color" 
    timeout="3000" 
    location="top center"
  >
    {{ message }}
  </v-snackbar>
</template>

<script setup>
    import { useSnackbar } from "@/composables/useSnackbar";

    const { show, message, color } = useSnackbar();
</script>
