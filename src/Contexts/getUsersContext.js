import { createContext, useReducer } from 'react';

export const GetUsersContext = createContext();

export const getUsersReducer = (state, action) => {
    switch (action.type) {
        
        case 'GET_ABOUT_USER_DATA':
            return {
                ...state, 
                users : action.payload.users,
            }
        case 'GET_ALL_USERS_DATA':
            return {
                ...state, 
                users : action.payload.users,
                isLoading:action.payload.isLoading,
                error: action.payload.error,
            }
        case 'GET_SINGLE_USER_DATA':
            return {
                ...state, 
                singleUser : action.payload.user,
                isLoading: action.payload.isLoading,
            }
        case 'UPDATE_SINGLE_USER_DATA':
            return {
                ...state, 
                singleUser : action.payload.user}
        case 'DELETE_SINGLE_USER_DATA':
            return {
                ...state, 
                users : state.users.filter(eachId => eachId._id !== action.payload._id)}
        default:
            return state;
    }
}

export const GetUsersContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(getUsersReducer, {
        users:[],
        singleUser:{}, 
        isLoading: null, 
        isError: null,
    });

    return(
        <GetUsersContext.Provider value={{...state, dispatch}}>
            {children}
        </GetUsersContext.Provider>
    )

};