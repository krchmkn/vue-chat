<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useTopicsStore } from '@/stores/topics'

const store = useTopicsStore()
await store.getTopics()
</script>

<template>
  <ul class="list">
    <li v-for="(value, key) in store.topics" :key="key" class="list__item">
      <RouterLink :to="{ name: 'room', params: { id: key } }" class="list__link" tabindex="0">
        {{ value }}
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped>
.list {
  list-style: none;
}

.list__item {
  padding-bottom: var(--measure);
}

.list__link {
  display: block;
  padding: var(--measure);
  text-decoration: none;
  color: var(--light);
  cursor: pointer;
  border-radius: var(--measure-half);
  transition: all 0.3s ease;
}

.list__link:hover,
.list__link:active,
.list__link:focus {
  background: var(--dark);
  outline-color: var(--light);
}
</style>
