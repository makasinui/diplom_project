<template>
  <Layout page="catalog">
    <section class="content">
      <Search />
    </section>
    <section class="cards-wrapper content">
      <Card v-for="card in cards" :key="card.id" :card="card" />
    </section>
  </Layout>
</template>

<script setup>
import Search from "../components/Search.vue";
import Card from "../components/Card.vue";
import { ref, onMounted } from "vue";
import ProductsService from "../services/ProductsService";
const productService = new ProductsService();

const cards = ref([]);
const isLoading = ref(true);

async function getProducts() {
    isLoading.value = true;
    const res = await productService.getPopular();
    cards.value = res.data;
    isLoading.value = false;
}

onMounted(getProducts)
</script>

<style lang="scss">
.catalog-wrapper {
  .cards-wrapper {
    display: flex;
    justify-content: space-between;
  }
}
</style>
