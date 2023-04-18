<template>
    <Layout page="catalog">
        <section class="content">
            <Search />
        </section>
        <section class="cards-wrapper content">
            <Card v-for="item in products" :card="item" />
        </section>
    </Layout>
</template>

<script setup>
import Search from "../components/Search.vue";
import Card from "../components/Card.vue";
import router from "../router/index.js";
import ProductsService from "../services/ProductsService";
import { onMounted, ref } from "vue";

const products = ref();

async function getProducts() {
  const productsService = new ProductsService();
  const searchString = router.currentRoute.value.params.searchString.split('&');
  if(searchString[0] !== '' && searchString[0] !== 'undefined') {
    const search = searchString[1] 
      ? `vin=${searchString[0]}` 
      : `search=${searchString[0]}`;
  
      products.value = await productsService.searchProducts(search)
    return;
  }
  products.value = await productsService.getAll()
}

onMounted(getProducts)
</script>

<style lang="scss">
.catalog-wrapper {

  .cards-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;

    @media (max-width: 550px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
