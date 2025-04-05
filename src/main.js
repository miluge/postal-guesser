// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')

// For development: Comment this out when using the real service
import postalCodeService from './services/__mocks__/postalCodeService';
app.config.globalProperties.$postalCodeService = postalCodeService;