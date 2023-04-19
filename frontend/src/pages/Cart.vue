<template>
    <Layout page="cart">
        <h2 class="primary-title content">Корзина</h2>
        <section class="cart-content content">
            <h3 v-if="!cards?.length">Пусто</h3>
            <transition-group name="fade" tag="div" class="cart-content">
                <cart-item
                    @delete-cart="getCardsContent"
                    v-for="item in cards"
                    :card="item"
                    :key="item.id"
                />
            </transition-group>
        </section>
    </Layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import CartItem from "../components/CartItem.vue";
const cards = ref([]);

const getCardsContent = () => {
    const localStorageCards = localStorage.getItem("cart");
    if (localStorageCards) {
        cards.value = JSON.parse(localStorageCards);
    } else {
        cards.value = [];
    }
};

onMounted(getCardsContent);
</script>

<style lang="scss">
.cart-wrapper {
    .cart-content {
        display: flex;
        flex-wrap: wrap;
        gap: 15px 0;
        .card {
            margin-right: 15px;
        }

        @media (max-width: 768px) {
            justify-content: center;
        }
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
</style>
