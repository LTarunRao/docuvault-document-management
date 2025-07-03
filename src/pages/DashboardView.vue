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
          <v-btn color="primary" @click="downloadAllAsZip()"
            >Download All as ZIP</v-btn
          >
        </v-col>
      </v-row>
    </v-card>

    <v-card flat border>
      <v-data-table
        :headers="headers"
        :items="files_list"
        :items-per-page="5"
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
              v-if="getFileType(item.file) === 'image'"
              :src="item.file"
              width="100"
              height="100"
              class="rounded mr-2"
              cover
            />
            <v-icon
              v-else-if="getFileType(item.file) === 'pdf'"
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
          <v-btn size="small" color="success" @click="downloadFile(item)">
            Download
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-btn
  icon
  color="primary"
  class="upload-file-btn"
  @click="openUploadFileDialog"
>
  <v-icon>mdi-plus</v-icon>
</v-btn>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useFilePreviewStore } from "@/stores/filePreview";
import { useSnackBarStore } from "@/stores/snackBar";

const snackbar = useSnackBarStore();
const filePreviewStore = useFilePreviewStore();

const previewFile = (item) => {
  const type = getFileType(item.file);
  useFilePreviewStore().open({
    url: item.file,
    type,
  });
};

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
  fromDate: "",
  toDate: "",
});
const categories_list = computed(() => {
  if (filters.type == "Personal") {
    return personal_categories_list;
  } else {
    return department_categories_list;
  }
});

const files_list = ref([
  {
    major_head: "Company",
    minor_head: "Work Order",
    document_date: "12-02-2024",
    document_remarks: "Test Remarks",
    tags: [
      { tag_name: "RMC" },
      { tag_name: "2024" },
      { tag_name: "work_order" },
    ],
    user_id: "nitin",
    file: "../assets/images/login",
  },
  {
    major_head: "Personal",
    minor_head: "Alex Blaze",
    document_date: "12-02-2024",
    document_remarks: "Test Remarks",
    tags: [
      { tag_name: "RMC" },
      { tag_name: "2024" },
      { tag_name: "work_order" },
    ],
    user_id: "nitin",
    file: "https://picsum.photos/200/300",
  },
  {
    major_head: "Personal",
    minor_head: "Alex Blaze",
    document_date: "12-02-2024",
    document_remarks: "Test Remarks",
    tags: [
      { tag_name: "RMC" },
      { tag_name: "2024" },
      { tag_name: "work_order" },
    ],
    user_id: "nitin",
    file: "https://picsum.photos/200/300",
  },
  {
    major_head: "Personal",
    minor_head: "Alex Blaze",
    document_date: "12-02-2024",
    document_remarks: "Test Remarks",
    tags: [
      { tag_name: "RMC" },
      { tag_name: "2024" },
      { tag_name: "work_order" },
    ],
    user_id: "nitin",
    file: "https://picsum.photos/200/300",
  },
  {
    major_head: "Personal",
    minor_head: "Alex Blaze",
    document_date: "12-02-2024",
    document_remarks: "Test Remarks",
    tags: [
      { tag_name: "RMC" },
      { tag_name: "2024" },
      { tag_name: "work_order" },
    ],
    user_id: "nitin",
    file: "https://picsum.photos/200/300",
  },
  {
    major_head: "Personal",
    minor_head: "Alex Blaze",
    document_date: "12-02-2024",
    document_remarks: "Test Remarks",
    tags: [
      { tag_name: "RMC" },
      { tag_name: "2024" },
      { tag_name: "work_order" },
    ],
    user_id: "nitin",
    file: "https://picsum.photos/200/300",
  },
  {
    major_head: "Personal",
    minor_head: "Alex Blaze",
    document_date: "12-02-2024",
    document_remarks: "Test Remarks",
    tags: [
      { tag_name: "RMC" },
      { tag_name: "2024" },
      { tag_name: "work_order" },
    ],
    user_id: "nitin",
    file: "https://picsum.photos/200/300",
  },
  {
    major_head: "Personal",
    minor_head: "Alex Blaze",
    document_date: "12-02-2024",
    document_remarks: "Test Remarks",
    tags: [
      { tag_name: "RMC" },
      { tag_name: "2024" },
      { tag_name: "work_order" },
    ],
    user_id: "nitin",
    file: "https://picsum.photos/200/300",
  },
]);

const headers = [
  { title: "Date", key: "document_date" },
  { title: "Type", key: "major_head" },
  { title: "Category", key: "minor_head" },
  { title: "Tags", key: "tags" },
  { title: "Remark", key: "document_remarks" },
  { title: "Preview", key: "preview", sortable: false },
  { title: "Download", key: "download", sortable: false },
];

const getFileType = (url) => {
  //   if (!url) return 'unknown'
  //   const ext = url.split('.').pop().toLowerCase()
  //   if (ext === 'pdf') return 'pdf'
  //   if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image'
  //   return 'unknown'
  return "image";
};
const openUploadFileDialog = () => {
  snackbar.showToast({
    message: "Upload file dialog opened",
    color: "success",
  });
};


const downloadFile = (file) => {
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