import React from 'react';
import syedProfile from '../images/SyedAjmath.jpg';
import editIcon from '../images/editIcon.svg';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';

function DetailCard({signUpUserDetails}) {
    const { isAuthorized, selectedImage, inputRef, formData, handleSubmit, handleInputChange, handleImageChange, handleImageClick } = signUpUserDetails;
    const { user } = useAuthContext();
    const navigate = useNavigate();
    return (
        <div className="registerFormBlock">
            <form
                onSubmit={handleSubmit}
                name="register-form"
                id="register-form"
                className="registerForm"
            >
                <div className="userProfile" onClick={handleImageClick}>
                    <div className='userImage'>
                        {selectedImage ? (
                            <img src={URL.createObjectURL(selectedImage)} alt={formData.name} />
                        ) : formData.profileImage ? (
                            <img src={process.env.REACT_APP_SERVER_IMAGE_PATH + formData.profileImage} alt={formData.name} />
                        ) : (
                            <img src={syedProfile} alt={formData.name} />
                        )}

                    </div>
                    <div className='editIcon'>
                        <label htmlFor="imageUpload">
                            <img src={editIcon} alt="editIcon" />
                        </label>
                        <input type='file' id="imageUpload" onChange={handleImageChange} disabled={!isAuthorized} ref={inputRef} style={{ display: 'none' }} accept=".png, .jpg, .jpeg" />
                    </div>
                </div>
                <div className='signUpUserDetailsFieldsClass'>
                    <div className="mernInputStyleClass mt-3">
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
                    </div>
                    <div className="mernInputStyleClass mt-3">
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
                    </div>
                    <div className="mernInputStyleClass mt-3">
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
                    </div>
                    <div className="mernInputStyleClass mt-3">
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
                    </div>
                </div>
                {
                    !user ? (
                        <div>
                            <div className='mernInputStyleClass mt-3'>
                                <input type='password' value={formData.password} onChange={handleInputChange} placeholder=' ' className='form-control' name="password" id="password" autoComplete='off' />
                                <label>Password</label>
                            </div>
                            <div className='mernInputStyleClass mt-3'>
                                <input type='password' value={formData.cpassword} onChange={handleInputChange} placeholder=' ' className='form-control' name="cpassword" id="cpassword" autoComplete='off' />
                                <label>Confirm Password</label>
                            </div>
                        </div>
                    ) : null
                }
                <div className="mt-3 d-flex justify-content-center align-content-center">
                    {
                        isAuthorized ?
                            <input
                                type="submit"
                                name="register"
                                id="register"
                                className="bg-black text-white me-2 px-3 py-2 rounded-sm"
                                value={user ? 'Update' : 'Register'}
                            /> : null
                    }
                    {user ? <button type='button' className='bg-black text-white px-3 py-2 rounded-sm' onClick={() => navigate(-1)}>Go Back</button> : null}
                </div>
            </form>
        </div>

    )
}

export default DetailCard
