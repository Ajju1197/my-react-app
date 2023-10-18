import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSignup } from '../../Hooks/useSignup';
import DetailCard from '../DetailCard';
import './LoginSignUp.css'
import '../../Pages/PagesStyles.css'
import { useSelector } from 'react-redux';

function Signup() {

    const inputRef = useRef();
    const { signup } = useSignup();
    const [selectedImage, setSelectedImage] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: "",
        profileImage: "",
    });

    const currUser = useSelector(state => state.login);
    const {isLoading, isError} = currUser;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData();
        
        formDataObj.append('name', formData.name);
        formDataObj.append('email', formData.email);
        formDataObj.append('phone', formData.phone);
        formDataObj.append('work', formData.work);
        formDataObj.append('password', formData.password);
        formDataObj.append('cpassword', formData.cpassword);
        formDataObj.append('profileImage', formData.profileImage);

        console.log('This is from singup page', formData.profileImage);
        
        await signup(formDataObj);
    }

    const handleImageClick = () => {
        if(isAuthorized){
            inputRef.current.click();
        }
    }

    const handleImageChange = (e) => {
        const fileSelected = e?.target?.files[0];
        setSelectedImage(fileSelected);
        console.log('This fromm signup image', fileSelected);
        setFormData({...formData, profileImage: fileSelected});
    }

    const signUpUserDetails = {
        isAuthorized,
        selectedImage,
        formData,
        handleImageClick,
        inputRef,
        isError,
        isLoading,
        handleSubmit,
        handleInputChange,
        handleImageChange,
    }

    return (
        <div className='signUpFromMainDiv'>
            <div className='signUpFormBlock card'>
                <div className='registerForm'>
                    <div>
                        <h4 className='authHeadingClass'>Registration Form</h4>
                    </div>
                    <DetailCard  signUpUserDetails={signUpUserDetails}/>
                    <div className='alreadyRegisteredUser'>
                        <Link to="/" className='signUpNavigateClass'>I am already registered</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
