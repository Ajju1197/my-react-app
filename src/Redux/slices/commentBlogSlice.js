import { createSlice } from "@reduxjs/toolkit";

export const commentBlogSlice = createSlice({
    name:'comment',
    initialState:{
        comments:[],
        loading:false,
        error:null
    },
    reducers:{
        getCommentStart: function(state, action){
            state.loading=true;
        },
        getCommentSuccess: function(state, action){
            state.comments = action.payload;
            state.loading=false;
        },
        getCommentFail: function(state, action){
            state.loading=false;
            state.error=action.payload;
        },
    }
});

export const {getCommentStart, getCommentSuccess, getCommentFail} = commentBlogSlice.actions;
export default commentBlogSlice.reducer;
