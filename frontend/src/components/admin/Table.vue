<template>
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th v-for="(col, i) in columns">
                        {{ col.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows">
                    <td v-for="(key, i) in columnsFields">
                        <slot :name="key" :value="row[key]">
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
    width: 100%;
    padding-left: 20px;
    table {
        overflow-x: auto;
        border-radius: 5px;
        font-size: 16px;
        font-weight: normal;
        border: none;
        border-collapse: collapse;
        width: 100%;
        max-width: 100%;
        white-space: nowrap;
        background-color: white;
        table-layout: fixed;
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

    }

    thead,
    tfoot {
        background-color: #333;
        color: #fff;
    }
}
</style>
