import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";
import { useAxios } from "../Contexts/useAxios";
import axios from "axios";
import { useGetUserData } from "./useGetUsersData";

export const useLogout = () => {
    const {dispatchFromAuth, user} = useAuthContext();
    const navigate = useNavigate();
    const {getAllUsersData} = useGetUserData();
    
    // const axios = useAxios();
    const logout = async () => {
        await axios.put('/logout', {
            isActive: false,
            userId:user.user._id,
        });
        // remove user from storage.
        localStorage.removeItem('user');
        dispatchFromAuth({type: 'LOGOUT'});
        getAllUsersData();
        toast.success('Your logged out successfull.');
        navigate('/');
        
    }

    return {logout};
}