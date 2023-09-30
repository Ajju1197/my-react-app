import { useContext } from "react";
import { BlogContext } from "../Contexts/blogContext";

export const useBlogContext = () => {
    const context = useContext(BlogContext);

    if(!context) throw Error('useAuthContext must be used inside an AuthContextProvider.');

    return context;
}