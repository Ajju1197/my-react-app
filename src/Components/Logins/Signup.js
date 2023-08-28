import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import formImg from '../../images/details-1.png'
import './LoginSignUp.css'
import toast from 'react-hot-toast';

function Signup() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: "",
    });

    let name, value;
    const hadleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
    }

    const hadleRegisterClick = async (e) => {
        e.preventDefault();
        const { name, email, phone, work, password, cpassword } = user;

        const fetchRes = await fetch('/register', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                work: work,
                password: password,
                cpassword: cpassword
            })
        })

        const data = await fetchRes.json();

        if (fetchRes.status === 422 || !data) {
            toast.error('Invalid Credentials!');
            return;
        }
        toast.success('Successfully Registered!');
        navigate('/');
    }

    return (
        <div className='signUpFromMainDiv'>
            <div className='signUpFormBlock card'>
                <div className='registerForm'>
                    <div>
                        <h4 className='textClass'>Registration Form</h4>
                    </div>
                    <form method='POST' name="register-form" id="register-form" className='registerForm'>
                        <div className='form-group mt-3'>
                            <input type='text' value={user.name} onChange={hadleInputs} placeholder=' ' className='form-control' name="name" id="name" autoComplete='off' />
                            <label>Name</label>
                        </div>
                        <div className='form-group mt-3'>
                            <input type='email' value={user.email} onChange={hadleInputs} placeholder=' ' className='form-control' name="email" id="email" autoComplete='off' />
                            <label>Email</label>
                        </div>
                        <div className='form-group mt-3'>
                            <input type='text' value={user.phone} onChange={hadleInputs} placeholder=' ' className='form-control' name="phone" id="phone" autoComplete='off' />
                            <label>Phone</label>
                        </div>
                        <div className='form-group mt-3'>
                            <input type='text' value={user.work} onChange={hadleInputs} placeholder=' ' className='form-control' name="work" id="work" autoComplete='off' />
                            <label>Work</label>
                        </div>
                        <div className='form-group mt-3'>
                            <input type='password' value={user.password} onChange={hadleInputs} placeholder=' ' className='form-control' name="password" id="password" autoComplete='off' />
                            <label>Password</label>
                        </div>
                        <div className='form-group mt-3'>
                            <input type='password' value={user.cpassword} onChange={hadleInputs} placeholder=' ' className='form-control' name="cpassword" id="cpassword" autoComplete='off' />
                            <label>Confirm Password</label>
                        </div>
                        <div className='form-group mt-3'>
                            <input type="submit" name="register" id="register" className='btn btn-dark' onClick={hadleRegisterClick} value="Register" />
                        </div>
                    </form>
                </div>
                <div className=''>
                    <div className='formImg'>
                        <img src={formImg} alt="form-image" loading='lazy'/>
                    </div>
                    <div className='alreadyRegisteredUser'>
                        <Link to="/" className='textClass'>I am already registered</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
