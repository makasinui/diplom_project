<template>
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th v-for="(col, i) in columns" :key="i">
                        {{ col.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, i) in rows" :key="i">
                    <td v-for="(key, j) in columnsFields" :key="j">
                        <slot :name="key" :value="row[key]" :row="row">
                            {{ row[key] }}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    columns: Array,
    rows: Array,
});
const columnsFields = computed(() =>
    props.columns.map((item) => item.field)
);
</script>

<style lang="scss" scoped>
.table-wrapper {
    padding-left: 20px;
    overflow-x: auto;
    flex: 1 0 auto;
    table {
        border-radius: 5px;
        font-size: 16px;
        font-weight: normal;
        border: none;
        border-collapse: collapse;
        white-space: nowrap;
        background-color: white;
        table-layout: fixed;
        min-width: 600px;
        width: 100%;
    }
    tr {
        display: table-row;
        border-color: #333;
    }

    td,
    th {
        text-align: center;
        padding: 8px;
    }

    td {
        border: 1px solid #333;
        vertical-align: middle;
        word-break: break-all;
        white-space: break-spaces;
    }

    thead,
    tfoot {
        background-color: #333;
        color: #fff;
    }

    @media screen and (max-width: 1000px) {
        padding-left: 0;
    }
    @media screen and (max-width: 800px) { 
        table {
            table-layout: auto;
        }
    }
}
</style>
