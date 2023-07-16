import { useQuery } from 'vue-query';
import API from '@/services/request';

export const useUserDetail = () => {
  const id = localStorage.getItem('id')
  return useQuery({
    queryKey: ['userDetail', id],
    queryFn: () => API.get(`/users/find/${id}`)
  });
};
