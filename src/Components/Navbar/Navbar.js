import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import './Navbar.css'
import profileUser from '../../images/userProfile.png'
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSideNav, showSideNav, isLoggedIn, handleLogout }) => {
    const faBarStyle = {
        color: '#000',
        fontSize: '30px',
        cursor: 'pointer'
    }
    const logoStyle = {
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
    }

    return (
        <>
            <nav className="navbar navbar-light bg-white py-2 px-5">
                <div style={logoStyle}>
                    <h1 className='text-primary'>ProfileSphere</h1>
                </div>
                <div className='profileClass d-flex align-items-center'>
                    {/* <div className='ProfileUser'>
                            <img src={profileUser} alt="Sd Ajmathulla" />
                        </div> */}
                    {/* <div>
                            <label className='text-dark'>SD Ajmathulla</label>
                        </div> */}
                    <div>
                        {<Link to="/home">Home</Link>}
                    </div>
                    <div>
                        <Link to="about">About</Link>
                    </div>
                    <div>{isLoggedIn ? <Link onClick={handleLogout}>Logout</Link> : <Link to="/">Login</Link>}</div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;