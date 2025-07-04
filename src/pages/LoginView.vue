<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters class="login-page-wrapper">
      <v-col
        cols="12"
        md="6"
        class="bg-background_light d-flex align-center justify-center flex-column px-15 text-center"
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
                      @click="generateOtp()"
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
import { useRouter } from "vue-router";

const router = useRouter();
const snackbar = useSnackBarStore();

const login_stepper_id = ref(1);
const mobile_no = ref("8889666727");
const otp = ref("");
const login_btn_loading = ref(false);
const otp_btn_loading = ref(false);

const login_form = ref();
const { apiCall, api } = useApiCall();

const generateOtp = async () => {
  const { valid } = await login_form.value.validate();

  if (!valid) {
    snackbar.showToast({
      message: "Please enter valid mobile number",
      color: "error",
    });
    return;
  }

  login_btn_loading.value = true;

  const payload = {
    mobile_number: mobile_no.value,
  };

  const successHandler = (res) => {
    snackbar.showToast({
      message: "OTP sent successfully!",
      color: "success",
    });
    login_stepper_id.value = 2;
  };

  const failureHandler = () => {};

  const finallyHandler = () => {
    login_btn_loading.value = false;
  };

  apiCall("post", api.auth.generateOTP, {
    data: payload,
    onSuccess: successHandler,
    onFailure: failureHandler,
    onFinally: finallyHandler,
    isTokenRequired: false,
  });
};

import authToken from "@/utils/authToken";

const verifyOtp = async () => {
  if (!otp.value || otp.value.length < 6) {
    snackbar.showToast({
      message: "Invalid OTP!",
      color: "error",
    });
    return;
  }

  otp_btn_loading.value = true;

  const payload = {
    mobile_number: mobile_no.value,
    otp: otp.value,
  };

  const successHandler = (res) => {
    console.log("verify otp", res);
    const response = res.data;
    if (response.status && response.data) {
      const { token, user_id, user_name, roles } = response.data;

      authToken.setAccessToken(token, token);

      localStorage.setItem("user_id", user_id);
      localStorage.setItem("user_name", user_name);
      localStorage.setItem("user_role", roles[0]?.role_slug || "");
      localStorage.setItem("user_home", roles[0]?.home || "");

      router.push({ name: "Dashboard" });
    }
  };

  const failureHandler = () => {};

  const finallyHandler = () => {
    otp_btn_loading.value = false;
  };

  apiCall("post", api.auth.validateOTP, {
    data: payload,
    onSuccess: successHandler,
    onFailure: failureHandler,
    onFinally: finallyHandler,
    isTokenRequired: false,
  });
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
