import axios from "axios";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useSelector } from "react-redux";

export const useAxios = () => {
    // const {user} = useAuthContext();
    const currUser = useSelector(state => state.login);
    const {token, user} = currUser.user;

        const newAxiosInstance = axios.create({
            // baseURL: 'https://mern-server-k0zl.onrender.com/api',
            baseURL: `${process.env.REACT_APP_SERVER_API}`,
            // timeout: 8000,
            headers: user ? {
                'Authorization': `Bearer ${token}`
            } : {"Content-type": "application/json",}
        });
    
    return newAxiosInstance;
}