<template>
  <div class="default-layout">
    <Navbar />
    <div class="default-wrapper">
      <router-view style="height: calc(100dvh-60px)" />
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
</script>
<style scoped>
.default-layout{
    /* min-height: 100dvh; */
}
.default-wrapper{
    /* background-color: aliceblue; */
    /* min-height: calc(100dvh-60px); */
}
</style>