<template>
    <div v-if="show" class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header"></slot>
                    <span @click="emit('close')" class="x-icon">x</span>
                </div>

                <div class="modal-body">
                    <slot name="body"></slot>
                </div>

                <div class="modal-footer">
                    <ui-button
                        class="modal-save-button"
                        @click="
                            () => {
                                emit('close');
                                emit('save');
                            }
                        "
                    >
                        Сохранить
                    </ui-button>
                    <ui-button
                        class="modal-close-button"
                        @click="emit('close')"
                    >
                        Выйти
                    </ui-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    show: Boolean,
});
const emit = defineEmits(["close", "save"]);
</script>

<style lang="scss">
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    max-width: 500px;
    width: 100%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;

    @media screen and (max-width: 560px) {
        max-width: 240px;
    }

}

.modal-header {
    .x-icon {
        float: right;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
    }
}

.modal-body {
    margin: 20px 0;
}

.modal-footer {
    display: flex;
    gap: 20px;
    justify-content: center;

    .modal-close-button {
        background: #4d4d4d;
    }

    .modal-save-button {
        background: #3f64ae;
    }
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
