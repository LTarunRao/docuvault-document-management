import { defineStore } from 'pinia'

export const useFilePreviewStore = defineStore('filePreview', {
  state: () => ({
    isOpen: false,
    fileUrl: '',
    fileType: '',
  }),

  actions: {
    open({ url, type }) {
      this.fileUrl = url
      this.fileType = type
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
  },
})
