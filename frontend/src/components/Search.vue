<template>
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
            <input
                type="search"
                name="search"
                class="search__input"
                v-model="textSearch"
            />
            <ui-button bold class="search__button quest" @click="search"
                >Поиск</ui-button
            >
            <ui-button
                bold
                class="search__button query"
                @click="() => search(true)"
                >Запрос по VIN</ui-button
            >
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
import router from "../router/index.js";

const textSearch = ref();
function search(vin = false) {
    router.push({
        path: `/catalog/${textSearch.value}${vin ? "&vin" : ""}`,
    });
}
</script>

<style lang="scss">
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
</style>
