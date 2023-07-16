import { notification } from "ant-design-vue";
import Cookies from "js-cookie";
import { useMutation } from "vue-query";
import { useRouter } from "vue-router";

import API from "@/services/request";
import { userInforStore } from "@/stores/userInfor";

export const useLoginMutation = () => {
  const { getUserInfor } = userInforStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (body) => API.post(`/auth/login`, body),
    onSuccess: (data) => {
      const {
        email: accountEmail,
        user_avatar: accountAvatar,
        _id,
        username: accountName,
        role: accountRole,
        status: accountStatus,
      } = data.data.data;

      getUserInfor({
        accountEmail,
        accountAvatar,
        accountName,
        accountRole,
        accountStatus,
      });

      localStorage.setItem("id", _id);
      Cookies.set("accessToken", data.data.data.accessToken, {
        path: "/",
        expires: 1,
      });

      router.push("/");
    },
    onError: (error) => {
      console.log(error);
      notification.error({
        message: error.data.message,
      });
    },
  });
};
