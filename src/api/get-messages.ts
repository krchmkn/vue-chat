import request from '@/api/request'
import { useLoginStore } from '@/stores/login'
import type { ChatMessagesReq, ChatMessageResp } from '@/constants/types'

export function getMessages(topics: number) {
  const store = useLoginStore()

  const params: ChatMessagesReq = {
    login: store.username,
    topics
  }

  return request.get('/messages', { params }).then((resp): ChatMessageResp[] =>
    resp.data.result.sort((a: ChatMessageResp, b: ChatMessageResp) => {
      if (a.id < b.id) {
        return -1
      }
      if (a.id > b.id) {
        return 1
      }
      return 0
    })
  )
}
