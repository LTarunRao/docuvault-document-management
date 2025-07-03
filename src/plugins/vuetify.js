import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const customLightTheme = {
  dark: false,
  colors: {
    primary: '#687FE5',
    secondary: '#EBD6FB',
    background: '#FCD8CD',
    background_lighter: '#FEEBF6', 
    success: "#27AE60",
    error: "#D7443E",
    warning: "#F18324",
  },
}

// Create Vuetify instance
export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: customLightTheme,
    },
  },
})
