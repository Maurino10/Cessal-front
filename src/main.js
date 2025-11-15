import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { fr } from 'vuetify/locale'
import router from './router'

// const myCustomTheme = {
//   dark: false,
//   colors: {
//     background: '#f8fafc'
//   }
// }

const vuetify = createVuetify({
  components,
  directives, 
  // theme: {
  //   defaultTheme: 'myCustomTheme',
  //   themes: {
  //     myCustomTheme,
  //   }
  // },
  icons: {
    defaultSet: 'mdi',
  },
  locale: {
    locale: 'fr',
    fallback: 'fr',
    messages: { fr }
  }
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')

