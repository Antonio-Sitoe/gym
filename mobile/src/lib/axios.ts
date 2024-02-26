import { AppError } from "@/utlis/AppError";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.18.37:3333",
});

api.interceptors.request.use(
  (response) => {
    console.log("INTERCEPTOR", response);
    return response;
  },
  (error) => {
    if (error?.response && error?.response?.data) {
      return Promise.reject(new AppError(error.response.data.message));
    }
    return Promise.reject('Erro no servidor tente novamente mais tarde');
  }
);

export { api };
