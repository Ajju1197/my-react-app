import axios from "axios";
import { useAuthContext } from "../Hooks/useAuthContext";

export const useAxios = () => {
    const {user} = useAuthContext();

    const newAxiosInstance = axios.create({
        baseURL: 'http://localhost:5000',
        timeout: 8000,
        headers:{
            'Authorization': `Bearer ${user.token}`
        }
    })
    return newAxiosInstance;
}