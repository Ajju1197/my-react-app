import { faCartPlus, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';
import about from '../images/about.svg';
import users from '../images/users.svg';
import setting from '../images/settingIcon.svg';
import blog from '../images/blog.svg';

const SideNav = () => {
    const {user} = useAuthContext();
    const sideNavLinks = {
            home:[
                {
                    id: 1,
                    routeName: 'Home',
                    linkTo: 'home',
                    icon: faHome,
                },
                {
                    id: 2,
                    routeName: 'About',
                    linkTo: 'about',
                    iconImage: about,
                },
                {
                    id: 3,
                    routeName: 'Users',
                    linkTo: 'allSignupUsers',
                    iconImage: users,
                },
                {
                    id: 4,
                    routeName: 'Blogs',
                    linkTo: 'blogs',
                    iconImage: blog,
                },
                
            ],
            cart:[
                {
                    id: 1,
                    routeName: 'Products',
                    linkTo: 'product',
                    icon: faCartPlus,
                }
            ],
            settings:[
                {
                    id: 1,
                    routeName: 'Settings',
                    linkTo: 'setting',
                    iconImage: setting,
                }
            ],
        };

    return (
        <div className='d-flex flex-column justify-between h-100'>
            <div className='gap-y-1.5 d-flex flex-col py-1 px-1'>
                {user && 
                <div className='p-1 text-left bg-black'>
                    <label className='sideNavTitleClass'>{user.user.name}</label>
                </div>
                }
                <label className='sideNavSubHeading'>DashBoard</label>
                {
                    sideNavLinks.home.map(eachLink => (
                        <div key={eachLink.id}>
                            <NavLink className='sideNavLinks' to={eachLink.linkTo}>
                                {eachLink.iconImage ? <img src={eachLink.iconImage} className='iconsStylingClass'/> : <FontAwesomeIcon icon={eachLink.icon} className='iconsStylingClass'/>}
                                {eachLink.routeName}
                            </NavLink>
                        </div>
                    ))
                }
                <hr/>
                <label className='sideNavSubHeading'>Cart</label>
                {sideNavLinks.cart.map(eachLink => (
                    <div key={eachLink.id}>
                        <NavLink className='sideNavLinks' to={eachLink.linkTo}>
                            {eachLink.iconImage ? <img src={eachLink.iconImage} className='iconsStylingClass'/> : <FontAwesomeIcon icon={eachLink.icon} className='iconsStylingClass'/>}
                            {eachLink.routeName}
                        </NavLink>
                    </div>
                ))}
            </div>
            <div className="gap-y-1.5 d-flex flex-col py-1 px-1 bg-slate-900">
                {sideNavLinks.settings.map(eachLink => (
                    <div key={eachLink.id}>
                        <NavLink className='sideNavLinks' to={eachLink.linkTo}>
                            {eachLink.iconImage ? <img src={eachLink.iconImage} className='iconsStylingClass'/> : <FontAwesomeIcon icon={eachLink.icon} className='iconsStylingClass'/>}
                            {eachLink.routeName}
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideNav;
