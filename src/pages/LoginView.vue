<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters class="login-page-wrapper">
      <v-col
        cols="12"
        md="6"
        class="bg-background_lighter d-flex align-center justify-center flex-column px-15 text-center"
      >
        <!-- <div class="login-content-wrapper"> -->
        <!-- <h1>DocuVault</h1> -->
        <img
          src="@/assets/images/login-image.svg"
          alt="Login Image"
          class="login-image"
        />
        <!-- <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil repellendus neque dolor dolore dolorem aspernatur quod asperiores deleniti quia sint.</p> -->
        <!-- </div> -->
      </v-col>

      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-card elevation="0" class="" max-width="500">
          <v-card-title class="text-h4 font-weight-bold pb-0">
            Welcome to DocuVault!
          </v-card-title>
          <v-card-text>
            <p class="text-caption pb-8">
              A smart and secure Document Management System for organizing,
              storing, and accessing files easily.
            </p>
            <v-form @submit.prevent="handleLogin()" ref="loginForm">
              <v-text-field
                v-model="mobile_no"
                label="Mobile Number"
                required
                :rules="[$rules.required, $rules.mobile_no]"
                density="compact"
                type="number"
                counter="10"
                variant="outlined"
                class="pb-3"
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="[$rules.required]"
                class="pb-3"
                variant="outlined"
                density="compact"
                required
              />
              <v-btn
                :loading="loading"
                block
                type="submit"
                color="primary"
                class="mt-4"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const mobile_no = ref("");
const password = ref("");
const loading = ref(false);

const handleLogin = async () => {
  alert("handleLogin called");
};
</script>
<style scoped>
.login-image {
  width: 90%;
}
.login-page-wrapper {
  min-height: 100vh;
  background-color: #fff;
}
</style>
