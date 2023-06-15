<template>
    <section class="search-wrapper content">
        <div class="catalogs white">
            <router-link to="/catalog" class="catalogs">
                <img
                    class="small-icon"
                    src="../assets/img/library_books.png"
                    width="25"
                    height="25"
                    alt="Каталог"
                />
                <span class="catalogs__text">Каталог</span>
                <span class="catalogs__line">|</span>
            </router-link>
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
    if(textSearch.value) {
        router.push({
            path: `/catalog/${textSearch.value.trim()}${vin ? "&vin" : ""}`,
        });
    }
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

        @media (max-width: 425px) {
            justify-content: flex-start;
            margin-left: 10px;
        }
    }

    .search {
        display: flex;
        align-items: center;
        flex: 0 1 80%;
        gap: 5px;

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

        @media (max-width: 425px) {
            margin: 0 10px;
            flex: 0 1 100%;
        }
    }

    @media (max-width: 768px) {
        padding: 0 10px;
        width: auto;
    }

    @media (max-width: 425px) {
        flex-direction: column;
        height: 90px;
        align-items: unset;
    }
}
</style>
