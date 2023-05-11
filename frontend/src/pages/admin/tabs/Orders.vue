<template>
    <div class="orders-wrapper">
        <Loader v-if="loading" />
        <Table :columns="cols" :rows="orders">
            <template #actions>
                <!-- todo: return id in slot -->
                <ActionsCell @edit="editItem" @delete="deleteItem" />
            </template>
            <template #user="{ value }">
                {{ value.name }}
            </template>
            <template #products="{ value }">
                <div class="products-cell">
                    <span
                        class="products-cell__item"
                        v-for="item in value"
                        :key="item.id"
                    >
                        {{ item.id }}
                    </span>
                </div>
            </template>
            <template #created_at="{ value }">
                {{ new Date(value).toLocaleDateString() }}
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
const orders = ref([]);
const page = ref(1);
const total = ref(1);
const perPage = ref(10);
const loading = ref(false);

const fetchOrders = async () => {
    loading.value = true;
    const res = await adminService.getAllOrders();
    orders.value = res;
    total.value = res?.last_page;
    perPage.value = res?.per_page;
    loading.value = false;
};

const openProducts = async (id) => {};

onMounted(async () => {
    await fetchOrders();
});

const cols = [
    {
        field: "id",
        title: "ID",
    },
    {
        field: "user",
        title: "Имя пользователя",
    },
    {
        field: "products",
        title: "Товары",
    },
    {
        field: "created_at",
        title: "Дата",
    },
    {
        field: "actions",
        title: "Действия",
    },
];

const editItem = () => console.log("edit");
const deleteItem = () => console.log("delete");

watch([page, perPage], async () => {
    await fetchOrders();
});
</script>

<style lang="scss">
.orders-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-x: auto;

    .products-cell {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;

        &__item {
            padding: 8px;
            background: gray;
            cursor: pointer;
        }
    }

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
