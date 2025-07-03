<template>
  <v-dialog v-model="isOpen" max-width="800">
    <v-card>
      <v-card-title class="text-h6 d-flex align-center justify-space-between">
        File Preview
        <v-btn
          density="comfortable"
          variant="tonal"
          color="error"
          @click="close()"
          icon="mdi-close"
        ></v-btn>
      </v-card-title>

      <v-card-text>
        <div v-if="fileType === 'pdf'">
          <iframe :src="fileUrl" width="100%" height="500px" frameborder="0" />
        </div>

        <div v-else-if="fileType === 'image'">
          <v-img :src="fileUrl" max-height="400" contain />
        </div>

        <div v-else>
          <p class="text-error">Preview not available for this file type.</p>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useFilePreviewStore } from "@/stores/filePreview";

const store = useFilePreviewStore();
const { isOpen, fileUrl, fileType } = storeToRefs(store);
const { close } = store;
</script>
