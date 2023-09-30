import React, { createContext, useReducer } from 'react'
export const BlogContext = createContext();

const initialState = {
  blogs: [],
  singleBlog:{},
  isError:false,
  isSuccess:false,
  isLoading:null,
}

const blogReducer = (state, action) => {
  switch(action.type){
    case "GET_BLOGS":
      return{
        ...state ,
        blogs : action.payload.blogs,
        isLoading:action.payload.isLoading,
      };
    case "GET_BLOG":
      return{
        ...state ,
        singleBlog : action.payload.blog,
        isLoading: action.payload.isLoading,
      };
    case"ADD_NEW_BLOG":{
      return {
        ...state,
        singleBlog: action.payload.blog,
      }
    };
    case"DELETE_BLOG":{
      return {
        ...state,
        blogs: state.blogs.filter(item => item._id != action.payload._id)
      }
    };
    case"UPDATE_BLOG":{
      return {
        ...state,
        singleBlog: action.payload.blog,
      }
    }
    case"LIKE_BLOG":{
      return {
        ...state,
        singleBlog: action.payload.blog,
        isLoading: action.payload.isLoading,
      }
    }
  }
}

export const BlogContextProvider = ({children}) => {
  const [state, blogDispatch] = useReducer(blogReducer, initialState)
  return (
    <BlogContext.Provider value={{...state, blogDispatch}}>
      {children}
    </BlogContext.Provider>
  )
}