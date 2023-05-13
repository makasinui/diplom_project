<template>
    <div class="ui-input__wrapper">
        <label class="ui-label" v-if="label">{{ label }}</label>
        <div class="ui-required" v-if="required">*</div>
        <input
            @change="onChange($event.target.value)"
            class="ui-input"
            :type="type"
            :maxlength="max"
            :minlength="min"
            :value="modelValue"
            :autocomplete="type === 'password' ? 'on' : ''"
            v-if="!textArea"
        />
        <textarea
            v-else
            rows="5"
            @change="onChange($event.target.value)"
            cols="22"
            :maxlength="max"
            :minlength="min"
            :value="modelValue"
        />
        <span class="ui-error">{{ errorMessage }}</span>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const max = ref();
const min = ref();
const requiredAlias = ref();
const errorMessage = ref();

const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    label: String,
    required: Boolean,
    value: String,
    rules: Object,
    modelValue: String,
    textArea: Boolean,
});
const emit = defineEmits(["update:modelValue", "error"]);

function onChange(val) {
    emit("update:modelValue", val);
    if (val.length > max.value) {
        errorMessage.value =
            "Превышено максимально допустимое кол-во символов!";
        emit("error", errorMessage.value);
        return;
    }

    if (val.length < min.value) {
        errorMessage.value = `Минимальное кол-во символов: ${min.value}`;
        emit("error", errorMessage.value);
        return;
    }

    if (requiredAlias.value && val.indexOf("@") === -1) {
        errorMessage.value = "Неправильно указан email";
        emit("error", errorMessage.value);
        return;
    }
    errorMessage.value = "";
    emit("error", errorMessage.value);
}

function customValidation() {
    if (props.rules?.max) {
        max.value = props.rules.max;
    }

    if (props.rules?.min) {
        min.value = props.rules.min;
    }

    if (props.rules?.email) {
        requiredAlias.value = true;
    }
}

onMounted(customValidation);
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
    &-error {
        color: red;
        font-size: 10px;
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
