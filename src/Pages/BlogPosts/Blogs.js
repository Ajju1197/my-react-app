import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useGetBlogData } from '../../Hooks/useGetBlogData';
import { useBlogContext } from '../../Hooks/useBlogContext';
import like from '../../images/like.svg';
import dislike from '../../images/dislike.svg';
import edit from '../../images/editBlack.svg';
import plus from '../../images/plus.svg';
import view from '../../images/viewBlack.svg';



function Blogs() {
    const {getAllBlogs, formatDate} = useGetBlogData();
    const {blogs} = useBlogContext();

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <div className='allBlogsPageClass'>
            <div className='postBlogsClass'>
                {blogs.map(blog => (
                    <div key={blog._id} className='blogCard'>
                        <div className='blogImg'>
                            <img src={process.env.REACT_APP_SERVER_IMAGE_PATH + blog.image} alt={blog.title} loading='lazy'/>
                        </div>
                        <div className='blog-details'>
                            <div className="blog-likes">
                                <span className='d-flex items-center gap-x-3'>
                                    <img src={like} alt="like"/>
                                    <span>{blog.like > 0 && blog.like}</span>
                                </span>
                                <span className='d-flex items-center gap-x-3'>
                                    <img src={dislike} alt="like"/>
                                    <span>{blog.dislike > 0 && blog.dislike}</span>
                                </span>
                                <span className='d-flex items-center gap-x-3'>
                                    <img src={edit} alt="edit"/>
                                    <span className='text-black'>Edit</span>
                                </span>
                                <span className='d-flex items-center gap-x-3'>
                                    <img src={plus} alt="plus"/>
                                    <NavLink to='/postBlog' className='text-black'>Add</NavLink>
                                </span>
                                <span className='d-flex items-center gap-x-3'>
                                    <img src={view} alt="view"/>
                                    <NavLink to={`/blogDetails/${blog._id}`} className='text-black'>View</NavLink>
                                </span>
                            </div>
                        </div>
                        <div className='blog-info d-flex flex-column gap-y-3'>
                            <h1>{blog.title}</h1>
                            <h3>{blog.comment}</h3>
                            <div className='d-flex justify-between'>
                                <small>Created at : {formatDate(blog.createdAt)}</small>
                                <small>Updated at : {formatDate(blog.updatedAt)}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Blogs
