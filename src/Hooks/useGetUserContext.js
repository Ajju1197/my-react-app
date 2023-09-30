import { useContext } from "react";
import { GetUsersContext } from "../Contexts/getUsersContext";

export const useGetUserContext = () => {
    const context = useContext(GetUsersContext);

    if(!context){
        throw Error('useGetUserContext must be used inside an AuthContextProvider.');
    }

    return context;
}
