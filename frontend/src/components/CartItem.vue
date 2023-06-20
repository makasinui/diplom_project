<template>
    <div class="card">
        <div class="card-img">
            <img
                class="primary-img"
                :src="`https://api.khizauto.ru/storage/images/${img}`"
                alt=""
            />
        </div>
        <div class="card-content">
            <span class="card-content__title">
                {{ title }}
            </span>
            <div class="card-content__count">
                <ui-count @change="(c) => changeCount(c)" :count="countItem" />
            </div>
            <div class="card-content__main">
                <span class="card-content__price">
                    {{ price * countItem }}р
                </span>
            </div>
            <div class="card__button">
                <ui-button className="button" @click="deleteFromCart"
                    >Удалить</ui-button
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, toRefs } from "vue";
const props = defineProps({ card: Object });
const emit = defineEmits(["change"]);
const { title, description, price, vin, img, count } = toRefs(props.card);
const countItem = ref(count ?? 1);

const deleteFromCart = () => {
    if (localStorage.getItem("cart")) {
        let card = JSON.parse(localStorage.getItem("cart"));
        card = card.filter((cart) => cart.id !== props.card.id);

        localStorage.setItem("cart", JSON.stringify(card));
        emit("change");
        return;
    }

    localStorage.removeItem("cart");
    emit("change");
};

const changeCount = (item) => {
  let cartParsed = JSON.parse(localStorage.getItem('cart'));
  const card = cartParsed.find(item => item.id === props.card.id);

  card.count = item;
  countItem.value = item;
  
  localStorage.setItem('cart', JSON.stringify(cartParsed));
  emit("change");
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

            @media screen and (max-width: 476px) {
                margin: 0 auto !important;
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
