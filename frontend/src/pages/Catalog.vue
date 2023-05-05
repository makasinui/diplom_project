<template>
    <Layout page="catalog">
        <section class="content">
            <Search />
        </section>
        <section class="cards-wrapper content">
            <Card
                v-for="item in products"
                :card="item"
                v-if="products?.length"
            />
            <h2 v-else>Ничего не найдено</h2>
        </section>
        <section class="pagination-wrapper content">
            <ui-pagination
                :current="page"
                :total="total"
                @updatePage="(ev) => (page = ev)"
                @updatePerPage="(ev) => (perPage = ev)"
            />
        </section>
    </Layout>
</template>

<script setup>
import Search from "../components/Search.vue";
import Card from "../components/Card.vue";
import router from "../router/index.js";
import ProductsService from "../services/ProductsService";
import { onMounted, ref, watch } from "vue";

const products = ref();
const page = ref(1);
const perPage = ref(10);
const total = ref(1);

async function getProducts() {
    const productsService = new ProductsService();
    const searchString =
        router.currentRoute.value.params.searchString.split("&");
    if (searchString[0] !== "" && searchString[0] !== "undefined") {
        const search = searchString[1]
            ? `vin=${searchString[0]}`
            : `search=${searchString[0]}`;

        const res = await productsService.searchProducts(search, page.value, perPage.value);
        
        products.value = res.data;
        perPage.value = res.meta?.per_page;
        total.value = res.meta?.last_page;
        return;
    }
    const res = await productsService.getAll(page.value, perPage.value);
    products.value = res.data;
    perPage.value = res.meta.per_page;
    total.value = res.meta.last_page;
}

onMounted(getProducts);
watch([page, perPage], (a,b) => {
    console.log(a,b)
    getProducts();
});
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
