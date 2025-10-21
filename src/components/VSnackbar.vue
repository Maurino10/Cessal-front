<template>
  <v-snackbar v-model="show" :color="color" timeout="2000" location="bottom center">
    {{ message }}
  </v-snackbar>
</template>

<script setup>
    import { useSnackbar } from "@/composables/useSnackbar";

    const { show, message, color } = useSnackbar();
</script>
