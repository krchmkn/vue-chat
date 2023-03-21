import axios from 'axios'
import { useLoginStore } from '@/stores/login'
import { useLoadingStore } from '@/stores/loading'

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL
})

const toggleLoading = (toggle: boolean) => {
  const store = useLoadingStore()
  store.setLoading(toggle)
}

instance.interceptors.request.use((config) => {
  toggleLoading(true)

  const store = useLoginStore()
  config.headers['Authorization'] = `Bearer ${store.token}`
  return config
})

instance.interceptors.response.use(
  (response) => {
    toggleLoading(false)
    return response
  },
  (error) => {
    toggleLoading(false)

    const store = useLoginStore()
    const status = error.response.status
    if (status === 401 || status === 403) {
      store.logOut()
    }
    return Promise.reject(error)
  }
)

export default instance
