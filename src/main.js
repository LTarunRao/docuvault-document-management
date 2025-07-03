import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { messages } from './constants/messages'
import { rules } from './utils/rules'
import vuetify from './plugins/vuetify'

const app = createApp(App)

app.config.globalProperties.$messages = messages
app.config.globalProperties.$rules = rules

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
