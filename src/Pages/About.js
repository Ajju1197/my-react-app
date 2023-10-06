import React, { useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import profileIcon from '../images/SyedAjmath.jpg';
import { useGetUserData } from "../Hooks/useGetUsersData";
import { useGetUserContext } from "../Hooks/useGetUserContext";
import appLogo from '../images/logo192.png';

const About = () => {

    const { users } = useGetUserContext();
    const { isError, isLoading, getAboutUsersData } = useGetUserData();

    useEffect(() => {
        getAboutUsersData();
    }, []);

    return (
        <div className="aboutPageClass">
            {
                isLoading ? <LoadingSpinner /> :
                    users.length ?
                        users.map(data => (
                            <div className="about_card_block" key={data._id}>
                                <div className="aboutBgImg">
                                    {/* <img src={aboutProfile} alt={data.name} loading="lazy"/> */}
                                    <div className="mernClass">
                                        <div className="App-logo">
                                            <img src={appLogo} className="" alt="" />
                                        </div>
                                        <h1><span>M</span><span>E</span><span>R</span><span>N</span></h1>
                                    </div>
                                    <div className="profileIconImage">
                                        <img src={profileIcon} alt={data.name} />
                                    </div>
                                    <div className="overlay"></div>
                                </div>
                                <div className="about_right_block">
                                    <label htmlFor="">Name:</label>
                                    <label htmlFor="">{data.name} 👱‍♂️</label>
                                </div>
                            </div>
                        )) :
                        <p className="text-dark" style={{ textAlign: 'center' }}><b>{isError}</b></p>
            }
        </div>
    );
}

export default About;