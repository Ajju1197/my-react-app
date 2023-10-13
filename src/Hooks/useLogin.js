import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUserData } from "./useGetUsersData";
import { useAxios } from "../Contexts/useAxios";

const { useState } = require("react");
const { useAuthContext } = require("./useAuthContext");

export const useLogin = () => {
    const [isError, setError] = useState(null);
    const [isLoggedIn, setIsLoading] = useState(null);
    const {dispatchFromAuth} = useAuthContext();
    const {getAllUsersData} = useGetUserData();
    const navigate = useNavigate();
    const axios = useAxios();

    const login = async (userDetails) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('/login', userDetails);
    
            if(response.status !== 200){
                setIsLoading(false);
                setError(response.error);
                toast.error(response.error);
                return;
            }
            
            const json = response.data;
            // save the user to local storage.
            localStorage.setItem('user', JSON.stringify(json));
    
            console.log(json + 'this is from Login hook');
    
            // Update this AuthContext
            dispatchFromAuth({type: 'LOGIN', payload: json});
            setIsLoading(false);
            // getAllUsersData();
            toast.success(json.success);
            navigate('/home');
        } catch (error) {
            toast.error(error.response.data.error);
        }


    }

    return {login, isError, isLoggedIn};
}