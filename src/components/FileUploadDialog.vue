<template>
  <v-dialog v-model="show_dialog" max-width="600px" persistent>
    <v-card class="pa-2">
      <v-card-title class="border-bottom text-h6 d-flex align-center justify-space-between">
        Upload File
        <v-btn
          icon
          density="comfortable"
          variant="tonal"
          color="error"
          @click="closeDialog"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-card-title>

      <v-card-text class="pb-0">
        <v-form ref="upload_file_form" @submit.prevent>
          <v-row>
            <v-col cols="12" class="pb-0" md="6">
              <div class="required_field">Date</div>
              <v-text-field
                v-model="form.date"
                type="date"
                placeholder="Select Date"
                required
                variant="outlined"
                density="compact"
                :rules="[$rules.required]"
              />
            </v-col>
            <v-col cols="12" class="pb-0" md="6">
              <div  class="required_field">Type</div>
              <v-select
                v-model="form.major_head"
                :items="major_head_options"
                placeholder="Select Type"
                required
                variant="outlined"
                density="compact"
                :rules="[$rules.required]"
              />
            </v-col>

            <v-col cols="12" class="py-0"
                v-if="form.major_head"
            >
              <div class="required_field">Category</div>
              <v-select
                v-model="form.minor_head"
                :items="getMinorHeadOptions"
                placeholder="Select Category"
                required
                variant="outlined"
                density="compact"
                :rules="[$rules.required]"
              />
            </v-col>
            <v-col cols="12" class="py-0">
              <div  class="required_field">Tags</div>
              <v-combobox
                v-model="form.tags"
                :items="available_tags"
                chips
                multiple
                clearable
                placeholder="Document Tags"
                variant="outlined"
                density="compact"
                :rules="[$rules.required]"
              />
            </v-col>
            <v-col cols="12" class="py-0">
              <div>Remarks</div>
              <v-textarea
                v-model="form.remarks"
                plceholder="Add Remarks"
                rows="2"
                variant="outlined"
                density="compact"
                
              />
            </v-col>
            <v-col cols="12" class="py-0">
              <div  class="required_field">File</div>
              <v-file-input
                v-model="form.file"
                accept=".png,.jpg,.jpeg,.pdf"
                placeholder="Choose File (PDF/Image only)"
                show-size
                required
                variant="outlined"
                density="compact"
                :rules="[$rules.required]"

                prepend-icon
                prepend-inner-icon="mdi-file"
                clearable 
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="py-2">
        <v-btn
          density="comfortable"
          variant="tonal"
          color="primary"
          @click="submit()"
          >Upload</v-btn
        >
        <v-btn @click="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useSnackBarStore } from "@/stores/snackBar";

const snackbar = useSnackBarStore();

const show_dialog = ref(false);
const upload_file_form = ref(null);

const openDialog = () => {
  show_dialog.value = true;
};
const closeDialog = () => {
  show_dialog.value = false;
  upload_file_form.value.reset();
};

defineExpose({ openDialog });

const major_head_options = ["Personal", "Professional"];
const personal_options = ["John", "Tom", "Emily"];
const professional_options = ["Accounts", "HR", "IT", "Finance"];

const available_tags = ref(["RMC", "work_order"]);

const getMinorHeadOptions = computed(() => {
  return form.major_head === "Personal"
    ? personal_options
    : professional_options;
});

const form = reactive({
  date: "",
  major_head: "",
  minor_head: "",
  tags: [],
  remarks: "",
  file: null,
});
watch(
  () => form.major_head,
  (newVal, oldVal) => {
    console.log(`major_head changed from ${oldVal} to ${newVal}`);
    form.minor_head = ''; // Reset minor when major changes
  }
);
const submit = async () => {
  const { valid } = await upload_file_form.value.validate();

  if (valid) {
    snackbar.showToast({
      message: "Uploaded!!",
      color: "Success",
    });
    show_dialog.value = false;
  } else {
    snackbar.showToast({
      message: "Please fill all the requried fields",
      color: "error",
    });
  }
};
</script>
