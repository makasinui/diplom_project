<template>
    <div class="products-wrapper">
        <Loader v-if="loading" />
        <Table :columns="cols" :rows="products">
            <template #popular="{ value, row }">
                <ui-switcher @change="(val) => changePopular(val, row)" :value="value" />
            </template>
            <template #img="{ value }">
                <img class="image-short" :src="value"/>
            </template>
            <template #actions>
                <!-- todo: return id in slot -->
                <ActionsCell @edit="editItem" @delete="deleteItem" />
            </template>
        </Table>
        <div class="wrapper">
            <ui-pagination 
                :total="total"
                :current="page"
                :paginationPerPage="perPage"
                @updatePage="(ev) => (page = ev)"
                @updatePerPage="(ev) => perPage = ev"
            />
        </div>
    </div>
</template>
<script setup>
import Table from '@/components/admin/Table.vue';
import AdminService from '@/services/AdminService.js';
import ActionsCell from '@/components/admin/table-layout/ActionsCell.vue';
import { onMounted, ref, watch } from 'vue';
import ProductsService from '../../../services/ProductsService';

const adminService = new AdminService();
const productsService = new ProductsService();
const products = ref([]);
const page = ref(1);
const total = ref(1);
const perPage = ref(10);
const loading = ref(false);

const fetchProducts = async () => {
    loading.value = true;
    const res = await adminService.getAllProducts(page.value, perPage.value);
    products.value = res.data;
    total.value = res.meta?.last_page;
    perPage.valeu = res.meta?.per_page;
    loading.value = false;
}

onMounted(async () => {
    await fetchProducts();
})

const cols = [
    { 
        field: 'id',
        title: 'ID',
    },
    {
        field: 'title',
        title: 'Наименование'
    },
    {
        field: 'vin',
        title: 'VIN'
    },
    /* {
        field: 'popular',
        title: 'Популярность'
    }, */
    {
        field: 'img',
        title: 'Изображение'
    },
    {
        field: 'popular',
        title: 'Популярный'
    },
    {
        field: 'actions',
        title: 'Действия'
    }
];

const editItem = () => console.log('edit')
const deleteItem = () => console.log('delete')
const changePopular = async (value, row) => {
    loading.value = true;
    const data = {...row, popular: Number(value)}
    await productsService.changePopular(data, value)
    loading.value = false;
}

watch([page, perPage], async () => {
    await fetchProducts();
})
</script>

<style lang="scss">
.products-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-x: auto;
    .wrapper {
        width: 100%;
        .custom-pagination {
            margin-left: 20px;

            @media screen and (max-width: 1000px) {
                margin-left: 0;
            }
        }
    }
}
</style>