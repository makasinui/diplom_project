<template>
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
</template>

<style lang="scss" scoped>
.slider {
    &__img {
        object-fit: contain;
        width: 100%;
        max-height: 500px;
    }
}
</style>
