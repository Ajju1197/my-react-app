import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useGetBlogData } from '../../Hooks/useGetBlogData';
import { useBlogContext } from '../../Hooks/useBlogContext';
import like from '../../images/like.svg';
import dislike from '../../images/dislike.svg';
import edit from '../../images/editIcon.svg';
import plus from '../../images/plus.svg';
import view from '../../images/viewIcon.svg';
import '../PagesStyles.css';
import { useSelector } from 'react-redux';



function Blogs() {
    const {getAllBlogs, formatDate} = useGetBlogData();
    // const {blogs} = useBlogContext();
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const currUser = useSelector(state => state.login);
    const {blogs, isLoading} = useSelector(state => state.blog);
    const {user} = currUser.user;

    useEffect(() => {
        if(query.length === 0 || query.length >= 2) getAllBlogs(query);
    }, [query]);

    return (
        <div className='allBlogsPageClass'>
            <div className="blogsActionButtons">
                <button type='button' className='btnLoginBtn' onClick={() => navigate(-1)}>Go back</button>
                <button type='button' className="btnLoginBtn">
                    <span className='d-flex align-items-center gap-x-3'>
                        <img src={plus} alt="plus"/>
                        <NavLink to='/postBlog' className='text-white'>Add</NavLink>
                    </span>
                </button>
            </div>
            <div className='postBlogsClass'>
                {blogs.map(blog => (
                    <div key={blog._id} className='blogCard'>
                        <div className='blogImg'>
                            <img src={process.env.REACT_APP_SERVER_IMAGE_PATH + blog.image} alt={blog.title} loading='lazy'/>
                        </div>
                        <div className='blog-info d-flex flex-column gap-y-3'>
                            <div className='cardTitle d-flex justify-between align-items-center'>
                                <h1 className='text-2xl font-bold tracking-t ight te xt-gray-900 dark:text-white'>{blog.title}</h1>
                                <div className="likesDisLikeCounts d-flex text-white gap-2">
                                    <label className='badge'>likes : {blog.likes.length }</label>
                                    <label className='badge'>dislikes : {blog.dislikes.length }</label>
                                    {/* <label className='badge'>subscribers : {blog.dislikes.length }</label> */}
                                </div>
                            </div>
                            <h3 className='font-normal text-gray-700 dark:text-gray-400 blogsCommentsClass'>{blog.comment || 'This is test Description'}</h3>
                            <div className='d-flex justify-between'>
                                <small className='createBlogDetails'>Created at : {formatDate(blog.createdAt)}</small>
                                <small className='createBlogDetails'>Updated at : {formatDate(blog.updatedAt)}</small>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                {/* <button type='button' className="btn btn-primary">
                                    <span className='d-flex align-items-center gap-x-1'>
                                        <img src={edit} alt="edit"/>
                                        <NavLink to='/postBlog' className='text-white'>Edit</NavLink>
                                    </span>
                                </button> */}
                                <button type='button' className="btn btn-primary">
                                    <span className='d-flex align-items-center gap-x-1'>
                                        <img src={view} alt="view"/>
                                        <NavLink to={`/blogDetails/${blog._id}`} className='text-white'>View</NavLink>
                                    </span>
                                </button>
                                {/* <button type='button' className="btn btn-primary" onClick={() => handleLikeClick(blog._id)}>
                                    <span className='d-flex align-items-center gap-x-3'>
                                        <img src={like} alt="like"/>
                                        <span>{likeCount || 0}</span>
                                    </span>
                                </button>
                                <button type='button' className="btn btn-primary" onClick={() => handleDisLikeClick(blog._id)}>
                                    <span className='d-flex align-items-center gap-x-3'>
                                        <img src={dislike} alt="like"/>
                                        <span>{disLikeCount || 0}</span>
                                    </span>
                                </button> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Blogs
