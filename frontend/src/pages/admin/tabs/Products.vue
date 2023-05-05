<template>
    <Table :columns="cols" :rows="products">
        <template #img="{ value }">
            <img class="image-short" :src="value"/>
        </template>
        <template #actions>
            <!-- todo: return id in slot -->
            <ActionsCell @edit="editItem" @delete="deleteItem" />
        </template>
    </Table>
</template>
<script setup>
import Table from '@/components/admin/Table.vue';
import AdminService from '@/services/AdminService.js';
import ActionsCell from '@/components/admin/table-layout/ActionsCell.vue';
import { onMounted, ref } from 'vue';

const adminService = new AdminService();
const products = ref([]);
onMounted(async () => {
    const res = await adminService.getAllProducts();
    products.value = res.data;
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
</script>