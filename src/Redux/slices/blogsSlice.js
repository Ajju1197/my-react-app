import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs: [],
    singleBlog:{},
    isError:null,
    isLoading:false,
}

export const blogSlice = createSlice({
    name:'blog',
    initialState,
    reducers:{
        getAllBlogsStart:(state)=>{
            state.isLoading=true;
        },
        getAllBlogsSuccess:(state,action) =>{
            state.blogs = action.payload;
            state.isLoading = false;
        },
        getAllBlogsFailure:(state,action) =>{
            state.isError = action.payload;
            state.isLoading = false;
        },
        getSingleBlogStart:(state)=>{
            state.isLoading = true;
        },
        getSingleBlogSuccess:(state,action) =>{
            state.singleBlog = action.payload;
            state.isLoading = false;
        },
        getSingleBlogFailure:(state,action) =>{
            state.isError = action.payload;
            state.isLoading = false;
        },
        likeBlogSuccess:(state,action) =>{
            state.singleBlog = action.payload;
        },
        likeBlogFailure:(state,action) =>{
            state.isError = action.payload;
        },
        disLikeBlogSuccess:(state,action) =>{
            state.singleBlog = action.payload;
        },
        disLikeBlogFailure:(state,action) =>{
            state.isError = action.payload;
        },
    }

})
export const {
    getAllBlogsStart, 
    getAllBlogsSuccess, 
    getAllBlogsFailure, 
    getSingleBlogStart,
    getSingleBlogSuccess,
    getSingleBlogFailure,
    likeBlogSuccess,
    likeBlogFailure,
    disLikeBlogSuccess,
    disLikeBlogFailure,
} = blogSlice.actions;
export default blogSlice.reducer;