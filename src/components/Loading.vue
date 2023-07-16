<template>
    <div  class="loading__container">
      <Spin size="large"></Spin>
    </div>
</template>

<script setup>
import { Spin } from 'ant-design-vue';
</script>

<style scoped>
.loading__container {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: rgba(0,0,0,0.9);
    z-index: 9999;
}
</style>