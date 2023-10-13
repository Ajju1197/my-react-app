import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import formImg from '../../images/hero-img.png';
import { toast } from 'react-hot-toast';
import { useLogin } from '../../Hooks/useLogin';
import './LoginSignUp.css'

function Login({onLogin}) {

    const navigate = useNavigate();
    const {login, isError} = useLogin();

    const [userDetails, setUserDetails] = useState({
        email: "", password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        login(userDetails);
    }

    const handleUserDetails = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    return (
        <div className="signUpFromMainDiv">
            <div className='signUpFormBlock d-flex flex-row gap-4 justify-center card'>
                <div className='registerForm p-5'>
                    <div>
                        <h4 className='authHeadingClass'>Login  Form</h4>
                    </div>
                    <form onSubmit={handleSubmit} name="register-form" id="register-form" className='registerForm'>
                        <div className="d-flex flex-col gap-y-3">
                            <div className='mernInputStyleClass'>
                                <input type='email' value={userDetails.email} onChange={handleUserDetails} placeholder=' ' className='form-control' name="email" id="email" />
                                <label>Email</label>
                            </div>
                            <div className='mernInputStyleClass'>
                                <input type='password' value={userDetails.password} onChange={handleUserDetails} placeholder=' ' className='form-control' name="password" id="password" />
                                <label>Password</label>
                            </div>
                        </div>
                        <div className='btnLoginBtn px-3 py-2'>
                            <span className="mernArrowIconClass"></span>
                            <input type='submit' className='aboutLoginBtn' />
                        </div>
                        <div className='alreadyRegisteredUser'>
                            <Link to="/register" className='signUpNavigateClass'>Register</Link>
                        </div>
                            {isError && <div className='bg-danger text-white p-2 mt-2 errorMsg'>{isError}</div>}
                    </form>
                </div>
                <div className=''>
                    <div className='formImg'>
                        <img src={formImg} alt="form-image" loading='lazy' />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login
