import axios from 'axios';
import { useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { replace, useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ServerUrl,
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Request Interceptor
    const reqInterceptor = axiosInstance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('access_token');
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.email = user?.email;

        return config;
      },
      error => {
        console.log('ReqIntError --> ', error.message);
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    const resInterceptor = axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        console.log('ResIntError --> ', error.message);
        if (error.status === 401 || error.status === 403) {
          logOut();
          navigate('/login', { replace: true });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [user]);

  return axiosInstance;
};

export default useAxiosSecure;
