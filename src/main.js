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

const app = createApp(App)
app.use(createPinia())
app.config.globalProperties.$messages = messages
app.config.globalProperties.$rules = rules

registerPlugins(app)

app.mount('#app')
