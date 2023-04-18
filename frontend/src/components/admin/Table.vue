<template>
    <table>
        <thead>
            <tr>
                <th v-for="col in columns">{{ col }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows">
                <td v-for="item in row"><div style="height: 20px; overflow: hidden">{{ item }}</div></td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
const props = defineProps({
    columns: Array,
    rows: Array
})
</script>

<style lang="scss" scoped>
table {
    width: 100%;
    padding-left: 20px;
}
tr {
    vertical-align: baseline;
}

td {
    border: 1px solid #333;
}

thead,
tfoot {
    background-color: #333;
    color: #fff;
}

</style>