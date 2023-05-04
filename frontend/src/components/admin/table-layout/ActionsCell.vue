<template>
    <div class="actioncell">
        <ui-button @click="emit('edit')" className="actioncell-btn__primary">
            E
        </ui-button>
        <ui-button @click="emit('delete')" className="actioncell-btn__primary">
            D
        </ui-button>
    </div>
</template>

<script setup>
const emit = defineEmits(['edit', 'delete'])
</script>

<style lang="scss">
.actioncell {
    display: flex;
    justify-content: space-evenly;
    &-btn__primary {
        background: #3f64ae;
    }
}

</style>