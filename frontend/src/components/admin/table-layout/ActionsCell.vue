<template>
    <div class="actioncell">
        <ui-button v-if="!hideEdit" @click="emit('edit')" className="actioncell-btn__primary">
            <img class="small-icon" :src="penIcon" alt="Редактировать">
        </ui-button>
        <ui-button :disabled="disableDelete" @click="emit('delete')" className="actioncell-btn__primary delete">
            <img class="small-icon" :src="trashIcon" alt="Удалить">
        </ui-button>
    </div>
</template>

<script setup>
import trashIcon from '@/assets/img/trash.png';
import penIcon from '@/assets/img/pen.png';

defineProps({
    hideEdit: {
        type: Boolean,
        required: false,
        default: false
    },
    disableDelete: {
        type: Boolean,
        required: false,
        default: false
    }
})
const emit = defineEmits(['edit', 'delete'])
</script>

<style lang="scss">
.actioncell {
    display: flex;
    justify-content: space-evenly;
    &-btn__primary {
        background: #3f64ae;
        padding: 2px 5px !important;

        &.delete {
            background: #d71515;
        }

        &.disabled {
            opacity: 0.5;
        }
        &:hover {
            opacity: 0.5;
        }
    }
}

</style>