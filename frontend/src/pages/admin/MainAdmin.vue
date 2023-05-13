<template>
    <Layout page="admin">
        <div class="main-content">
            <SideBar @changeTab="(ev) => (tab = ev)" />
            <div class="content__wrapper">
                <component :is="component" />
            </div>
        </div>
    </Layout>
</template>

<script setup>
import Layout from "@/components/admin/Layout.vue";
import { computed, ref } from "vue";
import SideBar from "@/components/admin/SideBar.vue";
import Products from "./tabs/Products.vue";
import Users from "./tabs/Users.vue";
import Orders from "./tabs/Orders.vue";

const tab = ref("Products");

const component = computed(() => {
    if (tab.value === "Products") return Products;
    if (tab.value === "Orders") return Orders;
    return Users;
});
</script>

<style lang="scss">
.admin-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    .main-content {
        height: 100%;
        display: flex;

        @media (max-width: 1000px) {
            flex-direction: column;
        }
        .content__wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .pagination-table__wrapper {
                width: 100%;
                .custom-pagination {
                    margin-left: 20px;

                    @media screen and (max-width: 1000px) {
                        margin-left: 0;
                    }
                }
            }
        }
    }
    .image-short {
        max-width: 70px;
    }
}
</style>
