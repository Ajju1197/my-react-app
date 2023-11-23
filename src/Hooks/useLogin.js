import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUserData } from "./useGetUsersData";
import { useAxios } from "../Contexts/useAxios";
import { useDispatch } from "react-redux";
import { loginFail, loginSuccess, loginStart } from "../Redux/slices/authSlice";

export const useLogin = () => {
    const {getAllUsersData} = useGetUserData();
    const navigate = useNavigate();
    const axios = useAxios();

    const dispatch = useDispatch();

    const login = async (userDetails) => {
        dispatch(loginStart());
        
        const {email, password} = userDetails;

        if(!email || !password) {
            dispatch(loginFail());
            return toast.error('All fields are must be filled.');
        };

        try {
            const response = await axios.post('/login', userDetails);

            if(response.status !== 200){
                toast.error(response.error);
                dispatch(loginFail(response.error));
                return;
            }
            
            const json = response.data;

            // save the user to local storage.
            localStorage.setItem('user', JSON.stringify(json));
            localStorage.setItem('token', json.token);
            localStorage.setItem('tokenExpiresAt', json.expiresAt);

            dispatch(loginSuccess({data: json}));
    
            // Update this AuthContext
            // dispatchFromAuth({type: 'LOGIN', payload: {data: json}});
            toast.success(json.success);
            navigate('/home');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
            dispatch(loginFail(error.response.data.error));
        }
    }

    return {login};
}