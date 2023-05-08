<template>
    <div class="products-wrapper">
        <Table :columns="cols" :rows="products">
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

const adminService = new AdminService();
const products = ref([]);
const page = ref(1);
const total = ref(1);
const perPage = ref(10);

const fetchProducts = async () => {
    const res = await adminService.getAllProducts(page.value, perPage.value);
    products.value = res.data;
    total.value = res.meta?.last_page;
    perPage.valeu = res.meta?.per_page;
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
        field: 'actions',
        title: 'Действия'
    }
];

const editItem = () => console.log('edit')
const deleteItem = () => console.log('delete')

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