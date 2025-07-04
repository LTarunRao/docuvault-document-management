/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Styles
import 'unfonts.css'

import { messages } from './constants/messages'
import { rules } from './utils/rules'
import api_call from './utils/axios'
import {api} from './constants/api'

const app = createApp(App)
app.use(createPinia())
app.config.globalProperties.$messages = messages
app.config.globalProperties.$rules = rules
app.config.globalProperties.$api_call = api_call
app.config.globalProperties.$api = api

registerPlugins(app)

app.mount('#app')