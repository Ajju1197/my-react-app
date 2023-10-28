import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxios } from "../Contexts/useAxios";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
    signUpStart,
    signUpSuccess,
    signUpFailure,
} from '../Redux/slices/authSlice'

export const useSignup = () => {
    const navigate = useNavigate();
    // const axios = useAxios();

    const dispatch = useDispatch();

    const signup = async (user) => {

        console.log('This is from singup first', user);
        try {
            dispatch(signUpStart());
            const response = await axios.post(`${process.env.REACT_APP_SERVER_API}/signup`, user, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status !== 200) {
                dispatch(signUpFailure(response.error));
                toast.error(response.error);
                return;
            }
            dispatch(signUpSuccess());
            console.log('This is from signup ', response)
            toast.success(response.data.success);
            navigate('/');
        } catch (error) {
                toast.error(error.response.data.error);
                dispatch(signUpFailure(error.response.data.error));
        }

    }

    return { signup };
}