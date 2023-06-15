<template>
    <header class="header">
        <div class="container header-wrapper">
            <ul class="main-menu">
                <li class="menu__item">
                    <router-link to="/">Главная</router-link>
                </li>
                <li class="menu__item">
                    <router-link to="/about-us">О нас</router-link>
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
                    <li class="ml"><router-link to="/register">Регистрация</router-link></li>
                </div>
                <div class="authentificated" v-if="user?.name">
                    <li>
                        <a href="#" @click.prevent="logout">Выйти</a>
                    </li>
                    <li v-if="user?.admin">
                        <router-link to="/admin"> Админ панель </router-link>
                    </li>
                </div>
            </ul>
        </div>
    </header>
    <header class="header header-mobile">
        <div class="city">
        </div>
        <div class="main-menu">
            <div class="line-wrapper" @click="openMobileMenu = !openMobileMenu">
                <span :class="['line', openMobileMenu ? 'open' : '']"></span>
                <span :class="['line', openMobileMenu ? 'open' : '']"></span>
                <span :class="['line', openMobileMenu ? 'open' : '']"></span>
            </div>
        </div>
        <div class="menu-mobile" @click="openMobileMenu = false" v-if="openMobileMenu">
            <li class="menu__item">
                <router-link to="/">Главная</router-link>
            </li>
            <li class="menu__item">
                <router-link to="/about-us">О нас</router-link>
            </li>
            <li class="menu__item">
                <router-link to="/catalog">Каталог</router-link>
            </li>
            <li class="menu__item">
                <router-link to="/contacts">Контакты</router-link>
            </li>
            <li class="menu__item">
                <router-link to="/cart">Корзина</router-link>
            </li>
            
                <li class="menu__item" v-if="!user?.name">
                    <router-link to="/login" >Авторизация</router-link>
                </li>
                <li class="menu__item" v-if="!user?.name">
                    <router-link to="/register">Регистрация</router-link>
                </li>
            
            
                <li class="menu__item" v-if="user?.name">
                    <a href="#" @click="logout">Выйти</a>
                </li>
                <li class="menu__item" v-if="user?.admin">
                    <router-link to="/admin"> Админ панель </router-link>
                </li>
            
        </div>
    </header>
</template>
<script setup>

import { ref, onMounted, watch, computed } from "vue";
import AuthService from "../services/AuthService";
import { useStore } from "vuex";

const store = useStore();
const user = computed(() => store.getters.user);
const openMobileMenu = ref(false);
const authService = new AuthService();
const logout = () => authService.logout();

watch(openMobileMenu, (val) => {
    if(val) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
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

    &-wrapper {
        display: flex;
    }

    .authentificated {
        display: flex;
        width: 100%;
        li {
            margin-left: 20px;
        }
        &-no {
            display: flex;
        }
    }

    .city {
        display: flex;
        align-items: center;

        @media (max-width: 1000px) {
            width: 100%;
        }
    }

    .main-menu {
        display: flex;
        gap: 25px;
        width: 100%;
        @media (max-width: 1000px) {
            justify-content: flex-end;
            max-width: none;
            margin-right: 20px;
            position: relative;

            .line-wrapper {
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                position: relative;
                z-index: 11;
                gap: 4px;
                cursor: pointer;

                .line {
                    width: 20px;
                    height: 2px;
                    background: white;
                    transition: 0.3s all;
                    &.open {
                        transition: 0.3s all;
                        &:nth-child(3) {
                            display: none;
                        }
                        &:nth-child(1) {
                            position: absolute;
                            transform: rotate(45deg);
                        }
                        &:nth-child(2) {
                            transform: rotate(-45deg);
                        }
                    }
                }
            }
        }
    }

    .menu-mobile {
        position: absolute;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 20px;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10;
        width: 100%;
        height: 100%;
        top: 0;
        justify-content: center;

        .menu__item {
            margin-top: 20px;
            color: white;
            display: flex;
            a {
                width: 100%;
                font-size: 20px;
            }
        }
        .authentificated {
            display: flex;
            width: 100%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
            li {
                margin-left: 20px;
            }
            &-no {
                display: flex;
            }
        }
    }

    .authorizathion {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 300px;
    }
    &.header-mobile {
        display: none;

        @media (max-width: 1000px) {
            display: flex;
        }
    }

    @media (max-width: 1000px) {
        display: none;
    }
}
</style>
