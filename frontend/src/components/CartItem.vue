<template>
    <div class="card">
      <div class="card-img">
        <img class="primary-img" :src="`/backend/storage/images/${img}`" alt="" />
      </div>
      <div class="card-content">
        <span class="card-content__title">
          {{ title }}
        </span>
        <div class="card-content__count">
          <ui-button green className="minus btn" @click="minusCount">-</ui-button>
          <input type="number" class="quantity" @change="(e) => e.target.value < 0 ? countItem = 0 : countItem = e.target.value" v-model="countItem">
          <ui-button green className="plus btn" @click="plusCount">+</ui-button>
        </div>
        <div class="card-content__main">
          <span class="card-content__price"> {{ price * countItem }}р </span>
        </div>
        <div class="card__button">
          <ui-button className="button" @click="deleteFromCart">Удалить</ui-button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, toRefs } from "vue";
  const props = defineProps({ card: Object });
  const emit = defineEmits(['deleteCart'])
  const { title, description, price, vin, img, count } = toRefs(props.card);
  const countItem = ref(count ?? 1);
  const image = new URL('../assets/img/Rectangle 9.png', import.meta.url).href;

  const plusCount = () => {
    countItem.value += 1;
  }

  const minusCount = () => {
    countItem.value === 1 ? 1 : countItem.value -= 1
  }
  
  const deleteFromCart = () => {
    if(localStorage.getItem('cart')) {
      let card = JSON.parse(localStorage.getItem('cart'));
      card = card.filter(cart => cart.id !== props.card.id)
      console.log(card, props.card.id)
      localStorage.setItem('cart', JSON.stringify(card));
      emit('deleteCart')
      return;
    }
  
    localStorage.removeItem('cart');
    emit('deleteCart')
  }
  </script>
  
  <style lang="scss" scoped>
  .card {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
  
    &-img {
      .primary-img {
        max-width: 100px;
        width: 100%;
      }
    }
  
    &-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      width: 100%;
      flex: 0 1 auto;
  
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

      &__count {
         display: flex;
        align-items: center;

         .btn {
            padding: 10px !important;
            border-radius: 10px;
            margin: 0 5px;
            height: 20px !important;
         }
         
         .quantity {
          max-width: 30px;
         }
      }
  
      .card__button {
        margin-left: auto;
        margin-right: 5px;
        .button {
          background: #3f64ae;
        }
      }
    }

    @media screen and (max-width: 420px) {
      flex-direction: column;

      &-content {
        flex-direction: column;

        .card__button {
          margin: 0 auto;
        }
      }
    }
  }
  </style>
  