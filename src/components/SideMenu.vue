<template>
    <div class="side__menu-container">
        <img :src="mainLogo" alt="TLU LOGO" class="object-cover mx-auto my-8 w-36" />
        <router-link class="flex items-center py-2 pl-6 mx-2 text-base rounded-lg cursor-pointer" v-for="menu in menuRouter" :key="menu.path" :to="menu.path">
            <!-- Dynamic component -->
            <component :is="menu.pageIcon" class="mr-2"></component>
            <span>{{ menu.label }}</span>
        </router-link>
        <div class="flex items-center gap-2 py-2 pl-6 mx-2 text-base rounded-lg cursor-pointer" @click="handleLogout">
            <ImportOutlined />
            Đăng xuất
        </div>
    </div>
</template>

<script setup>
import Cookie from 'js-cookie'
import { ImportOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router';

import mainLogo from '@/assets/images/dthl_logo.png'
import { menuRouter } from '@/constants/menuItem'

const router = useRouter()

const handleLogout = () => {
    Cookie.remove('accessToken')
    localStorage.clear()
    router.push('/login')
}
</script>

<style lang="scss" scoped>
.side__menu-container {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);

    .side__menu-logo {
        width: 150px;
        height: 150px;
        object-fit: cover;
        margin: 32px auto;
    }

    .side__menu-item {
        padding-left: 24px;
        width: calc(100% - 8px);
        cursor: pointer;
        border-radius: 8px;
        min-height: 40px;
        display: flex;
        align-items: center;
        margin: 0px 4px;

        &:hover {
            background-color: var(--primary-color);
            color: #fff;
        }

        .side__menu-item-icon {
            margin-right: 10px;
        }
    }

    .router-link-exact-active {
        background-color: var(--primary-color);
        color: #fff;
    }

    .log__out-section {
        padding-left: 24px;
        width: calc(100% - 8px);
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        border-radius: 8px;
        margin: 0px 4px 35px;
        min-height: 40px;
        font-size: 15px;

        &:hover {
            background-color: var(--primary-color);
            color: #fff;
        }
    }
}
</style>