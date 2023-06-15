<template>
    <Layout page="cart">
        <section class="main-content">
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
        </section>
        <section class="form content" v-if="total">
            <h2 class="primary-title">Всего: {{ total }}р</h2>
            <section class="non-register" v-if="!user?.name">
                <form novalidate @submit.prevent="sendOrder" class="form-main content">
                    <ui-input
                        v-model="name"
                        type="text"
                        required
                        @error="errorMessage($event)"
                        :rules="{min: 2}"
                        label="Имя"
                    />
                    <ui-input
                        v-model="email"
                        type="email"
                        @error="errorMessage($event)"
                        required
                        label="E-mail"
                    />
                    <ui-input
                        v-model="password"
                        type="password"
                        @error="errorMessage($event)"
                        :rules="{min: 8}"
                        required
                        label="Пароль"
                    />
                    <ui-input
                        v-model="passwordConfirmation"
                        type="password"
                        @error="errorMessage($event)"
                        :rules="{min: 8}"
                        required
                        label="Подтверждение пароля"
                    />
                    <ui-button bold className="button-send">Оформить заказ</ui-button>
                
                </form>
                <router-link to="/login"><ui-button className="button-login" bold>Или войти</ui-button></router-link>
            </section>

            <ui-button @click="sendOrder" v-else bold className="button-send">Оформить заказ</ui-button>
        </section>
        <Modal :show="open" :showSave="false" @close="open = false">
            <template #header>
                <span class="modal-title">Заказ успешно создан!</span>
            </template>
        </Modal>
    </Layout>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useToast } from "vue-toast-notification";

import CartItem from "../components/CartItem.vue";
import AuthService from "../services/AuthService";
import OrderService from "../services/OrderService";
import Modal from "../components/Modal.vue";

const cards = ref([]);
const total = ref(0);

const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const error = ref('');
const toast = useToast();
const user = ref(JSON.parse(localStorage.getItem("user") || "{}"));
const open = ref(false);

const allRequiredFields = computed(() => 
    name.value?.length && 
    email.value?.length && 
    password.value?.length && 
    passwordConfirmation.value?.length && 
    password.value?.length === passwordConfirmation.value?.length
)

const orderService = new OrderService();
const authService = new AuthService();

const errorMessage = (err) => {
    error.value = err;
};

const getCardsContent = () => {
    const localStorageCards = localStorage.getItem("cart");
    if (localStorageCards) {
        cards.value = JSON.parse(localStorageCards);
    } else {
        cards.value = [];
    }

    // общая сумма
    total.value = cards.value.reduce((p, c) => +p + c.price, "");
};

const createOrder = async () => {
    const id = cards.value.map(card => card.id);
    const res = await orderService.makeOrder(id);
    if(res.status === 201) {
        toast.success('Заказ успешно создан!');
        localStorage.removeItem('cart');
        cards.value = [];
        total.value = '';
    }
    return;
}

const sendOrder = async () => {
    if(user.value?.name) {
        await createOrder();
        open.value = true;
        return;
    }

    if(!error.value?.length && allRequiredFields.value) {
        const res = await authService.register({
            email: email.value.trim(),
            password: password.value.trim(),
            password_confirmation: passwordConfirmation.value.trim(),
            name: name.value.trim()
        }); 
        
        res && await createOrder();
        return;
    }

    toast.error('Проверьте поля формы!')
}

onMounted(getCardsContent);
</script>

<style lang="scss">
.cart-wrapper {
    display: flex;
    justify-content: space-between;
    .main-content {
        flex: 0 1 65%;
    }
    .cart-content {
        display: flex;
        flex-wrap: wrap;
        gap: 25px 0;
        width: 100%;
        .card {
            margin-right: 15px;
            padding: 5px;
            border: 1px solid gray;

            @media screen and (max-width: 420px) {
                margin: 0;
            }
        }

        @media (max-width: 768px) {
            justify-content: center;
        }
    }

    .form {
        flex: 0 1 35%;

        .button-send {
            background: green;
            margin-top: 20px;
        }
    }
    .non-register {
        display: flex;
        gap: 150px;
        align-items: center;

        .button-login {
            background: #3f64ae;
            padding: 25px;
        }

        @media screen and (max-width: 1000px) {
            flex-direction: column;
            gap: 20px;

        }
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }

    @media screen and (max-width: 600px) {
        flex-direction: column-reverse;
        text-align: center;

        .form .button-send {
            margin: 0 auto;
            margin-top: 15px;
        }
    }
    .modal-header {
        text-align: center;
    }
}
</style>
