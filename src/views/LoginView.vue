<template>
  <div class="row g-0 vh-100 bg-success bg-opacity-10">
    <div class="col-md-6  d-flex align-items-center justify-content-center">
      <img
        src="../assets/images/login-image.svg"
        alt="Login banner"
        class="img-fluid w-100 object-fit-cover"
      />
    </div>
    <div class="col-md-6 d-flex align-items-center justify-content-center bg-light">
      <div class="p-4 card m-4" style="width: 100%; max-width: 400px;">
        <h3 class="mb-4 text-center">Login</h3>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label>Mobile Number</label>
            <input v-model="mobile_no" type="nuber" class="form-control" required />
          </div>
          <div class="mb-3">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
          <button class="btn btn-primary w-100" :disabled="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false);
const password = ref("");
const mobile_no = ref("");

const handleLogin = async () => {
  alert("handleLogin called")
}
</script>

<style scoped>
.object-fit-cover {
  /* object-fit: cover; */
}
</style>
