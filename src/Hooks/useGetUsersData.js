import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useGetUserContext } from "./useGetUserContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const useGetUserData = () => {
    const [isError, setError] = useState(null);
    const [isLoading, setLoading] = useState(null);
    const { user, dispatchFromAuth } = useAuthContext();
    const { dispatch } = useGetUserContext();
    const navigate = useNavigate();

    const url = 'http://localhost:5000';

    const getAllUsersData = async (query) => {
        if (!user) {
            return;
        }
        console.log(user.token);
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${url}/getAllSignupUserData/?q=${query}`, {
                'method': 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();

            if (!response.ok && !data) {
                toast.error(data.error);
                setError(data.error);
                return;
            }
            setLoading(false);
            console.log(data);
            dispatch({ type: 'GET_ALL_USERS_DATA', payload: { users: data, isLoading: isLoading, isError: isError } });
        } catch (error) {
            setError(error);
        }
    }

    const getUserData = async (id) => {
        if (!user) {
            return;
        }
        setLoading(true);
        setError(null);
        const response = await fetch(`${url}/getSingleSignupUserData/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        const data = await response.json();
        if (response.ok && data) {
            setLoading(false);
            console.log(data);
            dispatch({ type: 'GET_SINGLE_USER_DATA', payload: { user: data, isLoading: isLoading } });
            return;
        } else {
            setError(data.error);
        }
    }

    const userHandleUpdateClick = async (id, updatedUserData) => {
        if (!user) {
            return;
        }
        setLoading(true);
        setError(null);

        try {
            // Make a PUT request using Axios
            const response = await axios.put(
                `${url}/updateSingleSignupUserData/${id}`,
                updatedUserData, // Send the updated user data as the request body
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            // Check the response status code, Axios handles it automatically
            if (response.status !== 200) {
                toast.error(response.data.error);
                setError(response.data.error);
                setLoading(false);
                return;
            }
            
            setLoading(false);
            getUserData(id);
            let userDetails = {
                user: response.data,
                token:user.token,
                email:user.email,
            }
            dispatch({ type: 'UPDATE_SINGLE_USER_DATA', payload: { user: response.data } });
            dispatchFromAuth({type: 'UPDATE_SINGLE_USER_DATA', payload: userDetails});
            localStorage.setItem('user', JSON.stringify(userDetails));
            navigate('/allSignUpUsers');
        } catch (error) {
            setError("An error occurred while updating the user.");
        }
    };

    const userHandleDeleteClick = async (id) => {
        if (!user) {
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${url}/deleteSingleSignupUserData/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error);
                toast.error(data.error);
                setLoading(false);
                return;
            }
            setLoading(false);
            localStorage.removeItem('user');
            dispatch({ type: 'DELETE_SINGLE_USER_DATA', payload: data });
            dispatchFromAuth({type: 'LOGOUT'});
            toast.success('Your logged out successfull.')
            navigate('/');
        } catch (error) {
            setError("An error occurred while deleting the user.");
        }
    };


    const getAboutUsersData = async () => {
        if (!user) {
            return;
        }
        setLoading(true);
        setError(null);
        const response = await fetch(`${url}/aboutUserDetails`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        const data = await response.json();
        if (response.ok && data) {
            setLoading(false);
            console.log(data);
            dispatch({ type: 'GET_ABOUT_USER_DATA', payload: { users: data } });
            return;
        }
        setError(data.error);
    }

    return { isError, isLoading, getAllUsersData, getAboutUsersData, getUserData, userHandleUpdateClick, userHandleDeleteClick }
}