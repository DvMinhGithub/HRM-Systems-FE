<template>
    <div class="flex items-center justify-between w-full px-5 py-2 rounded-md bg-white-default mb-7">
        <div class="flex justify-center">
            <HomeIcon :size="20" />
            <span class="ml-2 text-sm">
                {{ breadcrumb }}
            </span>
        </div>
        <div class="flex items-center gap-3 px-5">
            <div class="flex flex-col text-right">
                <div class="text-xl font-medium">{{ accountName }}</div>
                <span class="text-sm text-status">
                    {{ accountStatus === "Active" ? "Đang hoạt động" : "Chưa hoạt động" }}
                </span>
            </div>
            <img :src="fallbackToDefaultAvatar(accountAvatar)" alt="account avatar"
                class="object-cover w-10 rounded-[50%]" />
            <a-dropdown overlayClassName="header__action-dropdown" placement="bottomLeft">
                <a class="ant-dropdown-link" @click.prevent>
                    <EllipsisOutlined />
                </a>
                <template #overlay>
                    <a-menu>
                        <a-menu-item @click="showModal">
                            <a href="javascript:;">Đổi mật khẩu</a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
        <a-modal v-model:visible="visible" title="Đổi mật khẩu" @ok="handleOk" ok-text="Đổi mật khẩu" cancel-text="Huỷ">
            <div>
                <div class="mb-1 font-medium">Mật khẩu cũ</div>
                <CustomInput placeholder="Mật khẩu cũ" type="password" v-model:value="oldPassword" />
                <div class="mb-1 font-medium">Mật khẩu mới</div>
                <CustomInput placeholder="Mật khẩu mới" type="password" v-model:value="newPassword" />
                <div class="mb-1 font-medium">Xác nhận mật khẩu mới</div>
                <CustomInput placeholder="Nhập lại mật khẩu mới" type="password" v-model:value="confirmPassword" />
            </div>
        </a-modal>
    </div>
</template>

<script setup>
import { notification } from "ant-design-vue"
import { storeToRefs } from "pinia"
import { computed, ref } from "vue"
import { useRouter } from "vue-router"

import { useChangePassMutation } from "@/api/auth/changePassword"
import CustomInput from "@/components/CustomInput.vue"
import { userInforStore } from "@/stores/userInfor"
import { convertRouteToVNS, fallbackToDefaultAvatar } from "@/utils/index.js"
import HomeIcon from "./HomeIcon.vue"

const { accountName, accountStatus, accountAvatar } = storeToRefs(
    userInforStore(),
)
const oldPassword = ref("")
const newPassword = ref("")
const confirmPassword = ref("")
const router = useRouter()
const { mutate: changePass } = useChangePassMutation()
const visible = ref(false)

const showModal = () => {
    visible.value = true
}

const handleOk = () => {
    const { valid, errorMessage } = validatePassword(
        oldPassword.value,
        newPassword.value,
        confirmPassword.value,
    )
    if (!valid) {
        notification.error({
            message: errorMessage,
        })
        return
    }
    changePass({
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
    })
}

const breadcrumb = computed(() => {
    const currentPath = router.currentRoute.value.path
    return currentPath === "/"
        ? "   >>  Trang chủ "
        : convertRouteToVNS(currentPath).replace("/", "  >>  ")
})

const validatePassword = (oldPassword, newPassword, confirmPassword) => {
    if (oldPassword === newPassword) {
        return {
            valid: false,
            errorMessage: "Mật khẩu mới phải khác với mật khẩu cũ",
        }
    }
    if (newPassword !== confirmPassword) {
        return {
            valid: false,
            errorMessage: "Mật khẩu mới và mật khẩu xác nhận không khớp",
        }
    }
    if (newPassword?.length < 6) {
        return {
            valid: false,
            errorMessage: "Mật khẩu mới phải ít nhất 6 kí tự",
        }
    }
    return { valid: true }
}
</script>
