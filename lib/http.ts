import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'; // prettier-ignore

export const http = axios.create({
  timeout: 45000,
  headers: {
    "X-AppId": "web",
    "X-AppVersion": "1",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  //   baseURL: process.env.NEXT_PUBLIC_API_URL,
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

http.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError<string>) => {
    if (error.response?.status !== 500) {
      if (error.response?.status === 401) {
        // logout?.();
      }

      return Promise.reject(error?.response?.data);
    }

    if (error.response?.status === 500) {
      return Promise.reject({ message: "Internal server error" });
    }

    return;
  },
);
