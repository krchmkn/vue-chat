import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useLoginStore } from '@/stores/login'

import App from '@/App.vue'
import router from '@/router'

import '@/assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

router.beforeEach(async (to) => {
  const store = useLoginStore(pinia)

  if (to.meta.requiresAuth && !store.token) {
    return { name: 'login' }
  }

  if (store.token && to.name == 'login') {
    return { name: 'home' }
  }
})

app.config.errorHandler = (err) => {
  console.error('errorHandler', err)
}

app.mount('#app')
