import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faCartPlus, faHome, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNav = ({showSideNav, toggleSideNav}) => {
    const sideNavLinks = [
        {
            id: 1,
            routeName: 'Home',
            linkTo: 'home',
            icon: faHome,
        },
        {
            id: 2,
            routeName: 'Products',
            linkTo: 'product',
            icon: faCartPlus,
        }
    ];

    return (
        <div>
            <div className='p-3'>
                <div className='p-1'>
                    <label className='text-white'>Syed Ajmathulla</label>
                </div>
                {sideNavLinks.map(eachLink => (
                    <div key={eachLink.id}>
                        <NavLink className='sideNavLinks' to={eachLink.linkTo}>
                            {eachLink.routeName}
                            <FontAwesomeIcon icon={eachLink.icon} className='iconsStylingClass'/>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideNav;
