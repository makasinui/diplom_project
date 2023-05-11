<template>
    <div class="actioncell">
        <ui-button @click="emit('edit')" className="actioncell-btn__primary">
            <img class="small-icon" :src="penIcon" alt="Редактировать">
        </ui-button>
        <ui-button @click="emit('delete')" className="actioncell-btn__primary delete">
            <img class="small-icon" :src="trashIcon" alt="Удалить">
        </ui-button>
    </div>
</template>

<script setup>
import trashIcon from '@/assets/img/trash.png';
import penIcon from '@/assets/img/pen.png';

const emit = defineEmits(['edit', 'delete'])
</script>

<style lang="scss">
.actioncell {
    display: flex;
    justify-content: space-evenly;
    &-btn__primary {
        background: #3f64ae;

        &.delete {
            background: #d71515;
        }
    }
}

</style>