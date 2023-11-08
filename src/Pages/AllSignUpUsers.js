import React, { useEffect, useState } from 'react'
import { useGetUserData } from '../Hooks/useGetUsersData';
import LoadingSpinner from '../Components/LoadingSpinner';
import syedProfile from '../images/SyedAjmath.jpg';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useGetUserContext } from '../Hooks/useGetUserContext';
import Card from '../Components/Card';
import Form from '../Components/Form';
import { useSelector } from 'react-redux';

function AllSignUpUsers() {
    const { getAllUsersData, userHandleDeleteClick} = useGetUserData();
    // const {user} = useAuthContext();
    // const {users} = useGetUserContext();
    const [query, setQuery] = useState("");

    const {users, isLoading, IsError} = useSelector(state => state.users);
    const currUser = useSelector(state => state.login);
    const {user} = currUser.user;

    useEffect(() => {
        if(query.length === 0 || query.length >= 2) getAllUsersData(query);
    },[query]);

    return (
        <div className='getAllUserDataClass'>
            {/* <div className='searchClass'>
                <Form data={users} handleOnChange={handleOnChange}/>
            </div> */}
            <div className='signupUserSecondRowBlock'>
                {
                    isLoading ? <LoadingSpinner/> :
                    users.map(eachItem => (
                        <Card userDetails={eachItem} profile={syedProfile} user={user} getAllUsersData={getAllUsersData} userHandleDeleteClick={userHandleDeleteClick}/>
                    ))
                }
            </div>
        </div>
    )
}

export default AllSignUpUsers
