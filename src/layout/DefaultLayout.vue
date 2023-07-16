<template>
  <div class="flex h-screen overflow-hidden">
    <div class="flex-shrink-0 w-1/5 h-full">
      <SideMenu />
    </div>
    <div class="flex-1 h-full pt-4 max-w-4/5 bg-white-500 px-7">
      <Header />
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import SideMenu from "@/components/SideMenu.vue"
import Header from "@/components/Header.vue"
</script>
