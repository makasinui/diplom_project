<template>
    <div class="users-wrapper">
        <Loader v-if="loading" />
        <Table :columns="cols" :rows="users">
            <template #actions="{ row }">
                <ActionsCell @edit="editItem(row)" @delete="deleteItem(row.id)" />
            </template>
            <template #admin="{ value, row }">
                <ui-switcher
                    :value="value"
                    @change="(ev) => updateAdmin(row.id, ev)"
                />
            </template>
        </Table>
        <Modal :show="showModal" @close="showModal = false" @save="updateUser">
            <template #header>
                Редактирование товара
            </template>
            <template #body>
                <div class="edit-wrapper">
                    <div class="content-form">
                        <ui-input 
                            label="Имя" 
                            type="text"
                            :rules="{max: 150}" 
                            required 
                            v-model="editableItem.name"
                        />
                        <ui-input 
                            label="Почта"
                            type="email"
                            :rules="{max: 1000}"
                            required 
                            v-model="editableItem.email"
                        />
                        <ui-switcher 
                            label="Администратор"
                            @change="(val) => editableItem.admin = val" 
                            :value="editableItem.admin" 
                        />
                    </div>
                </div>
            </template>
        </Modal>
    </div>
    <div class="pagination-table__wrapper">
        <ui-pagination
            :total="total"
            :current="page"
            :paginationPerPage="perPage"
            @updatePage="(ev) => (page = ev)"
            @updatePerPage="(ev) => (perPage = ev)"
        />
    </div>
</template>
<script setup>
import Table from "@/components/admin/Table.vue";
import AdminService from "@/services/AdminService.js";
import ActionsCell from "@/components/admin/table-layout/ActionsCell.vue";
import { onMounted, ref, watch } from "vue";
import UserService from "@/services/UserService";
import Modal from '@/components/Modal.vue';

const adminService = new AdminService();
const userService = new UserService();

const users = ref([]);
const page = ref(1);
const total = ref(1);
const perPage = ref(10);
const loading = ref(false);

const showModal = ref(false);
const editableItem = ref({});

const fetchUsers = async () => {
    loading.value = true;
    const res = await adminService.getAllUsers();
    users.value = res.data;
    total.value = res?.last_page;
    perPage.value = res?.per_page;
    loading.value = false;
};

onMounted(async () => {
    await fetchUsers();
});

const cols = [
    {
        field: "id",
        title: "ID",
    },
    {
        field: "name",
        title: "Имя",
    },
    {
        field: "email",
        title: "Почта",
    },
    {
        field: "admin",
        title: "Администратор",
    },
    {
        field: "actions",
        title: "Действия",
    },
];

const editItem = (row) => {
    editableItem.value = JSON.parse(JSON.stringify(row));
    showModal.value = true;
};

const deleteItem = async (id) => {
    loading.value = true;
    await userService.delete(id);
    await fetchUsers();
};
const updateAdmin = async (id, value) => {
    loading.value = true;
    await userService.adminRoleUpdate(id, value);
    loading.value = false;
};

const updateUser = async () => {
    const changedValues = Object.values(editableItem.value)
    const previousValues = Object.values(users.value.find(user => user.id === editableItem.value.id));
    showModal.value = false;
    /* если значения строки и изменённые значение равны, то ничего не делаем */
    if(JSON.stringify(changedValues) === JSON.stringify(previousValues)) {
        return;
    }
    
    await userService.update(editableItem.value);
    await fetchUsers();
}

watch([page, perPage], async () => {
    await fetchUsers();
});
</script>

<style lang="scss">
.users-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-x: auto;

    .modal-header {
        text-align: center;
    }
    .edit-wrapper {
        display: flex;
        justify-content: center;
        gap: 20px;
    }
}
</style>