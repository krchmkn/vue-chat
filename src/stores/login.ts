import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import createToken from '@/api/create-token'
import { useRouter } from 'vue-router'
import jwt_decode from 'jwt-decode'
import type { AuthRequest, ObjectType } from '@/constants/types'
import storage from '@/utils/storage'

export const useLoginStore = defineStore('login', () => {
  const isClient = !import.meta.env.SSR
  const decodeToken = <T>(jwtToken: string) => jwt_decode<T>(jwtToken)

  let savedToken = ''
  try {
    const jwtToken = storage.getItem('token')
    const { exp } = decodeToken<ObjectType>(jwtToken)

    const timeNow = Date.now() / 1000
    if (timeNow > exp) {
      storage.removeItem('token')
    } else {
      savedToken = jwtToken
    }
  } catch (err) {
    //
  }

  const token = ref(savedToken)
  const username = computed(() => {
    if (token.value) {
      const { username } = decodeToken<{ username: string }>(token.value)
      return username
    }
    return ''
  })

  async function logIn(data: AuthRequest) {
    return createToken(data).then((jwtToken: string) => {
      token.value = jwtToken
      isClient && storage.setItem('token', jwtToken)
    })
  }

  const router = useRouter()
  function logOut() {
    isClient && storage.removeItem('token')
    token.value = ''
    router.push({ name: 'login' })
  }

  return { token, logIn, logOut, username }
})
