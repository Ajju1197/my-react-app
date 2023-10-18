import React from 'react';
import syedProfile from '../images/SyedAjmath.jpg';
import editIcon from '../images/editIcon.svg';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';
import '../App.css';
import '../Pages/PagesStyles.css';
import '../Components/Logins/LoginSignUp.css'
import { useSelector } from 'react-redux';

function DetailCard({signUpUserDetails}) {
    const { isAuthorized, selectedImage, inputRef, formData, handleSubmit, handleInputChange, handleImageChange, handleImageClick, isLoading } = signUpUserDetails;
    // const { user } = useAuthContext();
    const currUser = useSelector(state => state.login);
    const {user} = currUser.user;
    const navigate = useNavigate();
    return (
        <div className="registerFormBlock">
            {
                user && 
                <div className='userDetailsLeftImageBlock'>
                    <div className='leftUserImage'>
                        {selectedImage ? (
                                <img src={URL.createObjectURL(selectedImage)} alt={formData.name} />
                            ) : formData.profileImage ? (
                                <img src={process.env.REACT_APP_SERVER_IMAGE_PATH + formData.profileImage} alt={formData.name} />
                            ) : (
                                <img src={syedProfile} alt={formData.name} />
                            )}
                    </div>
                </div>
            }
            <form
                onSubmit={handleSubmit}
                name="register-form"
                id="register-form"
                className={user ? 'userRegister' : 'registerForm'}
            >
                <div className="userProfile" onClick={handleImageClick}>
                    {
                        !user && 
                        <div className='userImage'>
                            {selectedImage ? (
                                <img src={URL.createObjectURL(selectedImage)} alt={formData.name} />
                            ) : formData.profileImage ? (
                                <img src={process.env.REACT_APP_SERVER_IMAGE_PATH + formData.profileImage} alt={formData.name} />
                            ) : (
                                <img src={syedProfile} alt={formData.name} />
                            )}
                            <div className='editIcon'>
                                <label htmlFor="imageUpload">
                                    <img src={editIcon} alt="editIcon" />
                                </label>
                                <input type='file' id="imageUpload" onChange={handleImageChange} disabled={!isAuthorized} ref={inputRef} style={{ display: 'none' }} accept=".png, .jpg, .jpeg" />
                            </div>

                        </div>
                    }
                </div>
                <div className={user ? 'signUpUserDetailsFieldsSingleRowClass' : 'signUpUserDetailsFieldsClass'}>
                    <div className="mernInputStyleClass ">
                        <input
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder=" "
                            className="form-control"
                            name="name"
                            id="name"
                            autoComplete="off"
                        />
                        <label>Name</label>
                    </div>
                    <div className="mernInputStyleClass ">
                        <input
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder=" "
                            className="form-control"
                            name="email"
                            id="email"
                            disabled={user?.user?.email}
                            autoComplete="off"
                        />
                        <label>Email</label>
                    </div>
                    <div className="mernInputStyleClass ">
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder=" "
                            className="form-control"
                            name="phone"
                            id="phone"
                            autoComplete="off"
                        />
                        <label>Phone</label>
                    </div>
                    <div className="mernInputStyleClass ">
                        <input
                            type="text"
                            value={formData.work}
                            onChange={handleInputChange}
                            placeholder=" "
                            className="form-control"
                            name="work"
                            id="work"
                            autoComplete="off"
                        />
                        <label>Work</label>
                    </div>
                </div>
                {
                    !user ? (
                        <div className='signUpUserDetailsFieldsClass'>
                        <div className='mernInputStyleClass '>
                                <input type='password' value={formData.password} onChange={handleInputChange} placeholder=' ' className='form-control' name="password" id="password" autoComplete='off' />
                                <label>Password</label>
                            </div>
                            <div className='mernInputStyleClass '>
                                <input type='password' value={formData.cpassword} onChange={handleInputChange} placeholder=' ' className='form-control' name="cpassword" id="cpassword" autoComplete='off' />
                                <label>Confirm Password</label>
                            </div>
                        </div>
                    ) : null
                }
                <div className=" d-flex justify-content-center align-content-center gap-x-3">
                    {
                        isAuthorized ?
                        <div className='btnLoginBtn'>
                            {
                                isLoading ? 
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> : 
                                <span className="mernArrowIconClass"></span>
                            }
                            <input
                                type="submit"
                                name="register"
                                id="register"
                                className="aboutLoginBtn"
                                value={user ? 'Update' : 'Register'}
                            />
                        </div> : null
                    }
                    {user ? <button type='button' className='btnLoginBtn' onClick={() => navigate(-1)}>Go Back</button> : null}
                </div>
            </form>
        </div>

    )
}

export default DetailCard
