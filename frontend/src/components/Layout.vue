<template>
  <main :class="className">
    <slot></slot>
  </main>
</template>

<script setup>
const props = defineProps({
  page: {
    type: String,
    required: true,
  },
});

/* задаём стандартный класс */
const className = `${props.page}-wrapper container`;
</script>

<style lang="scss" scoped>
.container {
  min-height: calc(100vh - 270px);
}
</style>
