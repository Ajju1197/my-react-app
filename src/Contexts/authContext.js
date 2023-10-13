import { createContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user : action.payload.data,
                isLoading: action.payload.isLoading,
            }
        case 'UPDATE_SINGLE_USER_DATA':
            return {user : action.payload}
        case 'LOGOUT':
            return {user : null}   
        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {

    const [state, dispatchFromAuth] = useReducer(authReducer, {
        user: null,
        isLoading:null,
    });

    console.log('this is from Auth context' + JSON.stringify(state.user));

    useEffect(() => {
        const userObj = JSON.parse(localStorage.getItem('user'));

        if(userObj){
            dispatchFromAuth({type:'LOGIN',payload: userObj});
        }
    },[]);


    return (
        <AuthContext.Provider value={{...state, dispatchFromAuth}}>
            {children}
        </AuthContext.Provider>
    )
}