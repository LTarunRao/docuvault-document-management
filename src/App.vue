<template>
  <v-app>
    <v-main>
      <router-view />
      <SnackBar />
    </v-main>
  </v-app>
</template>

<script setup>
  import SnackBar from "../src/components/common/Snackbar.vue"
</script>
