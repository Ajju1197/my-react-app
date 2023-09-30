import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogContext } from '../../Hooks/useBlogContext';
import { useGetBlogData } from '../../Hooks/useGetBlogData';
// import LoadingSpinner from '../../Components/LoadingSpinner';
import like from '../../images/like.svg';
import dislike from '../../images/dislike.svg';
import { useAuthContext } from '../../Hooks/useAuthContext';


function BlogDetails() {
    const params = useParams();
    const {blogs, singleBlog} = useBlogContext();
    const {user} = useAuthContext();
    const {getAllBlogs, getSingleBlog, likeBlog, formatDate, disLikeBlog} = useGetBlogData();

    useEffect(() => {
        getAllBlogs();
        getSingleBlog(params.id);
    }, []);

    useEffect(() => {
    }, [singleBlog]);
    
    const handleLikeClick = () => {
        if(!singleBlog.likes.includes(user.user._id)){
            likeBlog(params.id);
        }
    }
    const handleDisLikeClick = () => {
        if(singleBlog.likes.includes(user.user._id)){
            disLikeBlog(params.id);
        }
    }

    return (
        <div className='blogDetailsPageClass'>
            <div className='blogDetailsShowSingleBlog'>
                {singleBlog && 
                    <div className=''>
                        <div className='blogDetailsImage'>
                            <img src={process.env.REACT_APP_SERVER_IMAGE_PATH+singleBlog.image} alt={singleBlog.title} loading='lazy'/>
                        </div>
                        <h1>{singleBlog.title}</h1>
                        <h1>{singleBlog.comment}</h1>
                        <small>{formatDate(singleBlog.createdAt)}</small>
                        <span>{singleBlog.likes && singleBlog.likes.length} likes</span>
                        <span className='d-flex items-center gap-x-3 cursor-pointer' onClick={handleLikeClick}>
                            <img src={like} alt="like"/>
                        </span>
                        <span className='d-flex items-center gap-x-3 cursor-pointer' onClick={handleDisLikeClick}>
                            <img src={dislike} alt="like"/>
                        </span>
                        <div className="commentsBlock">
                            <form className="mernInputStyleClass" onSubmit={(e) => e.preventDefault()}>
                                <textarea type="text" name='comment' id='comment' rows="1"></textarea>
                                <button type="submit" className='btn btn-primary'>Send</button>
                            </form>
                        </div>
                    </div>
                }
            </div>
            <div className='blogDetailsShowAllBlogs'>
                {
                    blogs.map(eachBlog => (
                        <div className='blogDetailsShowAllBlogsBLock'>
                            <div className="card rounded-sm">
                                <div className="title">{eachBlog.title}</div>
                                <div className="title">{eachBlog.comment}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default BlogDetails
