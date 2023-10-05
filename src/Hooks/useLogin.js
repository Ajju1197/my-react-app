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

        const response = await axios.post('/login', userDetails);

        const json = await response.data;

        if(response.status !== 200){
            setIsLoading(false);
            setError(json.error);
            toast.error(json.error);
            return;
        }

        // save the user to local storage.
        localStorage.setItem('user', JSON.stringify(json));

        console.log(json + 'this is from Login hook');

        // Update this AuthContext
        dispatchFromAuth({type: 'LOGIN', payload: json});
        setIsLoading(false);
        // getAllUsersData();
        toast.success(json.success);
        navigate('/home');

    }

    return {login, isError, isLoggedIn};
}