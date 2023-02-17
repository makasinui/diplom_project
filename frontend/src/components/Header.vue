<template>
  <header class="header">
    <div class="city">
      <!-- TODO: -->
      <span>map</span>
      <span>г. Ростов-на-Дону</span>
    </div>
    <ul class="main-menu">
      <li class="menu__item"><a href="">О нас</a></li>
      <li class="menu__item"><a href="">Клиентам</a></li>
      <li class="menu__item"><a href="">VIN запрос</a></li>
      <li class="menu__item"><a href="">Контакты</a></li>
    </ul>
    <ul class="authorizathion">
      <li>Корзина</li>
      <li>Авторизация</li>
      <li>Регистрация</li>
    </ul>
  </header>
</template>
<style lang="scss">
.header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    background: rgba(0, 0, 0, 0.7);
    height: 50px;
    color: white;

    .main-menu {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 400px;
    }

    .authorizathion {
      display: flex;
      justify-content: space-between;
      width: 100%;
      max-width: 300px;
    }
}
</style>
