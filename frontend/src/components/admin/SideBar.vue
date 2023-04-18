<template>
    <section class="sidebar">
        <ul class="menu">
            <li class="menu-item">Товары</li>
            <li class="menu-item">Пользователи</li>
            <li class="menu-item">Заказы</li>
        </ul>
    </section>
</template>

<style lang="scss">
.sidebar {
    font-size: 26px;
    flex: 0 1 300px;
    min-height: 100%;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    .menu {
        height: 100%;
        &-item {
            padding: 10px 20px;
            text-align: center;
            border: 1px solid white;
        }
    }
}
</style>