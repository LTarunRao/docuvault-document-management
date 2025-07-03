<template>
  <div class="default-layout">
    <Navbar />
    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
</script>
