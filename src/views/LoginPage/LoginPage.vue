<template>
  <div class="absolute inset-0 flex items-center justify-center gradient-blue">
    <div class="flex items-center w-[70%] rounded-lg h-[calc(100vh-150px)] shadow-custom">
      <div class="w-1/2 h-full">
        <img
          class="object-cover h-full max-w-full"
          src="../../assets/images/login_bg.jpg"
          alt="Login background" />
      </div>
      <div
        class="flex flex-col items-center justify-center flex-1 h-full px-8 py-4 bg-white">
        <div class="text-3xl font-semibold leading-normal">Chào mừng trở lại</div>
        <div class="text-base italic">Rất vui được gặp lại</div>
        <div class="w-full text-base">
          <span class="block my-3">Email</span>
          <CustomInput
            size="large"
            placeholder="Vui lòng nhập email"
            v-model:value="email" />
          <span class="block my-3">Mật khẩu</span>
          <CustomInput
            size="large"
            type="password"
            placeholder="Vui lòng nhập mật khẩu"
            v-model:value="password" />
          <CustomButton
            large
            @handleClick="handleLogin"
            text="Đăng nhập"
            class="w-full mt-10" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue"

import CustomInput from "@/components/CustomInput.vue"
import CustomButton from "@/components/CustomButton.vue"
import {useLoginMutation} from "@/api/auth/login"

const email = ref("")
const password = ref("")
const {mutate: login} = useLoginMutation()

const handleLogin = () => {
  login({email: email.value, password: password.value})
}
</script>

<style scoped>
.gradient-blue {
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
}
</style>
