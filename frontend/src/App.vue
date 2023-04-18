
<template>
  <router-view v-slot="{ Component, route }">
    <Header />
    <transition name="fade" mode="out-in">
      <div class="main-wrapper-content " :key="route.path">
        <component :is="Component" />
      </div>
    </transition>
    <Footer />
  </router-view>
</template>

<script setup>
import { onMounted } from 'vue';
import store from './store';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
onMounted(async () => {
  await store.dispatch('getUser');
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

