import axios from "axios"

export const AxiosService = () => {
    const axiosInstance =  axios.create({
        timeout: 500,
        withCredentials: true,
        headers: { Authorization: `'Bearer ${localStorage.getItem("token")}` },
    });

    axiosInstance.interceptors.request.use(
        config => {
            config.headers['Authorization'] = `'Bearer ${localStorage.getItem("token")}`;
            return config
        },
        error => {
            Promise.reject(error)
        }
    )

    return axiosInstance
}