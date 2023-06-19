<template>
    <div class="count">
        <ui-button green className="minus btn" @click="minusCount">-</ui-button>
        <input
            type="number"
            class="quantity"
            @change="
                (e) =>
                    e.target.value < 0
                        ? (countItem = 0)
                        : (countItem = e.target.value)
            "
            v-model="countItem"
        />
        <ui-button green className="plus btn" @click="plusCount">+</ui-button>
        <ui-button
            v-if="allowDelete"
            className="delete btn"
            @click="deleteItem"
            ><img src="../../assets/img/trash.png" alt=""
        /></ui-button>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
    count: Number,
    allowDelete: { type: Boolean, required: false },
});
const emit = defineEmits(["change"]);

const countItem = ref(props.count);

const plusCount = () => {
    countItem.value += 1;
};

const minusCount = () => {
    countItem.value === 1 ? 1 : (countItem.value -= 1);
};

const deleteItem = () => {
    countItem.value = 0;
}

watch(countItem, () => {
    emit("change", countItem.value);
});
</script>

<style lang="scss" scoped>
.count {
    display: flex;
    align-items: center;

    .btn {
        padding: 10px !important;
        border-radius: 10px;
        margin: 0 5px;
        height: 20px !important;

        &.delete {
            background: red;

            img {
                max-width: 15px;
            }
        }
    }

    .quantity {
        max-width: 30px;
    }
}
</style>
