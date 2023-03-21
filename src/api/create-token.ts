import request from '@/api/request'
import type { AuthRequest } from '@/constants/types'

export default function createToken(data: AuthRequest) {
  const credentials = { encoded: btoa(JSON.stringify(data)) }
  return request.post('/auth', credentials).then(({ data }): string => data.token)
}
