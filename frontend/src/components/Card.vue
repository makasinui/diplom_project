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
        <ui-button v-if="!count" className="button" @click="addToCart">Купить</ui-button>
        <div class="card__count" v-else>
          <ui-count :count="count" allow-delete @change="(c) => changeCount(c)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs, ref, onMounted } from "vue";
const props = defineProps({ card: Object });
const { title, description, price, vin, img } = toRefs(props.card);

const image = `/backend/storage/images/${img.value}`;
const count = ref(0);

const addToCart = () => {
  if(localStorage.getItem('cart')) {
    const card = JSON.parse(localStorage.getItem('cart'));
    if(card.some(item => item.id === props.card.id)) {
      const item = card.find(item => item.id === props.card.id);
      // если повторно добавляем товар то прибавляем count
      item.count = item.count ? item.count + 1 : 2;
      count.value = item.count;
      localStorage.setItem('cart', JSON.stringify(card));
      return;
    }
    card.push({...props.card, count: 1});
    count.value = 1;
    localStorage.setItem('cart', JSON.stringify(card));
    return;
  }

  count.value = 1;
  localStorage.setItem('cart', JSON.stringify([{...props.card, count: 1}]));
}

const changeCount = (item) => {
  let cartParsed = JSON.parse(localStorage.getItem('cart'));
  const card = cartParsed.find(item => item.id === props.card.id);

  if(item === 0) {
    cartParsed = cartParsed.filter(cartItem => cartItem.id !== card.id);
    count.value = 0;
  } else {
    card.count = item;
  }

  localStorage.setItem('cart', JSON.stringify(cartParsed));
}

/* check item count */
onMounted(() => {
  if(localStorage.getItem('cart')) {
    const allCart = JSON.parse(localStorage.getItem('cart'))
    const card = allCart.find(item => item.id === props.card.id);
    
    if(card) {
      count.value = card.count;
    }
  }
})
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
    flex: 1 0 auto;

    &__title {
      font-weight: 500;
      word-break: break-all;
    }

    &__main {
      display: flex;
      flex-direction: column;
    }

    &__description {
      word-break: break-all;
    }

    &__main {
    }

    &__price {
    }

    &__vin {
    }

    .card__button {
      margin-top: auto;
      .button {
        background: #3f64ae;
      }
      .card__count {
        display: flex;
        justify-content: center;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .card__button .button {
      margin: 0 auto;
    }
  }
  opacity: 0.95;

  &:hover {
    transition: 0.3s all;
    opacity: 1;
  }
}
</style>
