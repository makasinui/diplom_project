<template>
    <Layout page="login">
        <section class="login content">
            <h1>Авторизация</h1>
            <form>
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

const email = ref("");
const password = ref();
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
        border: 1px solid gray;
        padding: 100px 150px;

        .button-send {
            background: green;
            margin: 0 auto;
            margin-top: 20px;
        }
    }
}
</style>
