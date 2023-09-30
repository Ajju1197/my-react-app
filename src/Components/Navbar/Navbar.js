import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, NavLink, useLocation } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import {FaUserTie} from 'react-icons/fa';
import { useLogout } from '../../Hooks/useLogout';
import { useAuthContext } from '../../Hooks/useAuthContext';
import Logout from '../../images/Logout.svg';
import Form from '../Form';
import searchIcon from '../../images/search.svg';
const Navbar = () => {
    const [styleToNavBar, setStyleToNavbar] = useState({});
    const location = useLocation();
    const {logout} = useLogout();
    const {user} = useAuthContext();

    const logoStyle = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    }
    const logoInLightMode = {
        color: 'aqua',
    }
    const logoInDarkMode = {
        color: 'rgb(247,220,79)',
    }

    const setScrollFunction = () => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 10){
                setStyleToNavbar({
                    transition:'all 0.4s ease-in',
                    // backgroundColor: 'var(--primary)',
                    padding:'5px',
                    boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
                });
            }else{
                setStyleToNavbar({
                    transition:'all 0.4s ease-out',
                });
            }
        })
    }

    const handleLogoutClick = () => {
        logout();
    }

    const pathNames = ['/allSignupUsers', '/product']

    useEffect(() => {
        setScrollFunction();
    },[user]);

    return (
        <>
            <nav className="navbar py-2 px-5" style={styleToNavBar}>
                <Link to='/home' style={logoStyle}>
                    <h1 className='logo' style={location.pathname === '/home' ? logoInDarkMode : logoInLightMode}>PROFILE</h1>
                    <small className='sphereClass'>SPHERE</small>
                </Link>
                <div className={`${location.pathname === '/home' ? 'homeProfileClass' : 'profileClass'} d-flex align-items-center`}>
                    {
                        pathNames.includes(location.pathname) ? (
                            <div className='searchInputClass'>
                                <div className='searchImg'>
                                    <img src={searchIcon} alt="search"/>
                                </div>
                                <Form/>
                            </div>
                        ) : null
                    }
                    <div>
                        {user ? 
                            <div className='dropdownClass'>
                                {!user ? 
                                <LoadingSpinner/> : 
                                <div className='profileIconWithEmail'>
                                    <label className={location.pathname === '/home' ? 'emailColorWhiteClass' : 'emailColorDarkClass'}>{user.user.email}</label>
                                    <div className='ProfileUser'>
                                        <img src={process.env.REACT_APP_SERVER_IMAGE_PATH + user.user.profileImage} alt={user.user.name} loading='lazy'/>
                                    </div>
                                </div>}
                                <div className='dropDown'>
                                    <ul className='dropDownList'>
                                        <li><NavLink to={`userDetails/${user.user._id}`}><FaUserTie/>User Profile</NavLink></li>
                                        <li onClick={handleLogoutClick}><img alt="Logout" src={Logout}/> Signout</li>
                                    </ul>
                                </div>
                            </div> :
                            <NavLink to="/">Signin</NavLink>
                        }
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;