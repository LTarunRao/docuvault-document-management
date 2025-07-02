import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { messages } from './constants/messages'
import { rules } from './utils/rules'

const app = createApp(App)

app.config.globalProperties.$messages = messages
app.config.globalProperties.$rules = rules

app.use(createPinia())
app.use(router)

app.mount('#app')
