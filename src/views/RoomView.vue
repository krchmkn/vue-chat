<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount, watch, computed, nextTick } from 'vue'
import { useLoginStore } from '@/stores/login'
import { useRouter, useRoute } from 'vue-router'
import { getMessages } from '@/api/get-messages'
import type { ChatMessageReq, ChatMessageResp } from '@/constants/types'
import ModalDialog from '@/components/ModalDialog.vue'
import { useTopicsStore } from '@/stores/topics'

const messages = ref<ChatMessageResp[]>([])
const loginStore = useLoginStore()
const topicsStore = useTopicsStore()
const isModalOpened = ref(false)

const paramsId = computed(() => Number(route.params.id))
const topic = computed(() => topicsStore.topics[paramsId.value])

const router = useRouter()
let timeout: ReturnType<typeof setTimeout>
const setUpTimeout = () => {
  clearInterval(timeout)
  timeout = setTimeout(() => {
    router.push({ name: 'home' })
  }, 180000) // Three minute timeout
}

const containerRef = ref<HTMLElement>()
const headerRef = ref<HTMLElement>()
const messagesRef = ref<HTMLElement>()
const formRef = ref<HTMLElement>()

const messagesHeight = computed(() =>
  containerRef.value && headerRef.value && formRef.value
    ? `${
        containerRef.value.offsetHeight - headerRef.value.offsetHeight - formRef.value.offsetHeight
      }px`
    : ''
)

let socket: WebSocket
let audio: HTMLAudioElement

onBeforeMount(() => {
  audio = new Audio('/sound.mp3')

  getMessages(paramsId.value).then((resp) => {
    messages.value = resp

    if (!messages.value.length) {
      isModalOpened.value = true
    }
  })

  const query = new URLSearchParams({ token: loginStore.token })
  socket = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}?${query}`)
  socket.addEventListener('message', onSocketMessage)

  setUpTimeout()
})

onBeforeUnmount(() => {
  clearInterval(timeout)
  socket.removeEventListener('message', onSocketMessage)
  socket.close()
})

function onSocketMessage({ data }: MessageEvent) {
  try {
    const message = JSON.parse(data)
    messages.value.push(message)

    if (message.login !== loginStore.username) {
      audio.play()
    }

    nextTick(() => {
      if (messagesRef.value) {
        messagesRef.value.scrollTop = messagesRef.value.scrollHeight
      }
    })
  } catch (err) {
    console.warn(err)
  }
}

const route = useRoute()
const message = ref('')
function onSubmit() {
  const msg: ChatMessageReq = {
    login: loginStore.username,
    topics: paramsId.value,
    message: message.value
  }

  socket.send(JSON.stringify(msg))
  message.value = ''
}

watch(message, setUpTimeout)
</script>

<template>
  <div ref="containerRef" class="container">
    <div ref="headerRef">
      <div class="back">
        <RouterLink :to="{ name: 'home' }" class="button button--small">
          Back to topics
        </RouterLink>
      </div>
      <h1>{{ topic }}</h1>
    </div>

    <div ref="messagesRef" class="container__messages" :style="{ height: messagesHeight }">
      <TransitionGroup name="fade">
        <div
          v-for="(item, index) in messages"
          :key="index"
          :class="{ 'text-right': item.login === loginStore.username }"
        >
          <div class="container__message">
            <small>{{ item.login }}</small>
            <div>
              <template v-if="/((http|https):\/\/)/.test(item.message)">
                <a :href="item.message" target="_blank">{{ item.message }}</a>
              </template>
              <template v-else>
                {{ item.message }}
              </template>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <form ref="formRef" class="container__form" @submit.prevent="onSubmit">
      <input v-model.trim="message" type="text" class="input" />
      <button type="submit" class="button" :disabled="!message">Send</button>
    </form>

    <Teleport to="body">
      <ModalDialog v-model="isModalOpened">
        Text

        <template #footer>
          <button type="button" class="button" @click="isModalOpened = false">Close</button>
        </template>
      </ModalDialog>
    </Teleport>
  </div>
</template>

<style scoped>
.back {
  display: grid;
  place-content: start;
  padding-bottom: var(--measure-half);
}

.container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
}

.container__messages {
  border-radius: var(--measure-half);
  padding: var(--measure);
  background: var(--pale);
  overflow: auto;
}

.container__message {
  display: inline-block;
  padding: var(--measure-half) var(--measure);
  border-radius: var(--measure-half);
  color: var(--light);
  background: var(--dark);
  margin-bottom: var(--measure);
}

.container__message a {
  color: var(--light);
}

.text-right {
  text-align: right;
}

.container__form {
  display: grid;
  gap: var(--measure-half);
  padding: var(--measure) 0 0 0;
}

@media (min-width: 481px) {
  .container__form {
    grid-template-columns: 1fr auto;
  }
}
</style>
