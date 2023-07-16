<template>
    <div class="custom__input-container input__search">
        <a-input-password v-if="type === 'password'" :value="value" :placeholder="placeholder" :size="size"
            @change="$emit('update:value', $event.target.value)" />
        <a-input-search v-else-if="type === 'search'" :value="value" :placeholder="placeholder" :size="size"
            @change="$emit('update:value', $event.target.value)" />
        <a-input v-else :value="value" :placeholder="placeholder" :size="size"
            @change="$emit('update:value', $event.target.value)" />
    </div>
</template>

<script setup>
defineProps({
    type: String,
    placeholder: String,
    value: String,
    size: String
})
defineEmits(['update:value'])
</script>

<style scoped lang="scss">
.custom__input-container {
    input {
        border-color: #555;
        font-family: inherit;

        &::placeholder {
            font-family: inherit;
            font-size: 14px;
        }
    }
}

.input__search {
    .ant-input-search-button {
        border-color: #555;
    }
}
</style>