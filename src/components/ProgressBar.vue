<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
const loadingStore = useLoadingStore()
</script>

<template>
  <div v-if="loadingStore.loading" class="container"></div>
</template>

<style scoped>
.container {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--dark);
  overflow: hidden;
  height: 10px;
  z-index: 1;
}
.container::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
  content: '';
}
@keyframes shimmer {
  from {
    transform: translate3d(-100%, 0, 0);
  }
  to {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
