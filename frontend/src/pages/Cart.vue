<template>
    <Layout page="cart">
        <h2 class="primary-title content">Корзина</h2>
        <section class="cart-content content">
            <h3 v-if="!cards?.length">Пусто</h3>
            <cart-item @delete-cart="getCardsContent" v-for="item in cards" :card="item" />
        </section>
    </Layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import CartItem from '../components/CartItem.vue';
const cards = ref([]);

const getCardsContent = () => {
    const localStorageCards = localStorage.getItem('cart');
    if(localStorageCards) {
        cards.value = JSON.parse(localStorageCards);
    } else {
        cards.value = [];
    }
}

onMounted(getCardsContent)
</script>

<style lang="scss">
.cart-wrapper {
    .cart-content {
        display: flex;
        .card {
            margin-right: 15px;
        }
    }
}
</style>