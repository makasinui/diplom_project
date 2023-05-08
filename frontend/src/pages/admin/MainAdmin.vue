<template>
    <Layout page="admin">
        <div class="main-content">
            <SideBar @changeTab="(ev) => tab = ev" />
            <component :is="component" />
        </div>
    </Layout>
</template>

<script setup>
import Layout from '@/components/admin/Layout.vue'
import { computed, ref } from 'vue';
import SideBar from "@/components/admin/SideBar.vue";
import Products from './tabs/Products.vue';
import Users from './tabs/Users.vue';

const tab = ref('Products');

const component = computed(() => {
    if(tab.value === 'Products') 
        return Products;
    return Users;
})
</script>

<style lang="scss">
.admin-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    .main-content {
        height: 100%;
        display: flex;

        @media(max-width: 1000px) {
            flex-direction: column;
        }
    }
    .image-short {
        max-width: 70px;
    }
}
</style>
