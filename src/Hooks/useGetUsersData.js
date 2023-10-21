import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useGetUserContext } from "./useGetUserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxios } from "../Contexts/useAxios";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { 
    getAllUsersStart, 
    getAllUsersSuccess, 
    getAllUsersFailure,
    getSingleUserStart,
    getSingleUserSuccess,
    getSingleUserFailure,
    getUpdateUserStart,
    getUpdateUserSuccess,
    getUpdateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
} from "../Redux/slices/getAllUsersSlice";
import {loginUserUpdateSuccess, logoutSuccess} from '../Redux/slices/authSlice';


export const useGetUserData = () => {
    const [isError, setError] = useState(null);
    const [isLoading, setLoading] = useState(null);
    const { dispatchFromAuth } = useAuthContext();
    const navigate = useNavigate();
    const useAxiosApi = useAxios();
    const { dispatch } = useGetUserContext();

    const currUser = useSelector(state => state.login);
    const {user, token} = currUser.user;
    const userDispatch = useDispatch();

    const getAllUsersData = async (query) => {
    
        userDispatch(getAllUsersStart());

        try {
            const response = await useAxiosApi.get(`/getAllSignupUserData/?q=${query}`);
            const data = response.data;
            if (response.status !== 200 || data.length == 0) {
                toast.error(data.error);
                userDispatch(getAllUsersFailure(data.error));
                return;
            }
            userDispatch(getAllUsersSuccess(data));
            // dispatch({ type: 'GET_ALL_USERS_DATA', payload: { users: data, isLoading: isLoading, isError: isError } });
        } catch (error) {
            userDispatch(getAllUsersFailure());
        }
    }

    const getUserData = async (id) => {
        if (!user) {
            return;
        }
        userDispatch(getSingleUserStart());
        const response = await useAxiosApi.get(`/getSingleSignupUserData/${id}`);

        const data = response.data;
        if (response.status == 200) {
            userDispatch(getSingleUserSuccess(data));
            // dispatch({ type: 'GET_SINGLE_USER_DATA', payload: { user: data, isLoading: isLoading } });
            return;
        } else {
            toast.error(data.error);
            userDispatch(getSingleUserFailure(data.error));
        }
    }

    const userHandleUpdateClick = async (id, updatedUserData) => {
        if (!user) {
            return;
        }
        userDispatch(getUpdateUserStart());
        try {
            // Make a PUT request using Axios
            const response = await axios.put(`https://mern-server-k0zl.onrender.com/api/updateSingleSignupUserData/${id}`, updatedUserData, {
                    headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                    }
                });

            // Check the response status code, Axios handles it automatically
            if (response.status !== 200) {
                toast.error(response.data.error);
                userDispatch(getUpdateUserFailure(response.data.error));
                return;
            }
            
            getUserData(id);
            // let userDetails = {
            //     user: response.data,
            //     token: token,
            //     email:user.email,
            // }
            userDispatch(getUpdateUserSuccess(response.data));
            userDispatch(loginUserUpdateSuccess(response.data));
            // dispatch({ type: 'UPDATE_SINGLE_USER_DATA', payload: { user: response.data } });
            // dispatchFromAuth({type: 'UPDATE_SINGLE_USER_DATA', payload: userDetails});
            // localStorage.setItem('user', JSON.stringify(userDetails));
            navigate('/allSignUpUsers');
        } catch (error) {
            userDispatch(getUpdateUserFailure(error.response.data.error));
        }
    };

    const userHandleDeleteClick = async (id) => {
        if (!user) {
            return;
        }
        userDispatch(deleteUserStart());
        try {
            const response = await useAxiosApi.delete(`/deleteSingleSignupUserData/${id}`);
            const data = response.data;
            if (response.status !== 200) {
                toast.error(data.error);
                userDispatch(deleteUserFailure(data.error));
                return;
            }
            localStorage.removeItem('user');
            // dispatch({ type: 'DELETE_SINGLE_USER_DATA', payload: data });
            // dispatchFromAuth({type: 'LOGOUT'});
            userDispatch(deleteUserSuccess(data));
            console.log('This is Deleted User', data)
            userDispatch(logoutSuccess());
            toast.success('Your logged out successfully.')
            navigate('/');
        } catch (error) {
            userDispatch(deleteUserFailure(error));
        }

    };


    const getAboutUsersData = async () => {
        if (!user) {
            return;
        }
        setLoading(true);
        setError(null);
        const response = await useAxiosApi.get(`/aboutUserDetails`);

        const data = response.data;
        if (response.status == 200) {
            setLoading(false);
            console.log(data);
            dispatch({ type: 'GET_ABOUT_USER_DATA', payload: { users: data } });
            return;
        }
        setError(data.error);
    }

    return { isError, isLoading, getAllUsersData, getAboutUsersData, getUserData, userHandleUpdateClick, userHandleDeleteClick }
}