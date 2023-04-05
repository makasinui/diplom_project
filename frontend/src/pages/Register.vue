<template>
    <Layout page="login">
        <section class="login content">
            <h1>Регистрация</h1>
            <form novalidate @submit.prevent="register">
                <ui-input
                    v-model="name"
                    type="text"
                    required
                    :rules="{max: 8}"
                    @error="errorMessage($event)"
                    label="Имя"
                />
                <ui-input
                    v-model="email"
                    type="email"
                    required
                    :rules="{email: true}"
                    @error="errorMessage($event)"
                    label="E-mail"
                />
                <ui-input
                    v-model="password"
                    type="password"
                    required
                    :rules="{min: 8}"
                    @error="errorMessage($event)"
                    label="Пароль"
                />
                <ui-input
                    v-model="passwordConfirmation"
                    type="password"
                    required
                    :rules="{min: 8}"
                    @error="errorMessage($event)"
                    label="Подтверждение пароля"
                />
                <ui-button bold className="button-send">Отправить</ui-button>
            </form>
        </section>
    </Layout>
</template>

<script setup>
import { ref } from "vue";
import AuthService from "@/services/AuthService";
import { useToast } from "vue-toast-notification"
const email = ref("");
const name = ref("");
const password = ref("");
const passwordConfirmation = ref("");

const authService = new AuthService();
const toast = useToast();
const error = ref()

const errorMessage = (err) => {
    error.value = err;
}

async function register() {
    await authService.register({
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
        name: name.value
    });
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
