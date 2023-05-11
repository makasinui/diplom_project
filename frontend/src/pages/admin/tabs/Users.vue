<template>
    <div class="users-wrapper">
        <Loader v-if="loading" />
        <Table :columns="cols" :rows="users">
            <template #actions>
                <!-- todo: return id in slot -->
                <ActionsCell @edit="editItem" @delete="deleteItem" />
            </template>
            <template #admin="{ value }">
                {{ value ? "Да" : "Нет" }}
            </template>
        </Table>
        <div class="wrapper">
            <ui-pagination
                :total="total"
                :current="page"
                :paginationPerPage="perPage"
                @updatePage="(ev) => (page = ev)"
                @updatePerPage="(ev) => (perPage = ev)"
            />
        </div>
    </div>
</template>
<script setup>
import Table from "@/components/admin/Table.vue";
import AdminService from "@/services/AdminService.js";
import ActionsCell from "@/components/admin/table-layout/ActionsCell.vue";
import { onMounted, ref, watch } from "vue";

const adminService = new AdminService();
const users = ref([]);
const page = ref(1);
const total = ref(1);
const perPage = ref(10);
const loading = ref(false);

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

const editItem = () => console.log("edit");
const deleteItem = () => console.log("delete");

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