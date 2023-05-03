<template>
    <Layout page="login">
        <section class="login content">
            <h1>Авторизация</h1>
            <form @submit.prevent="login">
                <ui-input
                    v-model="email"
                    type="email"
                    required
                    label="E-mail"
                />
                <ui-input
                    v-model="password"
                    type="password"
                    required
                    label="Пароль"
                />
                <ui-button bold className="button-send">Отправить</ui-button>
            </form>
        </section>
    </Layout>
</template>

<script setup>
import { ref } from "vue";
import AuthService from '@/services/AuthService'
import router from "../router";
const email = ref("");
const password = ref("");
const authService = new AuthService();

async function login() {
    await authService.login({
        email: email.value, 
        password: password.value
    });
    router.push('/')
}
</script>

<style lang="scss">
.login-wrapper {
    width: 100%;
    .login {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        h1 {
            margin-bottom: 20px;
        }
    }
    form {
        max-width: 500px;
        max-height: 500px;
        height: 100%;
        .button-send {
            background: green;
            margin: 0 auto;
            margin-top: 20px;
        }
    }
}
</style>
