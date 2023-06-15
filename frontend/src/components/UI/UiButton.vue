<template>
    <button
        @click="emit('click')"
        :disabled="disabled"
        :class="[
            'button',
            className,
            bold ? 'bold' : '',
            green && 'green',
            blue && 'blue',
            disabled && 'disabled'
        ]"
    >
        <slot></slot>
    </button>
</template>

<script setup>
const emit = defineEmits(["click"]);
defineProps({
    className: String,
    bold: Boolean,
    green: Boolean,
    blue: Boolean,
    disabled: {
        type: Boolean,
        required: false
    }
});
</script>

<style lang="scss" scoped>
.button {
    height: 35px;
    font-size: 16px;
    border: none;
    display: flex;
    justify-content: center;
    color: white;
    align-items: center;
    padding: 0 25px;
    cursor: pointer;

    &.bold {
        font-weight: bold;
    }

    &.green {
        background: green;
    }

    &.blue {
        background: #3f64ae;
    }

    &:hover {
        opacity: 0.8;
    }

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 0 10px;
    }
}
</style>
