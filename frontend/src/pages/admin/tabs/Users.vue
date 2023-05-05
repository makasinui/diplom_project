<template>
    <Table :columns="cols" :rows="users">
        <template #actions>
            <!-- todo: return id in slot -->
            <ActionsCell @edit="editItem" @delete="deleteItem" />
        </template>
        <template #admin="{ value }">
            {{ value ? 'Да' : 'Нет' }}
        </template>
    </Table>
</template>
<script setup>
import Table from '@/components/admin/Table.vue';
import AdminService from '@/services/AdminService.js';
import ActionsCell from '@/components/admin/table-layout/ActionsCell.vue';
import { onMounted, ref } from 'vue';

const adminService = new AdminService();
const users = ref([]);
onMounted(async () => {
    const res = await adminService.getAllUsers()
    users.value = res.data;
})

const cols = [
    { 
        field: 'id',
        title: 'ID',
    },
    {
        field: 'name',
        title: 'Имя'
    },
    {
        field: 'email',
        title: 'Почта'
    },
    {
        field: 'admin',
        title: 'Администратор'
    },
    {
        field: 'actions',
        title: 'Действия'
    }
];

const editItem = () => console.log('edit')
const deleteItem = () => console.log('delete')
</script>