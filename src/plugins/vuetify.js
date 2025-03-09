// Styles
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/styles'

// Importação correta para Vuetify 3
import { createVuetify } from 'vuetify'

export default createVuetify({
  icons: {
    iconfont: 'fa' || 'md'
  }
})
