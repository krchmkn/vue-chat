<script setup lang="ts">
import TopicsList from '@/components/TopicsList.vue'
</script>

<template>
  <div class="container">
    <KeepAlive>
      <Suspense>
        <TopicsList />

        <template #fallback>
          <div class="loading">Loading...</div>
        </template>
      </Suspense>
    </KeepAlive>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
}
.loading {
  display: grid;
  place-content: center;
  align-items: center;
  height: 100%;
}
</style>
