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
    <section class="content">
      <Search />
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
    <section class="popular-items content" v-if="!isLoading">
      <Card v-for="card in cards" :key="card.id" :card="card" />
    </section>
    <section class="map content">
      <img class="map__img" src="../assets/img/Rectangle.png" alt="" />
    </section>
    <section class="description content">
      <h2 class="description__text-title">
        Качественные автозапчасти для иномарок в нашем интернет магазине
      </h2>
      <span class="description__text">
        KhizAuto – лидер на Российском рынке, подтвердивший свою квалификацию и
        профессионализм. <br />
        Ежедневно к нам на сайт заходят тысячи посетителей, многие становятся
        нашими постоянными клиентами. <br />
        Сотрудники магазина вежливые, коммуникабельные, смогут подобрать
        автозапчасти по артикулу, модели, серии или по году выпуска машины.
        <br />
        Каждый заказчик может рассчитывать на квалифицированную поддержку,
        качественное обслуживание и умеренные цены! <br />
      </span>
      <h2 class="description__text-title">Доставка</h2>
      <span class="description__text">
        Доставка по всему Ростову-на-Дону бесплатна при заказе от 5000р. <br />
        А также доставка по всей России за минимальное время к дверям вашего
        дома. Контакты и номера телефонов <br />
      </span>
      <h2 class="description__text-title">Контакты</h2>
      <span class="description__text">
        Телефон: +7(938)-234-21-53 <br />
        <img
          class="small-icon"
          src="../assets/img/Instagram.png"
          alt="instagram"
        />
        <span class="description__text"> khizauto </span>
        <br />
        <img
          class="small-icon"
          src="../assets/img/VK com.png"
          alt="instagram"
        />
        <span class="description__text"> khizauto </span>
      </span>
    </section>
  </main>
  <Footer />
</template>

<script setup>
import Card from "../components/Card.vue";
import Search from "../components/Search.vue";
import { ref, onMounted } from "vue";
import ProductsService from "../services/ProductsService";
const productService = new ProductsService();

const cards = ref([]);
const isLoading = ref(true);

async function getProducts() {
  isLoading.value = true;
  const res = await productService.getAll();
  cards.value = res.data;
  console.log(cards.value);
  isLoading.value = false;
}

onMounted(async () => {
  await getProducts();
});
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

.map {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &__img {
    width: 100%;
  }
}

.description {
  &__text-title {
    padding: 10px 0;
  }

  &__text {
  }
}
</style>
