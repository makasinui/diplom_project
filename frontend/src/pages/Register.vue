<template>
    <Layout page="login">
        <section class="login content">
            <h1>Регистрация</h1>
            <form @submit.prevent="register">
                <ui-input
                    v-model="name"
                    type="string"
                    required
                    label="Имя"
                />
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
                <ui-input
                    v-model="passwordConfirmation"
                    type="password"
                    required
                    :rules="{email: true}"
                    @error="errorMessage($event)"
                    label="Подтверждение пароля"
                />
                <ui-button bold className="button-send">Отправить</ui-button>
            </form>
        </section>
        <ui-toastr v-if="showToast" :text="text" />
    </Layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AuthService from "@/services/AuthService";
const email = ref("");
const name = ref("");
const password = ref("");
const showToast = ref(false);
const text = ref('');
const passwordConfirmation = ref("");
const authService = new AuthService();

const errorMessage = (error) => {
    text.value = error;
    showToast.value = true;
    setTimeout(()=>{showToast.value = false}, 5000);
}

async function register() {
    await authService.login({
        email: email.value,
        password: password.value,
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
