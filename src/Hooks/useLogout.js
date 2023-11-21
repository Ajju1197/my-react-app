import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";
import { useAxios } from "../Contexts/useAxios";
import { useGetUserData } from "./useGetUsersData";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../Redux/slices/authSlice";

export const useLogout = () => {
    // const { dispatchFromAuth } = useAuthContext();
    const navigate = useNavigate();
    const {getAllUsersData} = useGetUserData();
    const axios = useAxios();

    const currUser = useSelector(state => state.login);
    const {user} = currUser.user;

    const dispatch = useDispatch();
    
    const logout = async () => {
        
        await axios.put('/logout', {
            isActive: false,
            userId: user ? user._id : '',
        });
        // remove user from storage.
        localStorage.removeItem('user');
        // dispatchFromAuth({type: 'LOGOUT'});
        dispatch(logoutSuccess());
        getAllUsersData();
        toast.success('Your logged out successfully.');
        navigate('/');
        
    }

    return {logout};
}