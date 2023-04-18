<template>
    <Layout page="main">
        <section class="logo-wrapper content">
            <div class="logo">
                <img src="../assets/img/logo.png" alt="" />
            </div>
            <div class="time">
                <div class="time__firstline">
                    <img
                        class="small-icon"
                        src="../assets/img/schedule.png"
                        alt=""
                    />
                    <span class="content__text"><b>Время работы</b></span>
                </div>

                <div class="time__content">
                    <span class="content__text">Пн-Сб: c 09:00-20:00 </span>
                    <span class="content__text">Вс: с 10:00-18:00</span>
                </div>
            </div>
        </section>
        <section class="content">
            <Search />
        </section>
        <section class="slider content">
            <main-slider />
        </section>
        <section class="popular-items content" v-if="!isLoading">
            <Card v-for="card in cards" :key="card.id" :card="card" />
        </section>
        <section class="map content">
            <img class="map__img" src="../assets/img/Rectangle.png" alt="" />
        </section>
    </Layout>
</template>

<script setup>
import Card from "../components/Card.vue";
import Search from "../components/Search.vue";
import MainSlider from "../components/MainSlider.vue";
import { ref, onMounted } from "vue";
import ProductsService from "../services/ProductsService";
const productService = new ProductsService();

const cards = ref([]);
const isLoading = ref(true);

async function getProducts() {
    isLoading.value = true;
    const res = await productService.getPopular();
    cards.value = res.data;
    /* todo: delete hardcode */
    cards.value = [cards.value[0], cards.value[1], cards.value[2]]
    isLoading.value = false;
}

onMounted(async () => {
    await getProducts();
});
</script>

<style lang="scss">
.logo-wrapper {
    display: flex;
    justify-content: space-between;

    .time {
        display: flex;
        flex-direction: column;

        &__firstline {
            display: flex;
        }

        &__content {
            display: flex;
            flex-direction: column;
        }
    }
}

.popular-items {
    display: flex;
    justify-content: space-between;
    gap: 8px;
}

.map {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &__img {
        width: 100%;
    }
}
</style>
