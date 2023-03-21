import request from '@/api/request'
import { useLoginStore } from '@/stores/login'
import type { TopicsReq } from '@/constants/types'

export function getTopics() {
  const store = useLoginStore()

  const params: TopicsReq = {
    token: store.token,
    login: store.username
  }

  return request.get('/topics', { params }).then((resp) => resp.data.result.topics)
}
