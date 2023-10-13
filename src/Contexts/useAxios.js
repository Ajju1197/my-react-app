import axios from "axios";
import { useAuthContext } from "../Hooks/useAuthContext";

export const useAxios = () => {
    const {user} = useAuthContext();

        const newAxiosInstance = axios.create({
            baseURL: 'https://mern-server-k0zl.onrender.com/api',
            // timeout: 8000,
            headers: user ? {'Authorization': `Bearer ${user.token}`} : {"Content-type": "application/json"}
        });
    
    return newAxiosInstance;
}