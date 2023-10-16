import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:[],
    isLoading:null,
    isError:null,
}
export const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        loginStart: (state, action) => {
            state.isLoading = true;
        },
        loginSuccess:(state, action) => {
            state.user = action.payload.data;
            state.isLoading = false;
        },
        loginFail:(state, action) => {
            state.isError = action.payload;
            state.isLoading = false;
        },
        logoutSuccess:(state, action) => {
            state.user = [];
            state.isLoading = null;
            state.isError = null;
        },
        loginUserUpdateSuccess:(state, action) => {
            state.user.user = action.payload;
            state.isLoading = false;
        }
    }
});

export const {loginStart, loginSuccess, loginFail, logoutSuccess, loginUserUpdateSuccess} = loginSlice.actions;
export default loginSlice.reducer;

