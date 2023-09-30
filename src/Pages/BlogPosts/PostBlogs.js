import React, { useState } from 'react';
import { useGetBlogData } from '../../Hooks/useGetBlogData';
import { useAuthContext } from '../../Hooks/useAuthContext';

function PostBlogs() {
    const {postBlogs, percentage} = useGetBlogData();
    const {user} = useAuthContext();
    const [blogImage, setBlogImage] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        comment:'',
        image:'',
    })


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
                
                <div>
                    <img src={blogImage && URL.createObjectURL(blogImage)} style={{width:'200px',height:'200px'}} alt="" />
                    <input type="file" name='file' onChange={handleImageUploadChange}/>
                </div>
                <div>
                    <input type="text" className='form-control' name='title' value={formData.title} onChange={handleInputChange} />
                </div>
                <div>
                    <input type="text" className='form-control' name='title' value={formData.title} onChange={handleInputChange} />
                </div>
                <div>
                    <input type="submit" className='bg-white text-black px-5 py-2' value='Post' />
                </div>
            </form>
        </div>
    )
}

export default PostBlogs;