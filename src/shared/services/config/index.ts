import axios from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptors';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

instance.interceptors.response.use(
  (res) => responseInterceptor(res),
  (err) => errorInterceptor(err)
);

export { instance };
