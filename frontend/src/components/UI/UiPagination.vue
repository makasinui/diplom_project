<template>
    <div class="custom-pagination" v-if="total > 1">
        <ul class="pagination" v-if="total <= 5">
            <li
                @click="emit('updatePage', item)"
                :class="['pagination-item', current === item ? 'active' : '']"
                v-for="item in total"
                :key="item"
            >
                {{ item }}
            </li>
        </ul>
        <ul class="pagination" v-else>
            <li class="pagination-item" @click="showPreviousPage" v-if="displayLess">
                &lt;&lt;
            </li>
            <template v-for="item in totalValue" :key="item">
                <li
                    @click="emit('updatePage', item)"
                    :class="['pagination-item', current === item ? 'active' : '']"
                    v-if="item > from"
                >
                    {{ item }}
                </li>
            </template>
            <li v-if="displayMore && total !==6" class="pagination-item" @click="showNextPages">
                >
            </li>
            <li :class="['pagination-item', current === total ? 'active' : '']" @click="emit('updatePage', total)">
                {{ total }}
            </li>
        </ul>
        <div class="select-wrapper" v-if="paginationPerPage">
            <span class="select-title">Показать на странице</span>
            <select
                class="select"
                @change="(ev) => {emit('updatePerPage', ev.target.value); emit('updatePage', 1)}"
            >
                <option value="10" :selected="paginationPerPage === 10">
                    10
                </option>
                <option value="20" :selected="paginationPerPage === 20">
                    20
                </option>
                <option value="50" :selected="paginationPerPage === 50">
                    50
                </option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
    total: Number,
    current: Number,
    paginationPerPage: Number | undefined,
});

const displayMore = ref(true);
const displayLess = ref(false);
/* если у нас больше 5 страниц, отрисовываем другой список */
const totalValue = ref(5);
/* с какой страницы отображать */
const from = ref(0);
const showNextPages = () => {
    const max = props.total - totalValue.value;
    const step = Math.floor(max / 2);
    if(max === 2 || max === 1) {
        displayMore.value = false;
    }
    totalValue.value = totalValue.value + step;
    from.value = from.value + step;
    displayLess.value = true;
} 

const showPreviousPage = () => {
    totalValue.value = 5;
    from.value = 0;
    displayLess.value = false;
    displayMore.value = true;
} 

const emit = defineEmits(["updatePage", "updatePerPage"]);
</script>

<style lang="scss">
.custom-pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 50px 0 10px 0;
    .pagination {
        display: flex;
        align-items: center;
        &-item {
            cursor: pointer;
            padding: 5px 10px;
            margin-right: 10px;
            border-radius: 6px;
            background: #4d4d4d;
            color: white;
            &.active {
                background: #3f64ae;
            }

            &:hover {
                transition: 0.3s all;
                background: #3f64ae;
            }
        }
    }
    .select {
        margin-left: 15px;
        min-width: 70px;
        box-shadow: 0 4px 4px #eef0f3;
        border-radius: 8px;
        padding: 9px 15px 9px 12px;
        border: 1px solid #3f64ae;
        cursor: pointer;
        &-wrapper {
            display: flex;
            align-items: center;
        }
        &-title {
            font-size: 12px;
        }

        option {
            min-height: 34px;
            padding: 0 30px 0 12px;
            color: #4d4d4d;
        }

        &:hover {
            transition: 0.3s all;
            color: #4d4d4d;
        }
    }

    @media screen and (max-width: 515px) {
        flex-direction: column;
        gap: 15px;
    }
}
</style>
