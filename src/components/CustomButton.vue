<template>
    <button class="button__default" :class="{
        button__outline: outline,
        button__small: small,
        button__large: large,
        button__disabled: disable,
        button__rounded: rounded
    }" @click="$emit('handleClick')">
        <span>
            <slot name="left-icon"></slot>
        </span>
        <span>{{ text }}</span>
        <span>
            <slot name="right-icon"></slot>
        </span>
    </button>
</template>

<script setup>
defineProps({
    primary: Boolean,
    disable: Boolean,
    outline: Boolean,
    rounded: Boolean,
    small: Boolean,
    large: Boolean,
    text: String
})
defineEmits(['handleClick'])
</script>

<style lang="scss" scoped>
.button__default {
    padding: 5px 12px;
    border-radius: 4px;
    background-color: var(--primary-color);
    color: var(--white);
    cursor: pointer;
    border: 1px solid transparent;
    transition: 0.1s all ease-in;

    &:hover {
        background-color: transparent;
        border-color: var(--primary-color);
        color: var(--primary-color);
    }
}

.button__small {
    padding: 2px 10px;
}

.button__large {
    padding: 10px 15px;
}

.button__rounded {
    border-radius: 999px;
}

.button__outline {
    background-color: transparent;
    border-color: var(--primary-color);
    color: var(--primary-color);

    &:hover {
        background-color: var(--primary-color);
        color: var(--white);
    }
}

.button__disabled {
    background-color: var(--disabled-color);
    cursor: not-allowed;
    color: var(--text-color);
    border-color: transparent;

    &:hover {
        background-color: var(--disabled-color);
        color: var(--text-color);
        border-color: transparent;
        opacity: 0.8;
    }
}
</style>