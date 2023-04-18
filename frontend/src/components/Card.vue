<template>
  <div class="card">
    <div class="card-img">
      <img class="primary-img" :src="image" alt="" />
    </div>
    <div class="card-content">
      <span class="card-content__title">
        {{ title }}
      </span>
      <div class="card-content__main">
        <span class="card-content__description">{{ description }}</span>
        <span class="card-content__price"> {{ price }}р </span>
      </div>
      <span class="card-content__vin"> vin: {{ vin }} </span>
      <div class="card__button">
        <ui-button className="button" @click="addToCart">Купить</ui-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";
const props = defineProps({ card: Object });
const { title, description, price, vin, img } = toRefs(props.card);
const image = new URL('../assets/img/Rectangle 9.png', import.meta.url).href;

const addToCart = () => {
  if(localStorage.getItem('cart')) {
    const card = JSON.parse(localStorage.getItem('cart'));
    card.push(props.card);
    localStorage.setItem('cart', JSON.stringify(card));
    return;
  }

  localStorage.setItem('cart', JSON.stringify([props.card]));
}
</script>

<style lang="scss">
.card {
  width: 270px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &-img {
    .primary-img {
      max-width: 270px;
      width: 100%;
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &__title {
      font-weight: 500;
    }

    &__main {
      display: flex;
      flex-direction: column;
    }

    &__description {
    }

    &__main {
    }

    &__price {
    }

    &__vin {
    }

    .card__button {
      .button {
        background: #3f64ae;
      }
    }
  }
}
</style>
