import { createPinia } from "pinia"
import { createApp } from "vue"

import "@/assets/tailwind.css"
import router from "@/router"
import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.css"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { VueQueryPlugin } from "vue-query"
import App from "./App.vue"
import "./assets/scss/globalStyle.scss"

const app = createApp(App)

const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
}
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(Antd)
app.use(VueQueryPlugin, vueQueryPluginOptions)
app.mount("#app")
