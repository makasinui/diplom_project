<template>
  <Header />
  <main class="catalog-wrapper container">
    <section class="content">
      <Search />
    </section>
    <section class="cards-wrapper content">
      <Card />
    </section>
  </main>
  <Footer />
</template>

<script setup>
import Search from "../components/Search.vue";
import Card from "../components/Card.vue";
</script>

<style lang="scss">
.catalog-wrapper {
}
</style>
