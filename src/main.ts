import './assets/main.css'
import { createPinia } from 'pinia' // Import Pinia

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia()) // Use Pinia
app.use(router)

app.mount('#app')
