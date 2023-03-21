<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useLoginStore } from '@/stores/login'
import ProgressBar from '@/components/ProgressBar.vue'

const loginStore = useLoginStore()
</script>

<template>
  <ProgressBar />
  <div class="layout">
    <header class="layout__header">
      <img src="@/assets/logo.svg" alt="Logo" width="100" height="50" />

      <Transition name="fade">
        <div v-if="loginStore.username" class="layout__username">
          <span>{{ loginStore.username }}</span>
          <span class="button button--small" @click="loginStore.logOut"> Log out </span>
        </div>
      </Transition>
    </header>

    <main class="layout__content">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in" appear>
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header'
    'content';
  min-height: 100vh;
}

.layout__header {
  grid-area: header;
  background: var(--dark);
  color: var(--light);
  display: grid;
  place-items: center;
  place-content: space-between;
  grid-auto-flow: column;
  padding: var(--measure-half) var(--measure);
}

.layout__content {
  grid-area: content;
  padding: var(--measure);
  width: 100%;
  margin: 0 auto;
}

.layout__username {
  display: grid;
  grid-auto-flow: column;
  gap: var(--measure);
  align-items: center;
}
</style>
