import { useMutation } from 'vue-query';
import { notification } from 'ant-design-vue';

import API from '@/services/request';

export const updateUserMutation = () => {
  const id = localStorage.getItem('id')
  return useMutation({
    mutationFn: body => API.put(`/users/${id}`, body),
    onSuccess: () => {
      notification.success({
        message: 'Cập nhật thông tin thành công'
      });
    },
    onError: () => {
      notification.error({
        message: 'Cập nhật thông tin thất bại'
      });
    }
  });
};
