<template>
    <div class="toastr" v-show="showNotification">{{ text }}</div>
</template>

<script setup>
import { ref, defineProps, onMounted } from "vue";

const props = defineProps({ text: String });

const showNotification = ref(true);

const hide = () => {
    setTimeout(() => {
        showNotification.value = false;
    }, 5000);
};
onMounted(hide)
</script>

<style lang="scss" scoped>
.toastr {
    transition: 0.5s all;
    z-index: 1;
    width: 350px;
    max-width: 100%;
    max-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #7bae73;
    color: white;
    position: absolute;
    bottom: 0;
    top: 20px;
    left: 0;
    right: 0;
    margin: 0 auto;
}
</style>
