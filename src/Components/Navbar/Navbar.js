import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import './Navbar.css'
import profileUser from '../../images/userProfile.png'
import { Link, NavLink, useLocation } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import {FaUserTie} from 'react-icons/fa';
import {AiOutlineLogout} from 'react-icons/ai';



const Navbar = ({ toggleSideNav, showSideNav, isLoggedIn, handleLogout }) => {
    const [userData, setUserData] = useState({});
    const [useLoadingSpin, setLoadingSpin] = useState(false);
    const [styleToNavBar, setStyleToNavbar] = useState({});
    const location = useLocation();
    console.log(location);
    const faBarStyle = {
        color: '#000',
        fontSize: '30px',
        cursor: 'pointer'
    }
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
    

    const callAboutPage = async () => {
        try {
            setLoadingSpin(true);
            const res = await fetch("/navbar", {
                method: 'GET', // or 'PUT'
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            const data = await res.json();
            console.log(`From About.js ${data}`);
            setUserData(data);

            if (res.status !== 200) {
                throw new Error(res.error);
            }
            setLoadingSpin(false);
        } catch (error) {
            console.log(error);
        }
    }

    const setScrollFunction = () => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 10){
                setStyleToNavbar({
                    transition:'all 0.4s ease-in',
                    backgroundColor: '#ffffff',
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

    useEffect(() => {
        callAboutPage();
        setScrollFunction();
    },[]);

    return (
        <>
            <nav className="navbar py-2 px-5" style={styleToNavBar}>
                <Link to='/home' style={logoStyle}>
                    <h1 className='logo' style={location.pathname == '/home' ? logoInDarkMode : logoInLightMode}>PROFILE</h1>
                    <small className='sphereClass'>SPHERE</small>
                </Link>
                <div className={`${location.pathname == '/home' ? 'homeProfileClass' : 'profileClass'} d-flex align-items-center`}>
                    <div>
                        {<NavLink to="/home">Home</NavLink>}
                    </div>
                    <div>
                        <NavLink to="about">About</NavLink>
                    </div>
                    <div>
                        {isLoggedIn ? 
                    <div className='dropdownClass'>
                        {useLoadingSpin ? 
                        <LoadingSpinner/> : 
                        <div className='profileIconWithEmail'>
                            <label className={location.pathname == '/home' ? 'emailColorWhiteClass' : 'emailColorDarkClass'}>{userData.email}</label>
                            <div className='ProfileUser'>
                                <img src={profileUser} alt={userData.name} loading='lazy'/>
                            </div>
                        </div>}
                        <div className='dropDown'>
                            <ul className='dropDownList'>
                                <li><NavLink to='/userProfile'><FaUserTie/>User Profile</NavLink></li>
                                <li onClick={handleLogout}><AiOutlineLogout/> Logout</li>
                            </ul>
                        </div>
                    </div> :
                    <NavLink to="/">Login</NavLink>
                    }
                    </div>
                    {/* <div>{isLoggedIn ? <a href='#' onClick={handleLogout}>Logout</a> : <NavLink to="/">Login</NavLink>}</div> */}
                </div>
            </nav>
        </>
    );
}

export default Navbar;