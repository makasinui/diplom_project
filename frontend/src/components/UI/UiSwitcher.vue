<template>
    <label class="checkbox">
        <span class="label" v-if="label">{{ label }}</span>
        <input
            class="checkbox-popular"
            type="checkbox"
            :checked="value"
            @change="(ev) => emit('change', Number(ev.target.checked))"
        />
        <span class="checkbox-switch"></span>
    </label>
</template>

<script setup>
defineProps({ value: Boolean, label: String });
const emit = defineEmits(["change"]);
</script>

<style lang="scss" scoped>
.checkbox {
    display: inline-block;
    height: 28px;
    line-height: 28px;
    margin-right: 10px;
    position: relative;
    vertical-align: middle;
    font-size: 14px;
    user-select: none;

    .label {
        margin-right: 1rem;
    }

    &-popular {
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        z-index: -1;
        opacity: 0;
    }

    &-popular:checked + &-switch {
        background: #9abef7;
    }

    &-popular:checked + &-switch:before {
        background: #3f64ae;
        transform: translateX(18px);
    }

    &-switch {
        display: inline-block;
        width: 36px;
        height: 14px;
        border-radius: 20px;
        position: relative;
        top: 6px;
        vertical-align: top;
        background: #9f9f9f;
        transition: 0.2s;

        &:before {
            content: "";
            display: inline-block;
            width: 20px;
            height: 20px;
            position: absolute;
            top: -3px;
            left: -1px;
            background: #fff;
            border-radius: 50%;
            box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
                0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
            transition: 0.15s;
        }
    }
}
</style>
