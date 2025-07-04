<template>
  <v-container fluid>
    <v-card class="mb-6 pa-4" flat border>
      <v-row dense>
        <v-col cols="12" md="3">
          <v-select
            v-model="filters.type"
            :items="type_list"
            label="Select Type"
            clearable
            density="compact"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="3" v-if="filters.type">
          <v-select
            v-model="filters.category"
            :items="categories_list"
            label="Select Category"
            clearable
            density="compact"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-autocomplete
            v-model="filters.tags"
            multiple
            :items="tags_list"
            chips
            label="Enter Tags"
            clearable
            density="compact"
            variant="outlined"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12">
          <v-btn color="primary" rounded="xl" @click="downloadAllAsZip()"
            >Download All as ZIP</v-btn
          >
        </v-col>
      </v-row>
    </v-card>

    <v-card flat border>
      <v-data-table
        :headers="headers"
        :items="files_list"
        :items-per-page="-1"
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:[`item.tags`]="{ item }">
          <v-chip
            v-for="tag in item.tags"
            :key="tag"
            class="ma-1"
            size="small"
            color="primary"
            text-color="white"
          >
            {{ tag.tag_name }}
          </v-chip>
        </template>

        <template v-slot:[`item.preview`]="{ item }">
          <div
            @click="previewFile(item)"
            class="d-inline-flex align-center cursor-pointer my-3"
          >
            <v-img
              v-if="getFileType(item.file_url) === 'image'"
              :src="item.file_url"
              width="100"
              height="100"
              class="rounded mr-2"
              cover
            />
            <v-icon
              v-else-if="getFileType(item.file_url) === 'pdf'"
              color="red"
              size="32"
              class="mr-2"
            >
              mdi-file-pdf-box
            </v-icon>
            <v-icon v-else color="grey" size="28"> mdi-file-question </v-icon>
          </div>
        </template>

        <template v-slot:[`item.download`]="{ item }">
          <v-btn
            size="small"
            color="success"
            rounded="xl"
            @click="downloadFile(item)"
          >
            Download
          </v-btn>
        </template>
      </v-data-table>
      <!-- <v-pagination
      class="mt-2"
      color="primary"
          v-model="filters.current_page"
          :length="length"
          :total-visible="7"
        ></v-pagination> -->
    </v-card>
    <v-btn
      icon
      color="primary"
      class="upload-file-btn"
      @click="uploadDialogRef.openDialog()"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <FileUploadDialog ref="uploadDialogRef" />
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useFilePreviewStore } from "@/stores/filePreview";
import { useSnackBarStore } from "@/stores/snackBar";
import FileUploadDialog from "@/components/FileUploadDialog.vue";
import apiCall from "@/utils/axios";
import { api } from "@/constants/api";

const uploadDialogRef = ref();

const snackbar = useSnackBarStore();
const filePreviewStore = useFilePreviewStore();

const previewFile = (item) => {
  const type = getFileType(item.file_url);
  useFilePreviewStore().open({
    url: item.file_url,
    type,
  });
};


const length = ref(1);

const personal_categories_list = [
  "Alex Blaze",
  "Barry Alen",
  "Chen",
  "Dominic",
];
const department_categories_list = ["Accounts", "HR", "Tech", "Support"];
const type_list = ["Personal", "Departmant"];
const tags_list = ["RMC", "work_order"];

const filters = ref({
  type: null,
  category: null,
  tags: [],
  from_date: "",
  to_date: "",
  current_page: 1,
});
const categories_list = computed(() => {
  if (filters.value.type == "Personal") {
    return personal_categories_list;
  } else {
    return department_categories_list;
  }
});
watch(
  () => filters.value.type,
  (newVal, oldVal) => {
    fetchFilesList();
  }
);
const files_list = ref([]);
const headers = [
  { title: "ID", key: "document_id" },
  { title: "Date", key: "document_date" },
  { title: "Uploaded By", key: "uploaded_by" },
  { title: "Type", key: "major_head" },
  { title: "Category", key: "minor_head" },
  { title: "Tags", key: "tags" },
  { title: "Remark", key: "document_remarks" },
  { title: "Preview", key: "preview", sortable: false },
  { title: "Download", key: "download", sortable: false },
];

onMounted(() => {
  fetchFilesList();
});
const fetchFilesList = () => {
  const payload = {
    major_head: filters.value.type,
    minor_head: filters.value.category,
    from_date: filters.value.from_date,
    to_date: filters.value.to_date,
    tags: filters.value.tags.map((tag) => ({ tag_name: tag })),
    uploaded_by: "",
    start: 0,
    length: 10,
    filterId: "",
    search: { value: "" },
  };

  const successHandler = (res) => {
    if (res?.data?.status) {
      files_list.value = res.data.data;
      // length.value = res.data.recordsTotal
    } else {
      snackbar.showToast({
        message: res?.data?.data || "Failed to fetch documents.",
        color: "error",
      });
    }
  };

  const failureHandler = (err) => {
    snackbar.showToast({
      message: err?.data?.message || "API call failed.",
      color: "error",
    });
  };

  apiCall("post", api.documentManagement.searchDocumentEntry, {
    data: payload,
    isTokenRequired: true,
    onSuccess: successHandler,
    onFailure: failureHandler,
  });
};

const getFileType = (url) => {
  if (!url) return "unknown";
  const ext = url.split(".").pop().toLowerCase();
  if (ext === "pdf") return "pdf";
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
  return "unknown";
  // return "image";
};
const openUploadFileDialog = () => {
  snackbar.showToast({
    message: "Upload file dialog opened",
    color: "success",
  });
};

const downloadFile = (item) => {
  // window.open(item.file_url)
  snackbar.showToast({
    message: "File Downlaoded!",
    color: "success",
  });
};

const downloadAllAsZip = () => {
  snackbar.showToast({
    message: "All the file downloaded as a ZIP!",
    color: "success",
  });
};
</script>
<style scoped>
.upload-file-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}
</style>
