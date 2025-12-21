import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthProvider";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000"
});

const useAxiosSecure = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // 1. Request Interceptor
        const reqInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                // Fetch the token dynamically for every request
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

        // 2. Response Interceptor (Optional: handles 401/403 logouts)
        const resInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    // You could call logOut() here if you pass it into the hook
                    console.log("Unauthorized access detected.");
                }
                return Promise.reject(error);
            }
        );

        // Cleanup
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user]);

    return axiosSecure;
};

export default useAxiosSecure;