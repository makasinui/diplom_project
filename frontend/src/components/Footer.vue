<template>
  <footer class="footer white">
    <ul class="footer-section">
      <span class="footer-section__title">Товары</span>
      <li class="footer-section__item">Каталог запчастей</li>
      <li class="footer-section__item">Масла моторные</li>
      <li class="footer-section__item">Запчасти для ТО</li>
      <li class="footer-section__item">Щетки стеклоочистителя</li>
    </ul>
    <ul class="footer-section">
      <span class="footer-section__title">Покупателям</span>
      <li class="footer-section__item">Оплата</li>
      <li class="footer-section__item">Возврат</li>
      <li class="footer-section__item">Доставка</li>
    </ul>
    <ul class="footer-section">
      <span class="footer-section__title">Сотрудничество</span>
      <li class="footer-section__item">Продавцам</li>
      <li class="footer-section__item">Оптовым покупателям</li>
    </ul>
    <ul class="footer-section">
      <span class="footer-section__title">KHIZ AUTO</span>
      <li class="footer-section__item">Контакты</li>
    </ul>
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
    }

    &__item {
      font-weight: 300;
      line-height: 30px;
    }
  }
}
</style>
