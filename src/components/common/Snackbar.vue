<template>
  <v-snackbar
    v-model="snackBar.show"
    :color="snackBar.color"
    :timeout="snackBar.timeout"
    location="top right"
    variant="flat"
  >
    {{ snackBar.message }}
    <template #actions>
      <v-btn icon @click="snackBar.closeToast()" size="small">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { useSnackBarStore } from '@/stores/snackBar'
const snackBar = useSnackBarStore()
</script>
