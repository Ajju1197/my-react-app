import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxios } from "../Contexts/useAxios";

const { useState } = require("react");
const { useAuthContext } = require("./useAuthContext");

export const useSignup = () => {
    const [isError, setError] = useState(null);
    const [isLoggedIn, setIsLoading] = useState(null);
    const { dispatchFromAuth } = useAuthContext();
    const navigate = useNavigate();
    const axios = useAxios();

    const signup = async (user) => {
        setIsLoading(true);
        setError(null);

        await axios.post('/signup', user)
        .then(res => {
            const json = res.data;
            console.log(res);
            console.log('This is signup response' + JSON.stringify(json));
    
    
            if (res.statusText != 'OK') {
                setIsLoading(false);
                setError(res.error);
                toast.error(json.error);
                return;
            }
    
            // Update this AuthContext
            // dispatch({ type: 'LOGIN', payload: json.user });
            setIsLoading(false);
            toast.success(json.success);
            navigate('/');
        })
        .catch(err => {
            toast.error(err);
        });

        // const json = await response.json();

    }

    return { signup, isError, isLoggedIn };
}