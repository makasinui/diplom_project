<template>
    <div class="ui-input__wrapper">
        <label class="ui-label" v-if="label">{{ label }}</label>
        <div class="ui-required" v-if="required">*</div>
        <input
            @change="onChange($event.target.value)"
            class="ui-input"
            :type="type"
            :max="max"
            :min="min"
        />
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const max = ref();
const min = ref();
const requiredAlias = ref();

const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    label: String,
    required: Boolean,
    value: String,
    rules: Object,
});
const emit = defineEmits(["update:modelValue", "error"]);

function onChange(val) {
    if (val.length > max) {
        emit("error", "Превышено максимально допустимое кол-во символов!");
        return;
    }

    if (val.length < min) {
        emit("error", `Минимальное кол-во символов: ${min.value}`);
        return;
    }

    if (requiredAlias.value && val.indexOf("@") === -1) {
        emit("error", "Неправильно указан email");
        return;
    }

    emit("update:modelValue", val);
}

function customValidation() {
    if (props.rules?.max) {
        max.value = rules.max;
    }

    if (props.rules?.min) {
        min.value = rules.min;
    }

    if (props.rules?.email) {
        requiredAlias.value = true;
    }
}

onMounted(customValidation)
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
