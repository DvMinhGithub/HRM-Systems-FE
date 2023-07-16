<template>
    <div class="overview-wrapper">
        <div class="pb-3 font-semibold uppercase">Tổng quan nhân viên</div>
        <div class="flex justify-between">
            <div class="relative flex flex-col rounded w-30">
                <input class="absolute inset-0 z-20 opacity-0 cursor-pointe" type="file" accept="image/*"
                    @change="(event) => handlePreview(event.target.files)" />
                <img :src="previewImages
                        ? previewImages
                        : fallbackToDefaultAvatar(previewImages)
                    " alt="User avatar" class="object-cover w-full h-full" />
                <CameraOutlined class="absolute z-30 flex items-center justify-center opacity-0 hover:opacity-100 bg-avatar" />
            </div>
            <div class="w-65 bg-white-default">
                <div class="mx-auto my-0 w-90">
                    <div class="uppercase fynt-semibold jtstify-between fbex">
                        <div class="py-2 text-base font-semibold">Thông tin nhân viên</div>
                    </div>
                    <div class="flex flex-col my-2">
                        <div class="mb-0 text-base leading-6">Tên nhân viên</div>
                        <input class="w-full px-3 py-1 text-sm border border-gray-300 border-solid rounded-md" v-model="userInfor.username" />
                    </div>
                    <div class="flex flex-col my-2">
                        <div class="mb-0 text-base leading-6">Email</div>
                        <input class="w-full px-3 py-1 text-sm border border-gray-300 border-solid rounded-md" :value="userInfor.email" disabled />
                    </div>
                    <div class="flex flex-col my-2">
                        <div class="mb-0 text-base leading-6">Quyền hạn</div>
                        <input class="w-full px-3 py-1 text-sm border border-gray-300 border-solid rounded-md" :value="userInfor.role" disabled />
                    </div>
                    <div class="flex flex-col my-2">
                        <div class="mb-0 text-base leading-6">Tình trạng hoạt động</div>
                        <input class="w-full px-3 py-1 text-sm border border-gray-300 border-solid rounded-md" :value="userInfor.status" disabled />
                    </div>
                    <div class="flex flex-col my-2">
                        <div class="mb-0 text-base leading-6">Ngày vào làm</div>
                        <input class="w-full px-3 py-1 text-sm border border-gray-300 border-solid rounded-md" :value="removeTimeFromDate(userInfor.createdAt)" disabled />
                    </div>

                    <div class="flex justify-end gap-3 text-base">
                        <button  @click="handleCancel">
                            Huỷ
                        </button>
                        <button  @click="handleUpdateUser">
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { fallbackToDefaultAvatar } from "@/utils"
import { CameraOutlined } from "@ant-design/icons-vue"
import { notification } from "ant-design-vue"
import { ref, reactive } from "vue"
import API from "@/services/request"
import { removeTimeFromDate } from "@/utils"
import { updateUserMutation } from "@/api/user/updateUser"

const id = localStorage.getItem("id")
const images = ref(null)
let previewImages = ref(null)
const { mutate: updateUser } = updateUserMutation()
const userInfor = reactive({
    email: "",
    username: "",
    role: "",
    status: "",
    createdAt: "",
})
const userDetail = async () => {
    try {
        const response = await API.get(`/users/find/${id}`)
        userInfor.username = response.data.data.username
        userInfor.email = response.data.data.email
        userInfor.role = response.data.data.role
        userInfor.status = response.data.data.status
        userInfor.createdAt = response.data.data.createdAt
        images.value = response.data.data.user_avatar
    } catch (error) {
        console.log(error)
    }
}
userDetail()

const handlePreview = (img) => {
    if (!img?.[0]?.type?.includes("image")) {
        notification.error({
            message: "File không đúng định dạng",
        })
        return
    }
    const imgSize = img[0].size
    if (imgSize > 10e6) {
        notification.error({
            message: "Dung lượng của ảnh phải nhỏ hơn 10MB",
        })
        return
    } else {
        images.value = img[0]
        const url = URL.createObjectURL(img[0])
        previewImages.value = url
    }
}
const handleCancel = () => {
    previewImages.value = null
}
const handleUpdateUser = () => {
    const formData = new FormData()
    formData.append("username", userInfor.username)
    formData.append("user_avatar", images.value)
    updateUser(formData)
}
</script>

<style lang="scss" scoped>
.overview-wrapper {
    height: calc(100vh - 105px);
}

.overview__heading {
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 12px;
}

.overview__content {
    display: flex;
    justify-content: space-between;
}

.overview__content-avatar {
    width: 30%;
    max-height: calc(100vh - 200px);
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: 2px -1px 10px -1px rgba(0, 0, 0, 0.75);
    border-radius: 4px;

    .overview__inp-change-avatar {
        position: absolute;
        inset: 0;
        cursor: pointer;
        opacity: 0;
        z-index: 3;
    }

    .avatar__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .avatar__camera {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: clamp(30px, 3vw, 42px);
        z-index: 2;
        opacity: 0;
        transition: 0.15s all ease-in-out;
        background: rgba(0, 0, 0, 0.75);
        color: #fff;
    }

    &:hover {
        .avatar__camera {
            opacity: 1;
        }
    }
}

.overview__content-detail {
    width: 65%;
    background-color: #fff;
}

.overview__content-detail-heading {
    text-transform: uppercase;
    font-weight: 600;
    display: flex;
    justify-content: space-between;

    :nth-child(2) {
        margin-top: 5px;
        cursor: pointer;
    }
}

.overview__content-detail-wrapper {
    margin: 0 auto;
    width: 90%;

    >div {
        margin: 10px 0;
    }

    input {
        width: 100%;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        padding: 4px 11px;
        font-size: 14px;

        &:disabled {
            background: #0000000a;
            color: #cbc5be;
        }
    }
}

.overview__edit {
    display: flex;
    justify-content: flex-end;
    gap: 5px;

    .button__default {
        width: calc(100% / 3 - 10px);
    }
}
</style>
