<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters class="login-page-wrapper">
      <v-col
        cols="12"
        md="6"
        class="bg-background_lighter d-flex align-center justify-center flex-column px-15 text-center"
      >
        <img
          src="@/assets/images/login-image.svg"
          alt="Login Image"
          class="login-image"
        />
      </v-col>

      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <!-- <v-card width="500" class="pa-6"> -->
        <!-- <v-stepper v-model="login_stepper_id" flat>
          <v-window v-model="login_stepper_id">
            <v-window-item :value="1"> -->
        <v-card elevation="0" class="" max-width="500">
          <v-card-title class="text-h4 font-weight-bold pb-0">
            Welcome to DocuVault!
          </v-card-title>
          <v-card-text>
            <p class="text-caption pb-4">
              A smart and secure Document Management System for organizing,
              storing, and accessing files easily.
            </p>
            <v-stepper v-model="login_stepper_id" flat>
              <v-window v-model="login_stepper_id">
                <v-window-item :value="1">
                  <v-form @submit.prevent ref="login_form" class="pt-3">
                    <v-text-field
                      v-model="mobile_no"
                      label="Mobile Number"
                      required
                      :rules="[$rules.required, $rules.mobile_no]"
                      density="compact"
                      type="number"
                      counter="10"
                      variant="outlined"
                      placeholder="Enter Mobile Number"
                      class="pb-3"
                    />
                    <v-btn
                      :loading="login_btn_loading"
                      :diasbled="login_btn_loading"
                      color="primary"
                      rounded="xl"
                      class="mt-0 px-8"
                      @click="handleLogin()"
                    >
                      Login
                    </v-btn>
                  </v-form>
                </v-window-item>
                <v-window-item :value="2">
                  <v-form @submit.prevent class="pb-3">
                    <div>
                      OTP has been sent to <b> {{ mobile_no }} </b>
                    </div>
                    <v-otp-input
                      v-model="otp"
                      required
                      :rules="[$rules.required]"
                      density="compact"
                      length="6"
                      variant="outlined"
                      class="pt-0 pb-3 justify-start"
                    ></v-otp-input>
                    <v-btn
                      rounded="xl"
                      :loading="otp_btn_loading"
                      :diasbled="otp_btn_loading"
                      color="primary"
                      class="mt-2 px-8"
                      @click="verifyOtp()"
                    >
                      Verify
                    </v-btn>
                  </v-form>
                </v-window-item>
              </v-window>
            </v-stepper>
          </v-card-text>
        </v-card></v-col
      >
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useSnackBarStore } from "@/stores/snackBar";

const snackbar = useSnackBarStore();

const login_stepper_id = ref(1);
const mobile_no = ref("");
const otp = ref("");
const login_btn_loading = ref(false);
const otp_btn_loading = ref(false);

const login_form = ref();

const handleLogin = async () => {
  const { valid } = await login_form.value.validate();

  if (valid) {
    login_btn_loading.value = true;
    login_stepper_id.value = 2;
    login_btn_loading.value = false;
  } else {
    snackbar.showToast({
      message: "Please enter valid mobile number",
      color: "error",
    });
  }
};
const verifyOtp = async () => {
  if (!otp.value || otp.value.length < 6) {
    snackbar.showToast({
      message: "Invalid OTP!",
      color: "error",
    });
    return;
  } else {
    snackbar.showToast({
      message: "OTP Verified!",
      color: "success",
    });
    otp_btn_loading.value = true;
    login_stepper_id.value = 1;
    otp_btn_loading.value = false;
  }
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
