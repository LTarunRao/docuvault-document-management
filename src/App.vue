<template>
  <v-app>
    <v-main>
      <router-view />
      <SnackBar />
      <FilePreviewDialog />
    </v-main>
  </v-app>
</template>

<script setup>
  import SnackBar from "../src/components/common/Snackbar.vue"
  import FilePreviewDialog from "../src/components/common/FilePreviewDialog.vue"
</script>
