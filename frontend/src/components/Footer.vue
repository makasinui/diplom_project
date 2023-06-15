<template>
  <footer class="footer white">
    <ul class="footer-section">
    </ul>
    <router-link to="/catalog">
      <ul class="footer-section">
        <span class="footer-section__title">Товары</span>
        <li class="footer-section__item">Каталог запчастей</li>
        <li class="footer-section__item">Запчасти для ТО</li>
      </ul>
    </router-link>
    <router-link to="/contacts">
      <ul class="footer-section">
        <span class="footer-section__title">Покупателям</span>
        <li class="footer-section__item">Контакты</li>
      </ul>
    </router-link>
  </footer>
</template>

<style lang="scss">
.footer {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 20px;
  margin-top: 20px;
  background: rgba(0, 0, 0, 0.7);

  &-section {
    &__title {
      font-weight: 700;
      font-size: 18px;
      line-height: 40px;

      @media (max-width: 768px) {
        font-size: 16px;
      }
    }

    &__item {
      font-weight: 300;
      line-height: 30px;

      @media (max-width: 768px) {
        font-size: 14px;
      }
    }
  }
}
</style>
