import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const loading = ref(false)

  function setLoading(flag: boolean) {
    loading.value = flag
  }

  return { loading, setLoading }
})
