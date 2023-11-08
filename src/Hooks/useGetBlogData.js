import { useState } from "react";
import { useBlogContext } from "./useBlogContext";
import { useAxios } from "../Contexts/useAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const useGetBlogData = () => {
    const {blogDispatch} = useBlogContext();
    const [isLoading, setLoading] = useState(false);
    const newAxiosInstance = useAxios();
    const navigate = useNavigate();

    const getAllBlogs = async (query) => {
        setLoading(true);
        try {
            const response = await newAxiosInstance.get(`/getAllBlogs/?blog=${query}`);
            if(response.status !== 200){
                setLoading(false);
                toast.error(response.data);
                return; 
            };
            console.log(response)
            blogDispatch({type:'GET_BLOGS', payload: {blogs: response.data, isLoading: isLoading}});
            // toast.success('All blogs are fetched successfully.');
            setLoading(false);

        } catch (error) {
            toast.error(error);
        }
    }

    const getSingleBlog = async (id) => {
        setLoading(true);
        try {
            const response = await newAxiosInstance.get(`/getSingleBlog/${id}`);
            if(response.status !== 200){
                setLoading(false);
                toast.error(response.data);
                return; 
            };
            setLoading(false);
            // toast.success('Blog is fetched successfully.');
            
            blogDispatch({type:'GET_BLOG', payload: {blog: response.data, isLoading: isLoading}});
        } catch (error) {
            toast.error(error);
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
            blogDispatch({type:'ADD_NEW_BLOG', payload: {blog: response.data, isLoading: isLoading}});
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
            blogDispatch({type:'UPDATE_BLOG', payload: {blog: response.data, isLoading: isLoading}});
            navigate('/blogs');
        } catch (error) {
            toast.error(error);
        }
    }

    const likeBlog = async (id) => {
        setLoading(true);
        try {
            const response = await newAxiosInstance.put(`/likeBlog/${id}`);
            if(response.status !== 200 || response.data.length == 0){
                setLoading(false);
                toast.error(response.data);
                return; 
            };
            setLoading(false);
            toast.success('Blog is liked successfully.');
            blogDispatch({type:'LIKE_BLOG', payload: {blog: response.data.updatedBlog, isLoading: isLoading}});
        } catch (error) {
            toast.error(error);
        }
    }
    const disLikeBlog = async (id) => {
        setLoading(true);
        try {
            const response = await newAxiosInstance.put(`/disLikeBlog/${id}`);
            if(response.status !== 200 || response.data.length == 0){
                setLoading(false);
                toast.error(response.data);
                return; 
            };
            setLoading(false);
            toast.success('Blog is disLiked successfully.');
            blogDispatch({type:'LIKE_BLOG', payload: {blog: response.data.updatedBlog, isLoading: isLoading}});
        } catch (error) {
            toast.error(error);
        }
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    }

    return {getAllBlogs, getSingleBlog, postBlogs, updateBlog, formatDate, likeBlog, disLikeBlog};
}