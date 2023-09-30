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
        login(userDetails.email, userDetails.password);
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
            <div className='signUpFormBlock card'>
                <div className='registerForm'>
                    <div>
                        <h4 className='textClass'>Signin Form</h4>
                    </div>
                    <form onSubmit={handleSubmit} name="register-form" id="register-form" className='registerForm'>
                        <div className='form-group mt-3'>
                            <input type='email' value={userDetails.email} onChange={handleUserDetails} placeholder=' ' className='form-control' name="email" id="email" />
                            <label>Email</label>
                        </div>
                        <div className='form-group mt-3'>
                            <input type='password' value={userDetails.password} onChange={handleUserDetails} placeholder=' ' className='form-control' name="password" id="password" />
                            <label>Password</label>
                        </div>
                        <div className='mt-3'>
                            <input type='submit' className='bg-black px-4 py-2 rounded-md' />
                        </div>
                        {isError && <div className='bg-danger text-white p-2 mt-2 errorMsg'>{isError}</div>}
                    </form>
                </div>
                <div className=''>
                    <div className='formImg'>
                        <img src={formImg} alt="form-image" loading='lazy' />
                    </div>
                    <div className='alreadyRegisteredUser'>
                        <Link to="/register" className='textClass'>Signup</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login
