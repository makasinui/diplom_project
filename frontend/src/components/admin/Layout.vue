<template>
    <Header />
    <main :class="[className, 'admin-main content']">
        <SideBar />
      <slot></slot>
    </main>
    <Footer />
  </template>
  
  <script setup>
  import Header from "../Header.vue";
  import Footer from "../Footer.vue";
import SideBar from "./SideBar.vue";
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

  .admin-main {
    display: flex;
  }
  </style>
  