import { AxiosError } from 'axios';

export function errorInterceptor(error: AxiosError){
  if(error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão. Verifique se você está conectado à internet'));
  }

  if(error.response?.status === 404){
     return Promise.reject(new Error('Não encontrado :('));
  }

  return Promise.reject(error);
};
