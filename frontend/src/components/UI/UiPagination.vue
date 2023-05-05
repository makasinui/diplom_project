<template>
    <div class="custom-pagination">
        <ul class="pagination">
            <li @click="emit('updatePage', item)" :class="['pagination-item', current === item ? 'active' : '']" v-for="item in total">
                {{ item }}
            </li>
        </ul>
        <div class="select-wrapper" v-if="paginationPerPage">
            <span class="select-title">Показать на странице</span>
            <select class="select" @change="(ev) => emit('updatePerPage', ev.target.value)">
                <option value="10" :selected="paginationPerPage === 10">10</option>
                <option value="20" :selected="paginationPerPage === 20">20</option>
                <option value="50" :selected="paginationPerPage === 50">50</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    total: Number,
    current: Number,
    paginationPerPage: Number | undefined,
});

const emit = defineEmits(['updatePage', 'updatePerPage']);
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
}
</style>