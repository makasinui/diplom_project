<template>
  <button @click="emit('click')" :class="['button', className, bold ? 'bold' : '']">
    <slot></slot>
  </button>
</template>

<script setup>
const emit = defineEmits(['click'])
defineProps({
  className: String,
  bold: Boolean,
});
</script>

<style lang="scss" scoped>
.button {
  height: 35px;
  font-size: 16px;
  border: none;
  display: flex;
  justify-content: center;
  color: white;
  align-items: center;
  padding: 0 25px;
  cursor: pointer;

  &.bold {
    font-weight: bold;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0 10px;
  }
}
</style>
