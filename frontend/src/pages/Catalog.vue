<template>
  <Layout page="catalog">
    <section class="content">
      <Search />
    </section>
    <section class="cards-wrapper content">
      <Card />
    </section>
  </Layout>
</template>

<script setup>
import Search from "../components/Search.vue";
import Card from "../components/Card.vue";
</script>

<style lang="scss">
.catalog-wrapper {
}
</style>
