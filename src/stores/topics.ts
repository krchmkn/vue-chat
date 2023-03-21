import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getTopics as requestTopics } from '@/api/get-topics'
import storage from '@/utils/storage'

export const useTopicsStore = defineStore('topics', () => {
  const isClient = !import.meta.env.SSR
  const topics = ref<{ [key: number]: string }>({})

  try {
    topics.value = JSON.parse(storage.getItem('topics'))
  } catch (err) {
    //
  }

  function getTopics() {
    return requestTopics().then((resp) => {
      topics.value = resp
      isClient && storage.setItem('topics', JSON.stringify(resp))
    })
  }

  return { topics, getTopics }
})
