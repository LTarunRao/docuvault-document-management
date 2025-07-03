import { defineStore } from 'pinia'

export const useSnackBarStore = defineStore('snackBar', {
  state: () => ({
    show: false,
    message: '',
    color: 'info',
    timeout: 3000,
  }),
  actions: {
    showToast({ message, color = 'info', timeout = 3000 }) {
      this.message = message
      this.color = color
      this.timeout = timeout
      this.show = true
    },
    closeToast() {
      this.show = false
    },
  },
})
