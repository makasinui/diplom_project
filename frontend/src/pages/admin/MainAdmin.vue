<template>
    <Layout page="admin">
        <Table :columns="['ID', 'ID', 'ID']" :rows="[['1', '1', '1'], ['2', '3', '4']]" />
    </Layout>
</template>

<script setup>
import Layout from '@/components/admin/Layout.vue'
import Table from '@/components/admin/Table.vue';
</script>

<style>

</style>
