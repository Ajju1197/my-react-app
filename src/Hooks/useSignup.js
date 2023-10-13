import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxios } from "../Contexts/useAxios";

const { useState } = require("react");
const { useAuthContext } = require("./useAuthContext");

export const useSignup = () => {
    const [isError, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatchFromAuth } = useAuthContext();
    const navigate = useNavigate();
    const axios = useAxios();

    const signup = async (user) => {
        setIsLoading(true);
        setError(null);
        try {
            // const response = await axios.post('/signup', user);
            const response = await axios.post('https://mern-server-k0zl.onrender.com/api/signup', user);
                console.log(response);
                if (response.status !== 200) {
                    setIsLoading(false);
                    setError(response.error);
                    toast.error(response.error);
                    return;
                }
                setIsLoading(false);
                // toast.success(json.success);
                navigate('/');
        } catch (error) {
            toast.error(error.response.data.error);
            setIsLoading(false);
        }

    }

    return { signup, isError, isLoading };
}