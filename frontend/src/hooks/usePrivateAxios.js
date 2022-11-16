import axios from "axios";
import { useEffect } from "react";
import useRefresh from "./useRefresh";
import useAuth from "./useAuth";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const usePrivateAxios = () => {
  const refresh = useRefresh();
  const { auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      async (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config;
        if (err.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const accessToken = await refresh();
          axiosPrivate.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          return axiosPrivate(originalRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default usePrivateAxios;
