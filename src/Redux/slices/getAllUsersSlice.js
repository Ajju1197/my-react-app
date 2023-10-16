import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users:[],
    singleUser:{}, 
    isLoading: null, 
    isError: null,
}

export const getAllUsersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        getAllUsersStart:(state) => {
            state.isLoading=true;
        },
        getAllUsersSuccess:(state, action) => {
            state.users = action.payload;
            state.isLoading = false;
        },
        getAllUsersFailure:(state,action)=>{
            state.isError = action.payload;
            state.isLoading = false;
        },
        getSingleUserStart:(state) => {
            state.isLoading=true;
        },
        getSingleUserSuccess:(state, action) => {
            state.singleUser = action.payload;
            state.isLoading = false;
        },
        getSingleUserFailure:(state,action)=>{
            state.isError = action.payload;
            state.isLoading = false;
        },
        getUpdateUserStart:(state) => {
            state.isLoading=true;
        },
        getUpdateUserSuccess:(state, action) => {
            state.singleUser = action.payload;
            state.isLoading = false;
        },
        getUpdateUserFailure:(state,action)=>{
            state.isError = action.payload;
            state.isLoading = false;
        },
        deleteUserStart:(state) => {
            state.isLoading=true;
        },
        deleteUserSuccess:(state, action) => {
            state.users = state.users.filter((item) => item._id !== action.payload._id);
            state.isLoading = false;
        },
        deleteUserFailure:(state,action)=>{
            state.isError = action.payload;
            state.isLoading = false;
        },
    }
});

export const {
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
} = getAllUsersSlice.actions;

export default getAllUsersSlice.reducer;