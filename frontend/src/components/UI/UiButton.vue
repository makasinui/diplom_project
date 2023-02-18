<template>
  <button :class="['button', className, bold ? 'bold' : '']">
    <slot></slot>
  </button>
</template>

<script setup>
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
}
</style>
