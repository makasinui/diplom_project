<template>
  <header class="header">
    <div class="city">
      <!-- TODO: -->
      <img class="small-icon" src="../assets/img/room.png" />
      <span>г. Ростов-на-Дону</span>
    </div>
    <ul class="main-menu">
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

  .city {
    display: flex;
    align-items: center;
  }

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
