<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const isSubmitEnabled = computed(() => username.value && password.value)
const store = useLoginStore()

const loading = ref(false)
const isError = ref(false)

async function onSubmit() {
  if (!username.value || !password.value) {
    return
  }

  try {
    loading.value = true
    await store.logIn({
      login: username.value,
      password: password.value
    })
    router.push({ name: 'home' })
  } catch (err) {
    isError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <div v-if="isError" class="login-form__error">An error has occurred. Please try again.</div>

    <fieldset class="login-form__item">
      <label for="login">Username</label>
      <input
        v-model.trim="username"
        id="login"
        type="text"
        class="input"
        minlength="5"
        required
        :disabled="loading"
      />
    </fieldset>

    <fieldset class="login-form__item">
      <label for="password">Password</label>
      <input
        v-model.trim="password"
        id="password"
        type="password"
        class="input"
        minlength="5"
        required
        :disabled="loading"
      />
    </fieldset>

    <button type="submit" class="button" :disabled="!isSubmitEnabled || loading">Log in</button>
  </form>
</template>

<style scoped>
.login-form {
  display: grid;
  height: 100%;
  place-content: center;
}

.login-form__item {
  border: 0;
  padding: 0;
  margin: 0;
  padding-bottom: var(--measure);
}

.login-form__error {
  padding: var(--measure);
  text-align: center;
  margin-bottom: var(--measure);
  border-radius: var(--measure-half);
}
</style>
