<template>
    <Layout page="catalog">
        <section class="content">
            <Search />
        </section>
        <section class="catalog-content content">
            <Loader v-if="loading" />
            <transition-group
                name="fade"
                tag="section"
                class="cards-wrapper"
                v-if="products?.length"
            >
                <Card v-for="item in products" :card="item" :key="item.id" />
            </transition-group>
            <h2 v-else>Ничего не найдено</h2>
        </section>
        <section class="pagination-wrapper content">
            <ui-pagination
                :current="page"
                :total="total"
                :paginationPerPage="perPage"
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
const loading = ref(false);

async function getProducts() {
    const productsService = new ProductsService();
    loading.value = true;

    const searchString =
        router.currentRoute.value.params.searchString.split("&");
    if (searchString[0] !== "" && searchString[0] !== "undefined") {
        const search = searchString[1]
            ? `vin=${searchString[0]}`
            : `search=${searchString[0]}`;

        const res = await productsService.searchProducts(
            search,
            page.value,
            perPage.value
        );

        products.value = res.data;
        perPage.value = res.meta?.per_page;
        total.value = res.meta?.last_page;
        loading.value = false;
        return;
    }
    const res = await productsService.getAll(page.value, perPage.value);
    products.value = res.data;
    perPage.value = res.meta.per_page;
    total.value = res.meta.last_page;
    loading.value = false;
}

onMounted(getProducts);
watch([page, perPage], (a, b) => {
    getProducts();
});
</script>

<style lang="scss">
.catalog-content {
    display: flex;
    
    .cards-wrapper {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        flex-wrap: wrap;

        @media (max-width: 550px) {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }
}
</style>
