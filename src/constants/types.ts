export type AuthRequest = {
  login: string
  password: string
}

export type TopicsReq = {
  token: string
  login: string
}

export type ChatMessagesReq = {
  login: string
  topics: number
}

export type ChatMessageReq = {
  login: string
  topics: number
  message: string
}

export type ChatMessageResp = {
  id: number
  login: string
  message: string
}

export type ChatMessagesList = {
  topics: string
  result: [
    {
      id: number
      login: string
      message: string
    }
  ]
}

export type ObjectType = {
  [key: string]: string | number
}
