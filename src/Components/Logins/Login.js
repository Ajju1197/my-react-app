import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import formImg from '../../images/hero-img.png';
import { toast } from 'react-hot-toast';


function Login({onLogin}) {

    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        email: "", password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(userDetails.email, userDetails.password);
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
                        <h4 className='text-primary'>Login Form</h4>
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
                            <input type='submit' className='btn btn-dark' />
                        </div>
                    </form>
                </div>
                <div className=''>
                    <div className='formImg'>
                        <img src={formImg} alt="form-image" loading='lazy' />
                    </div>
                    <div className='alreadyRegisteredUser'>
                        <Link to="/register" className='text-primary'>Register</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login
