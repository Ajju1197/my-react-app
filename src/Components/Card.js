import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../Pages/PagesStyles.css';
import trash from '../images/trash.svg'
import edit from '../images/editIcon.svg'
import view from '../images/viewIcon.svg'
import profile from '../images/userProfile.png'

function Card({userDetails, userHandleDeleteClick}) {
    return (
        <div key={userDetails._id}>
            <NavLink to={`/userDetails/${userDetails._id}`} className={`${userDetails.isActive ? 'successClass' : 'noSuccessClass'} getUserCardClass`}>
                <div className="overlaycard"></div>
                {userDetails.isActive ? <div className="activeUser"></div> : <div className="nonActiveUser"></div>}
                <div className="card-left-block">
                    <img src={`${process.env.REACT_APP_SERVER_IMAGE_PATH}${userDetails.profileImage}` || profile} alt={userDetails.name} />
                </div>
                <div className='card-right-block'>
                    <div className='userHeadingClass'>
                        <h2>{userDetails?.name}</h2>
                        <small>{userDetails.work}</small>
                    </div>
                    <div className='allSignUpUsersActionIconClass'>
                        <Link onClick={() => userHandleDeleteClick(userDetails._id)}><img alt="loading" src={trash}/></Link>
                        <Link to={`/userDetails/${userDetails._id}`}><img alt="loading" src={edit}/></Link>
                        <Link to={`/userDetails/${userDetails._id}`}><img alt="loading" src={view}/></Link>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default Card
