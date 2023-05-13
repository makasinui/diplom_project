<template>
    <ui-button @click="() => {showModal = true; toAdd = true}" green bold className="add-button">Добавить</ui-button>
    <div class="products-wrapper">
        <Loader v-if="loading" />
        <Table :columns="cols" :rows="products">
            <template #popular="{ value, row }">
                <ui-switcher @change="(val) => changePopular(val, row)" :value="value" />
            </template>
            <template #img="{ value }">
                <img class="image-short" :src="image"/>
            </template>
            <template #actions="{ row }">
                <!-- todo: return id in slot -->
                <ActionsCell @edit="editItem(row)" @delete="deleteItem(row.id)" />
            </template>
        </Table>
        <Modal :show="showModal" @close="() => {
                    showModal = false; 
                    toAdd = false;
                    editableItem = {};
                    fillRequired = false;
                }" 
                @save="changeProduct">
            <template #header>
                {{toAdd ? 'Добавление' : 'Редактирование'}} товара
            </template>
            <template #body>
                <div class="edit-wrapper">
                    <div class="image">
                        <img :src="image" v-if="!toAdd">
                        <label v-else>
                            <input type="file">(.jpg, .png, .jpeg)
                        </label>
                    </div>
                    <div class="content-form">
                        <ui-input 
                            label="Наименование" 
                            type="text"
                            :rules="{max: 150}"
                            @error="errorMessage($event)"
                            required 
                            v-model="editableItem.title"
                        />
                        <ui-input 
                            label="Описание"
                            textArea
                            type="text"
                            @error="errorMessage($event)"
                            :rules="{max: 1000}"
                            required 
                            v-model="editableItem.description"
                        />
                        <ui-input 
                            label="Цена" 
                            type="number"
                            :rules="{max: 1000}" 
                            @error="errorMessage($event)"
                            required 
                            v-model="editableItem.price"
                        />
                        <ui-input 
                            label="VIN" 
                            type="number"
                            :rules="{max: 10}" 
                            @error="errorMessage($event)"
                            required 
                            v-model="editableItem.vin"
                        />
                        <ui-switcher 
                            label="Популярный"
                            @change="(val) => editableItem.popular = val" 
                            :value="editableItem.popular" 
                        />
                        <div class="error" v-if="fillRequired">заполнены не все обязательные поля</div>
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
                @updatePerPage="(ev) => perPage = ev"
            />
    </div>
</template>
<script setup>
import Table from '@/components/admin/Table.vue';
import ActionsCell from '@/components/admin/table-layout/ActionsCell.vue';

import AdminService from '@/services/AdminService.js';
import ProductsService from '@/services/ProductsService';

import { onMounted, ref, watch } from 'vue';

import Modal from '@/components/Modal.vue';
import { useToast } from 'vue-toast-notification';
const adminService = new AdminService();
const productsService = new ProductsService();

const products = ref([]);
const page = ref(1);
const total = ref(1);
const perPage = ref(10);
/* TODO: replace image */
const image = new URL('@/assets/img/Rectangle 9.png', import.meta.url).href;

const loading = ref(false);

const editableItem = ref({});
const showModal = ref(false);
const toAdd = ref(false);
const fillRequired = ref(false);
const error = ref();

const errorMessage = (err) => {
    error.value = err;
};

const fetchProducts = async () => {
    loading.value = true;
    const res = await adminService.getAllProducts(page.value, perPage.value);
    products.value = res.data;
    total.value = res.meta?.last_page;
    perPage.value = res.meta?.per_page;
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

const editItem = (row) => {
    /* клонируем без ссылки на объект, потому что в таблице сразу обновляется строка */
    editableItem.value = JSON.parse(JSON.stringify(row));
    showModal.value = true;
}

const changeProduct = async () => {
    const allRequiredFields = 
        editableItem.value.title &&
        editableItem.value.description && 
        editableItem.value.price && 
        editableItem.value.vin

    
    if(!allRequiredFields) {
        console.log(editableItem.value)
        fillRequired.value = true;
        return;
    }

    if(error.value?.length) {
        useToast().error('Проверьте ошибки')
        return;
    }

    if(toAdd.value) {
        loading.value = true;
        showModal.value = false;
        await productsService.create(editableItem.value);
        await fetchProducts();
        editableItem.value = {};
        fillRequired.value = false;
    }
    
    const changedValues = Object.values(editableItem.value)
    const previousValues = Object.values(products.value.find(product => product.id === editableItem.value.id));
    showModal.value = false;
    /* если значения строки и изменённые значение равны, то ничего не делаем */
    if(JSON.stringify(changedValues) === JSON.stringify(previousValues)) {
        editableItem.value = {};
        return;
    }

    await productsService.update(editableItem.value);
    await fetchProducts();
    editableItem.value = {};
}

const deleteItem = async (id) => {
    await productsService.delete(id)
    await fetchProducts();
}
const changePopular = async (value, row) => {
    loading.value = true;
    const data = {...row, popular: Number(value)}
    await productsService.update(data)
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
    .modal-wrapper {
        .edit-wrapper {
            display: flex;
            gap: 20px;
    
            .image img {
                max-width: 270px;
            }
        }

        @media screen and (max-width: 560px) {
            .edit-wrapper {
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .image img {
                    max-width: 200px
                }
            }
        }
    }
}
</style>