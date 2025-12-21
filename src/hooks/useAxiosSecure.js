import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthProvider";

const axiosSecure = axios.create({
    baseURL: "https://y-pink-delta.vercel.app"
});

const useAxiosSecure = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                if (user) {
                    try {
                        const token = await user.getIdToken();
                        config.headers.Authorization = `Bearer ${token}`;
                    } catch (err) {
                        console.error("Error getting token:", err);
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const resInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    console.log("Unauthorized access detected.");
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user]);

    return axiosSecure;
};

export default useAxiosSecure;