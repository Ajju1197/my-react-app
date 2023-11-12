import { useState } from "react";
import { useBlogContext } from "./useBlogContext";
import { useAxios } from "../Contexts/useAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { 
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
} from "../Redux/slices/blogsSlice";

import {getCommentStart, getCommentSuccess, getCommentFail} from '../Redux/slices/commentBlogSlice'
import { useDispatch } from "react-redux";



export const useGetBlogData = () => {
    const {blogDispatch} = useBlogContext();
    const [isBlogLoading, setLoading] = useState(false);
    const newAxiosInstance = useAxios();
    const navigate = useNavigate();
    const disPatch = useDispatch();

    const getAllBlogs = async (query) => {
        disPatch(getAllBlogsStart());
        try {
            const response = await newAxiosInstance.get(`/getAllBlogs/?blog=${query}`);
            if(response.status !== 200){
                disPatch(getAllBlogsFailure());
                toast.error(response.data);
                return; 
            };
            console.log(response)
            blogDispatch({type:'GET_BLOGS', payload: {blogs: response.data, isLoading: isBlogLoading}});
            disPatch(getAllBlogsSuccess(response.data));
            
        } catch (error) {
            toast.error(error);
            disPatch(getAllBlogsFailure(error));
        }
    }

    const getSingleBlog = async (id) => {
        disPatch(getSingleBlogStart());
        try {
            const response = await newAxiosInstance.get(`/getSingleBlog/${id}`);
            if(response.status !== 200){
                disPatch(getSingleBlogFailure(response.data));
                toast.error(response.data);
                return; 
            };
            setLoading(false);
            
            blogDispatch({type:'GET_BLOG', payload: {blog: response.data, isLoading: isBlogLoading}});
            disPatch(getSingleBlogSuccess(response.data));
            getComments(id);
        } catch (error) {
            toast.error(error);
            disPatch(getSingleBlogFailure(error));
        }
    }

    const postBlogs = async (data) => {
        setLoading(true);
        try {
            const response = await newAxiosInstance.post(`/postBlog`, data);
            if(response.status !== 200 || data.length == 0){
                setLoading(false);
                toast.error(response.data);
                return; 
            };
            setLoading(false);
            toast.success('Blog is Posted successfully.');
            blogDispatch({type:'ADD_NEW_BLOG', payload: {blog: response.data, isLoading: isBlogLoading}});
            // navigate('/blogs');
        } catch (error) {
            toast.error(error);
        }
    }

    const updateBlog = async (id, data) => {
        setLoading(true);
        try {
            const response = await newAxiosInstance.put(`/updateBlog/${id}`, data);
            if(response.status !== 200 || response.data.length == 0){
                setLoading(false);
                toast.error(response.data);
                return; 
            };
            setLoading(false);
            toast.success('Blog is Updated successfully.');
            blogDispatch({type:'UPDATE_BLOG', payload: {blog: response.data, isLoading: isBlogLoading}});
            navigate('/blogs');
        } catch (error) {
            toast.error(error);
        }
    }

    const likeBlog = async (id) => {
        try {
            const response = await newAxiosInstance.put(`/likeBlog/${id}`);
            if(response.status !== 200 || response.data.length == 0){
                disPatch(likeBlogFailure(response.data));
                toast.error(response.data);
                return; 
            };
            disPatch(likeBlogSuccess(response.data.updatedBlog));
            blogDispatch({type:'LIKE_BLOG', payload: {blog: response.data.updatedBlog, isLoading: isBlogLoading}});
            toast.success(response.data.success);
        } catch (error) {
            toast.error(error);
            disPatch(likeBlogFailure(error));
        }
    }

    const disLikeBlog = async (id) => {
        try {
            const response = await newAxiosInstance.put(`/disLikeBlog/${id}`);
            if(response.status !== 200 || response.data.length == 0){
                disPatch(disLikeBlogFailure(response.data));
                toast.error(response.data);
                return;
            };
            disPatch(disLikeBlogSuccess(response.data.updatedBlog));
            toast.success(response.data.success);
            blogDispatch({type:'LIKE_BLOG', payload: {blog: response.data.updatedBlog, isLoading: isBlogLoading}});
        } catch (error) {
            toast.error(error);
            disPatch(disLikeBlogFailure(error));
        }
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    }

    const commentOnBlog = async (commentData) => {
        try {
            const response = await newAxiosInstance.post('/addComment', commentData);
            console.log(response.data)
            getComments(response.data.blogId);
        } catch (error) {
            console.log(error);
        }
    }

    const getComments = async (blogId) => {
        try {
            disPatch(getCommentStart());
            const response = await newAxiosInstance.get(`/getBlogComment/${blogId}`);
            disPatch(getCommentSuccess(response.data));
        } catch (error) {
            console.log(error)
            disPatch(getCommentFail(error))
        }
    }

    return {getAllBlogs, getSingleBlog, postBlogs, updateBlog, formatDate, likeBlog, disLikeBlog, commentOnBlog};
}