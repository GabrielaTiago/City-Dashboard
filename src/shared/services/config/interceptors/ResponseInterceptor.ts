import { AxiosResponse } from "axios";

export function responseInterceptor(response: AxiosResponse){
  return response;
}