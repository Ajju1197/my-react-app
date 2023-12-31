import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogContext } from '../../Hooks/useBlogContext';
import { useGetBlogData } from '../../Hooks/useGetBlogData';
// import LoadingSpinner from '../../Components/LoadingSpinner';
import like from '../../images/like.svg';
import dislike from '../../images/dislike.svg';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useSelector } from 'react-redux';
import '../PagesStyles.css';
import LoadingSpinner from '../../Components/LoadingSpinner';
import { toast } from 'react-toastify';

function BlogDetails() {
    const params = useParams();
    // const {blogs, singleBlog, isLoading} = useBlogContext();
    const [postComment, setComment] = useState('');
    const {getAllBlogs, getSingleBlog, likeBlog, formatDate, disLikeBlog, commentOnBlog} = useGetBlogData();
    const currUser = useSelector(state => state.login);
    const {blogs, singleBlog, isLoading} = useSelector(state => state.blog);
    const {comments} = useSelector(state => state.comment);
    const {user} = currUser.user;
    // const {isLoading} = currUser;
    
    const [query, setQuery] = useState("");

    
    
    useEffect(() => {
        if(query.length === 0 || query.length >= 2) getAllBlogs(query);
        getSingleBlog(params.id);
    }, [query]);
    
    useEffect(() => {
    }, [singleBlog]);
    
    const handleLikeClick = (id) => {
        
        if(singleBlog.likes.includes(user._id)) return toast.error('already blog is liked.');
        likeBlog(id);
    }
    const handleDisLikeClick = (id) => {
        if(singleBlog.dislikes.includes(user._id)) return toast.error('already blog is disliked.');
        disLikeBlog(id);
    }

    const handleEachBlogClick = (id) => {
        getSingleBlog(id);
    }

    const handleCommentOnChange = (e) => {
        setComment(e.target.value);
    }

    const handleCommentClick = async (e) => {
        e.preventDefault();
        if(!postComment) return toast.error('Comment field is must be filled.')
        let commentData = {
            blogId: singleBlog._id,
            comment: postComment,
        }
        commentOnBlog(commentData);
        setComment('');
    }

    return (
        <div className='blogDetailsPageClass'>
            <div className='blogDetailsShowSingleBlog'>
                {
                    isLoading ? 
                    <div role="status" className='m-auto d-flex align-items-center justify-center spinningLoad'>
                        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div> :
                    singleBlog && 
                    <div className='blogCard'>
                        <div className='blogImg blogDetailsImg'>
                            <img src={process.env.REACT_APP_SERVER_IMAGE_PATH+singleBlog.image} alt={singleBlog.title} loading='lazy'/>
                        </div>
                        <div className='blog-info d-flex flex-column gap-y-3'>
                            <div className='cardTitle d-flex justify-between align-items-center'>
                                <h1 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{singleBlog.title}</h1>
                                <div className="likesDisLikeCounts d-flex text-white gap-2">
                                    <button type='button' className="buttonClassWithoutHover" onClick={() => handleLikeClick(singleBlog._id)}>
                                        <span className='d-flex align-items-center gap-x-3'>
                                            <img src={like} alt="like"/>
                                            <span>{singleBlog.likes && singleBlog.likes.length || 0}</span>
                                        </span>
                                    </button>
                                    <button type='button' className="buttonClassWithoutHover" onClick={() => handleDisLikeClick(singleBlog._id)}>
                                        <span className='d-flex align-items-center gap-x-3'>
                                            <img src={dislike} alt="like"/>
                                            <span>{singleBlog.dislikes && singleBlog.dislikes.length || 0}</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className='blogDetailsDesClass'>
                                <h3 className='font-normal text-gray-700 dark:text-gray-400 blogsCommentsClass'>{singleBlog.comment || 'This is test Description'}</h3>
                            </div>
                            <div className="commentsBlock d-flex flex-col gap-4">
                                <div className='d-flex gap-3'>
                                    <div className="ProfileUser">
                                        <img src={process.env.REACT_APP_SERVER_IMAGE_PATH+user.profileImage} alt="" />
                                    </div>
                                    <form className="d-flex align-items-center flex-1" onSubmit={handleCommentClick}>
                                        <textarea type="text" className='blogDetailsTextareaClass' value={postComment} onChange={handleCommentOnChange} placeholder='Add a comment...' name='comment' id='comment' rows="1"></textarea>
                                        <button type="submit" className='buttonClass'>Send</button>
                                    </form>
                                </div>
                                <div className='commentBlock d-flex flex-col gap-3'>
                                    {
                                        comments && comments.map(eachComment => (
                                            <div key={eachComment._id} className="commentBox d-flex gap-2">
                                                <div className="ProfileUser">
                                                    <img src={process.env.REACT_APP_SERVER_IMAGE_PATH+eachComment.user.profileImage} alt="" />
                                                </div>
                                                <div className='d-flex flex-col gap-2'>
                                                    <small className='text-white'><b>{eachComment.user.name}</b></small>
                                                    <h5 className='text-white'>{eachComment.comment}</h5>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className='blogDetailsShowAllBlogs'>
                {
                    blogs.map(eachBlog => (
                        <div className='blogDetailsShowAllBlogsBLock card' style={{backgroundColor: eachBlog._id === singleBlog._id ? '#000' : '#fff',border: eachBlog._id === singleBlog._id ? '1px solid #fff' : ''}} key={eachBlog._id} onClick={() => handleEachBlogClick(eachBlog._id)}>
                            <div className='blogDetailsRightBlockCardImageClass'>
                                <img src={process.env.REACT_APP_SERVER_IMAGE_PATH+eachBlog.image} alt={eachBlog.title} loading='lazy'/>
                            </div>
                            <div className="p-2">
                                <h4 className='font-semibold text-left dark:text-dark uppercase' style={{color: eachBlog._id === singleBlog._id ? '#fff' : '#000'}}>{eachBlog.title}</h4>
                            </div>
                            {/* <div className="title">{eachBlog.comment}</div> */}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default BlogDetails
