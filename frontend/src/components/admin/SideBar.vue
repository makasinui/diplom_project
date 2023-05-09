<template>
    <section class="sidebar">
        <ul class="menu">
            <li class="menu-item" @click="() => emit('changeTab', 'Products')">Товары</li>
            <li class="menu-item" @click="() => emit('changeTab', 'Users')">Пользователи</li>
            <li class="menu-item" @click="() => emit('changeTab', 'Orders')">Заказы</li>
        </ul>
    </section>
</template>

<script setup>
const emit = defineEmits(['changeTab'])
</script>

<style lang="scss">
.sidebar {
    font-size: 26px;
    flex: 0 1 300px;
    height: 600px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    .menu {
        height: 100%;
        &-item {
            cursor: pointer;
            padding: 10px 20px;
            text-align: center;
            border: 1px solid white;
        }
    }

    @media screen and (max-width: 1000px) {
        margin-bottom: 20px;
        flex: 0 0 100px;

        .menu {
            &-item {
                padding: 5px;
            }
        }
    }
}
</style>