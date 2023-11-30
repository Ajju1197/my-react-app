import React, { useRef, useState } from 'react';
import { useGetBlogData } from '../../Hooks/useGetBlogData';
import { useAuthContext } from '../../Hooks/useAuthContext';
import './blog.css';
import blogProfile from '../../images/user_blog.jpg'
import { useNavigate } from 'react-router-dom';

function PostBlogs() {
    const {postBlogs, percentage} = useGetBlogData();
    const {user} = useAuthContext();
    const [blogImage, setBlogImage] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        comment:'',
        image:'',
    })
    const fileRef = useRef();
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]:value});
    }

    const handleImageUploadChange = (e) => {
        console.log(e)
        const file =  e.target.files[0];
        setBlogImage(file);
        setFormData({...formData, image: file});
    }

    const handleImagePostClick = () => {
        fileRef.current.click();
    }

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        const formObj = new FormData();

        formObj.append('userId', user?.user?._id );
        formObj.append('title', formData.title);
        formObj.append('comment', formData.comment);
        formObj.append('image', formData.image);

        await postBlogs(formObj);
    }

    return (
        <div>
            <form onSubmit={handlePostSubmit}>
                {percentage > 0 && <progress max='100' value={percentage} className='bg-white'></progress>}
                <div className="postBlogCardClass">
                    <div className='postBlogImageClass'>
                        <img src={blogImage && URL.createObjectURL(blogImage) || blogProfile} alt="" />
                    </div>
                    <div className='postBlogInputFields'>
                        <div>
                            <button type='button' className='btnLoginBtn' onClick={handleImagePostClick}>UPLOAD IMAGE</button>
                            <input type="file" ref={fileRef} name='file' onChange={handleImageUploadChange} hidden accept=".png, .jpg, .jpeg"/>
                        </div>
                        <div className='mernInputStyleClass'>
                            <input type="text" className='form-control' name='title' placeholder=' ' id="title" value={formData.title} onChange={handleInputChange} />
                            <label>Title</label>
                        </div>
                        <div className='mernInputStyleClass'>
                            <input type="text" className='form-control' name='comment' placeholder=' ' id="comment" value={formData.comment} onChange={handleInputChange} />
                            <label>Comment</label>
                        </div>
                        <div className='d-flex justify-center gap-2'>
                            <input type="submit" className='btnLoginBtn' value='Post' />
                            <input type="button" className='btnLoginBtn' value='Go back' onClick={() => navigate(-1)} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PostBlogs;