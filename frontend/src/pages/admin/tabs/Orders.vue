<template>
    <div class="orders-wrapper">
        <Loader v-if="loading" />
        <Table :columns="cols" :rows="orders">
            <template #actions>
                <ActionsCell hideEdit @edit="editItem" @delete="deleteItem" />
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
                        @click="openModal(item.id)"
                    >
                        {{ item.id }}
                    </span>
                </div>
            </template>
            <template #created_at="{ value }">
                {{ new Date(value).toLocaleDateString() }}
            </template>
        </Table>
        <Modal
            :show="showModal"
            :showSave="false"
            @close="showModal = !showModal"
        >
            <template #header>
                <h3>{{ currentProduct.title }}</h3>
            </template>
            <template #body>
                <div class="order-item">
                    <section class="image">
                        <img
                            :src="`/backend/storage/images/${currentProduct.img}`"
                            alt=""
                        />
                    </section>
                    <section class="content-wrapper">
                        <div class="content-item">
                            <span class="title">Наименование</span>
                            <span class="text">{{ currentProduct.title }}</span>
                        </div>
                        <div class="content-item">
                            <span class="title">Описание</span>
                            <span class="text">{{
                                currentProduct.description
                            }}</span>
                        </div>
                        <div class="content-item">
                            <span class="title">Цена</span>
                            <span class="text">{{ currentProduct.price }}</span>
                        </div>
                        <div class="content-item">
                            <span class="title">VIN</span>
                            <span class="text">{{ currentProduct.vin }}</span>
                        </div>
                    </section>
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
import ProductsService from "@/services/ProductsService";
import Modal from "@/components/Modal.vue";
import Card from "@/components/Card.vue";

import { onMounted, ref, watch } from "vue";

const adminService = new AdminService();
const productsService = new ProductsService();
const orders = ref([]);
const page = ref(1);
const total = ref(1);
const perPage = ref(10);
const loading = ref(false);
const currentProduct = ref();
const showModal = ref(false);

const fetchOrders = async () => {
    loading.value = true;
    const res = await adminService.getAllOrders();
    orders.value = res?.data;
    total.value = res?.last_page;
    perPage.value = res?.per_page;
    loading.value = false;
};

const openModal = async (id) => {
    currentProduct.value = await productsService.getById(id);
    showModal.value = true;
};

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

    .order-item {
        display: flex;
        gap: 20px;
        
        .image img {
            max-width: 270px;
            width: 100%;
        }

        .content {
            &-wrapper {
                padding: 5px;
                border: 1px solid gray;
            }
           &-item {
            display: flex;
            flex-direction: column;

            .title {
                font-size: 18px;
                font-weight: 500;
            }

            .text {
                padding-top: 5px;
            }
           } 
        }

        @media screen and (max-width: 560px) {
            flex-direction: column;
        }
    }
}
</style>
