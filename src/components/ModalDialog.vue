<script setup lang="ts">
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <Transition name="fade">
    <div v-if="modelValue" class="modal-wrap">
      <div class="modal">
        <div class="modal__header">
          <span class="modal__close" @click="$emit('update:modelValue', false)">
            <img src="@/assets/icon-close.svg" alt="Close modal" width="25" height="25" />
          </span>
        </div>

        <div class="modal__content">
          <slot></slot>
        </div>

        <div class="modal__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  padding: var(--measure);
  align-items: center;
}

.modal {
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: var(--light);
  color: var(--dark);
  border-radius: var(--measure-half);
  margin: 0 auto;
  max-width: 700px;
  width: 100%;
  box-shadow: 0 0 5px var(--dark);
}

.modal__header,
.modal__footer {
  display: grid;
  place-content: end;
}

.modal__header,
.modal__content,
.modal__footer {
  padding: var(--measure);
}

.modal__close {
  cursor: pointer;
  padding: var(--measure-half);
  display: inline-flex;
}
</style>
