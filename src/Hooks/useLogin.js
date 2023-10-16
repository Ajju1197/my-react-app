import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUserData } from "./useGetUsersData";
import { useAxios } from "../Contexts/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { loginFail, loginSuccess, loginStart } from "../Redux/slices/authSlice";

const { useState } = require("react");
const { useAuthContext } = require("./useAuthContext");

export const useLogin = () => {
    // const {dispatchFromAuth} = useAuthContext();
    const {getAllUsersData} = useGetUserData();
    const navigate = useNavigate();
    const axios = useAxios();

    const dispatch = useDispatch();

    const login = async (userDetails) => {
        dispatch(loginStart());

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

            dispatch(loginSuccess({data: json}));
    
            // Update this AuthContext
            // dispatchFromAuth({type: 'LOGIN', payload: {data: json}});
            toast.success(json.success);
            navigate('/home');
        } catch (error) {
            toast.error(error.response.data.error);
            dispatch(loginFail(error.response.data.error));
        }
    }

    return {login};
}