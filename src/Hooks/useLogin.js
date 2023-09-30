import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUserData } from "./useGetUsersData";

const { useState } = require("react");
const { useAuthContext } = require("./useAuthContext");

export const useLogin = () => {
    const [isError, setError] = useState(null);
    const [isLoggedIn, setIsLoading] = useState(null);
    const {dispatchFromAuth} = useAuthContext();
    const {getAllUsersData} = useGetUserData();
    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:5000/login', {
            method: "POST",
            headers: { 
                "Content-type": "application/json",
            },
            body: JSON.stringify({email, password})
        });
        // console.log(response);

        const json = await response.json();
        // console.log(json);

        if(!response.ok){
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
        getAllUsersData();
        toast.success(json.success);
        navigate('/home');

    }

    return {login, isError, isLoggedIn};
}