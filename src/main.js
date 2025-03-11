// main.js
import 'vuetify/styles' // Importa os estilos principais do Vuetify
import '@mdi/font/css/materialdesignicons.css' // Ícones Material Design
import '@fortawesome/fontawesome-free/css/all.css' // Font Awesome
import { loadFonts } from './plugins/webfontloader'
import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'

// Carrega as fontes do WebFontLoader
loadFonts()

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.use(createPinia())
app.mount('#app')
