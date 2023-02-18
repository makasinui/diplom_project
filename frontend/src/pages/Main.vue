<template>
  <Header />
  <main class="main container">
    <section class="logo-wrapper content">
      <div class="logo">
        <img src="../assets/img/Group 4.png" alt="" />
      </div>
      <div class="time">
        <div class="time__firstline">
          <img class="small-icon" src="../assets/img/schedule.png" alt="" />
          <span class="content__text"><b>Время работы</b></span>
        </div>

        <div class="time__content">
          <span class="content__text">Пн-Сб: c 09:00-20:00 </span>
          <span class="content__text">Вс: с 10:00-18:00</span>
        </div>
      </div>
    </section>
    <section class="search-wrapper content">
      <div class="catalogs white">
        <img
          class="small-icon"
          src="../assets/img/library_books.png"
          width="25"
          height="25"
          alt="Каталоги"
        />
        <span class="catalogs__text">Каталоги</span>
        <span class="catalogs__line">|</span>
      </div>
      <div class="search">
        <input type="search" name="search" class="search__input" />
        <ui-button bold class="search__button quest">Поиск</ui-button>
        <ui-button bold class="search__button query">Запрос по VIN</ui-button>
      </div>
    </section>
    <section class="slider content">
      <swiper-container
        speed="500"
        loop="true"
        slides-per-view="1"
        navigation="true"
      >
        <swiper-slide>
          <img
            class="slider__img"
            src="../assets/img/mercedes-benz-e63-amg-s-sonic-286.jpg"
            alt=""
          />
        </swiper-slide>
        <swiper-slide>
          <img
            class="slider__img"
            src="../assets/img/bmw-5-series-sedan-m-technical-data-sp-xxl.jpg"
            alt=""
          />
        </swiper-slide>
        <swiper-slide>
          <img
            class="slider__img"
            src="../assets/img/A1911979_large_1920x600.webp"
            alt=""
          />
        </swiper-slide>
      </swiper-container>
    </section>
    <section class="popular-items" v-if="!isLoading">
      <Card v-for="card in cards" :key="card.id" :card="card" />
    </section>
  </main>
</template>

<script setup>
import Card from "../components/Card.vue";
import { ref, onMounted } from "vue";
import ProductsService from "../services/ProductsService";
const productService = new ProductsService;

const cards = ref([]);
const isLoading = ref(true);

async function getProducts() {
  isLoading.value = true;
  const res = await productService.getAll();
  cards.value = res.data;
  isLoading.value = false;
}

onMounted(async () => {
  await getProducts();
})
</script>

<style lang="scss">
.logo-wrapper {
  display: flex;
  justify-content: space-between;

  .time {
    display: flex;
    flex-direction: column;

    &__firstline {
      display: flex;
    }

    &__content {
      display: flex;
      flex-direction: column;
    }
  }
}

.search-wrapper {
  background: black;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;

  .catalogs {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__text {
      margin-left: 20px;
      font-weight: bold;
    }

    &__line {
      margin-left: 20px;
      margin-bottom: 3px;
      font-size: 30px;
    }
  }

  .search {
    display: flex;
    align-items: center;
    flex: 0 1 80%;

    &__input {
      max-width: 850px;
      width: 100%;
      height: 35px;
    }

    &__button {
      &.quest {
        background: #f5911c;
      }

      &.query {
        background: #d71515;
      }
    }
  }
}

.slider {
  &__img {
    object-fit: contain;
    width: 100%;
    height: 500px;
  }
}

.popular-items {
  display: flex;
  justify-content: space-between;
}
</style>
