import { useMutation } from 'vue-query';
import { notification } from 'ant-design-vue';

import API from '@/services/request';

export const useChangePassMutation = () => {
  const id = localStorage.getItem('id')
  return useMutation({
    mutationFn: body => API.put(`/users/change-password/${id}`, body),
    onSuccess: () => {
      notification.success({
        message: 'Đổi mật khẩu thành công'
      });
    },
    onError: () => {
      notification.error({
        message: 'Đổi mật khẩu thất bại'
      });
    }
  });
};
