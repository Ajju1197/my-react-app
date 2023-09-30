import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserContext } from '../Hooks/useGetUserContext';
import { useGetUserData } from '../Hooks/useGetUsersData';
import '../Components/Logins/LoginSignUp.css';
import DetailCard from '../Components/DetailCard';
import LoadingSpinner from '../Components/LoadingSpinner';
import { useAuthContext } from '../Hooks/useAuthContext';

function SignUpUserDetail() {
    const params = useParams();
    const { singleUser } = useGetUserContext();
    const { isError, isLoading, getUserData, userHandleUpdateClick } = useGetUserData();
    const [selectedImage, setSelectedImage] = useState(null);
    const inputRef = useRef();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const { user } = useAuthContext();
    // Initialize formData with default values matching your data structure
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        work: '',
        profileImage: '',
    });



    useEffect(() => {
        // Fetch the user data when the component mounts
        getUserData(params.id);
    }, []);

    useEffect(() => {
        setFormData({
            name: singleUser.name,
            email: singleUser.email,
            phone: singleUser.phone,
            work: singleUser.work,
            profileImage: singleUser.profileImage,
        });
        if(user.user._id === params.id){
            setIsAuthorized(true);
        }
    },[singleUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create a FormData object
        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('email', formData.email);
        formDataObj.append('phone', formData.phone);
        formDataObj.append('work', formData.work);
        formDataObj.append('profileImage', formData.profileImage);
        
        // if (selectedImage) {
        //     formDataObj.append('profileImage', selectedImage); // Append the selected image file
        // }
        
        // Perform the actual API update
        debugger
        console.log(formDataObj);
        await userHandleUpdateClick(params.id, formDataObj);
    }
    

    const handleImageChange = (e) => {
        const fileSelected = e?.target?.files[0];
        setSelectedImage(fileSelected);
        setFormData({ ...formData, profileImage: fileSelected }); // Update the formData with the selected image
    }
    

    const handleImageClick = () => {
        if(isAuthorized){
            inputRef.current.click();
        }
    }

    const signUpUserDetails = {
        isAuthorized,
        selectedImage,
        handleImageClick,
        inputRef,
        isError,
        formData,
        paramsId:params.id,
        singleUser,
        handleSubmit,
        handleInputChange,
        handleImageChange,
    }

    return (
        <div className="signupUserDetailsPageClass">
            {
                isLoading ? <LoadingSpinner/> :
                <DetailCard  signUpUserDetails={signUpUserDetails}/>
            }
        </div>
    );
}

export default SignUpUserDetail;