<template>
    <header class="header">
        <div class="city">
            <img class="small-icon" src="../assets/img/room.png" />
            <span>г. Ростов-на-Дону</span>
        </div>
        <ul class="main-menu">
            <li class="menu__item">
                <router-link to="/">Главная</router-link>
            </li>
            <li class="menu__item">
                <router-link to="/about-us">О нас</router-link>
            </li>
            <li class="menu__item">
                <router-link to="/clients">Клиентам</router-link>
            </li>
            <li class="menu__item">
                <router-link to="/catalog">Каталог</router-link>
            </li>
            <li class="menu__item">
                <router-link to="/contacts">Контакты</router-link>
            </li>
        </ul>
        <ul class="authorizathion">
            <li><router-link to="/cart">Корзина</router-link></li>
            <div class="authentificated-no" v-if="!user?.name">
                <li><router-link to="/login">Авторизация</router-link></li>
                <li><router-link to="/register">Регистрация</router-link></li>
            </div>
            <div class="authentificated" v-if="user?.name">
                <li v-if="user">
                    <a href="#" @click.prevent>Выйти</a>
                </li>
            </div>
        </ul>
    </header>
</template>
<script setup>
import store from '../store';
import { ref, onMounted } from 'vue';
const user = ref(store.getters.user);
onMounted(() => {
  window.addEventListener('user', () => {
    user.value = JSON.parse(localStorage.getItem('user'))
    console.log(user.value)
  })
})
</script>
<style lang="scss">
.header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    background: rgba(0, 0, 0, 0.7);
    height: 50px;
    color: white;

    .authentificated {
        display: flex;

        &-no {
            display: flex;
        }
    }

    .city {
        display: flex;
        align-items: center;
    }

    .main-menu {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 500px;
    }

    .authorizathion {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 300px;
    }
}
</style>
