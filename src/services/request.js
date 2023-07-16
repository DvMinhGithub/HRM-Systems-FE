import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
  baseURL: 'http://localhost:8001/api/v1',
  headers: { Accept: 'application/json' }
});

API.interceptors.request.use(
  config => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 403) {
      const refreshToken = Cookies.get('refreshToken');
      if (refreshToken) {
        try {
          const resp = await API.post('/customers/refreshToken', { refreshToken });
          Cookies.set('accessToken', resp.data.accessToken, { path: '/', expires: 1 });
          Cookies.set('refreshToken', resp.data.refreshToken, { path: '/', expires: 1 });
          originalRequest.headers.Authorization = `Bearer ${resp.data.accessToken}`;
          return API(originalRequest);
        } catch (refreshError) {
          Cookies.remove('accessToken');
        }
      } else {
        Cookies.remove('accessToken');
      }
    }
    return Promise.reject(error.response);
  }
);

export default API;
