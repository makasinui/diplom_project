<template>
    <div class="ui-input__wrapper">
        <label class="ui-label" v-if="label">{{ label }}</label>
        <div class="ui-required" v-if="required">*</div>
        <input
            @change="emit('update:modelValue', $event.target.value)"
            class="ui-input"
            :type="type"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    label: String,
    required: Boolean,
    value: String,
});
const emit = defineEmits("update:modelValue");
</script>

<style lang="scss" scoped>
.ui {
    &-input__wrapper {
        position: relative;
        max-width: fit-content;
        display: flex;
        flex-direction: column;
    }
    &-label {
    }
    &-input {
        max-width: 300px;
        padding: 6px;
        border: 1px solid black;
        border-radius: 2px;

        &:hover {
            border: 1px solid green;
        }
    }
    &-required {
        color: red;
        border-radius: 50%;
        position: absolute;
        right: -5px;
        font-size: 20px;
        top: 6px;
        z-index: 1;
    }
}
</style>
