import React, { useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import profileIcon from '../images/SyedAjmath.jpg';
import { useGetUserData } from "../Hooks/useGetUsersData";
import { useGetUserContext } from "../Hooks/useGetUserContext";
import { useTypewriter } from 'react-simple-typewriter';
import { Icon } from '@iconify/react';
import appLogo from '../images/logo192.png';

const About = () => {

    const { users } = useGetUserContext();
    const { isError, isLoading, getAboutUsersData } = useGetUserData();

    const [technologies] = useTypewriter({
        words: ['MERN','MONGO DB','EXPRESS JS','REACT','ANGULAR', 'NODE JS'],
        loop: 0
    })

    useEffect(() => {
        getAboutUsersData();
    }, []);

    const printAboutPage = () => {
        const printContent = document.getElementById('printBlock').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContents;
    }

    return (
        <div className="aboutPageClass">
            <div className="d-flex justify-end">
                <button className="commonButtonStyle" onClick={printAboutPage}>
                    <Icon icon="flat-color-icons:print" color="white" width="20" />
                    <span>Print</span>
                </button>
            </div>
            {
                isLoading ? <LoadingSpinner /> :
                    users.length ?
                        users.map(data => (
                            <section className="printBlock" id="printBlock">
                                <div className="profileSection">
                                    <div className="profileBlock">
                                        <img src={profileIcon} alt={data.name} />
                                        <div className="text-start">
                                            <h1>{data.name}</h1>
                                            <small><span className="mernClass">{technologies}</span> Developer</small>
                                        </div>
                                    </div>
                                    <div className="address">
                                        <div className="d-flex align-items-center gap-2">
                                            <Icon icon="ph:phone-thin" color="white" width="26" />
                                            <span>Phone : {data.phone}</span>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <Icon icon="iconamoon:email-thin" color="white" width="26" />
                                            <span>Email : {data.email}</span>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <Icon icon="bxl:linkedin" color="white" width="30" />
                                            <Icon icon="ant-design:youtube-outlined" color="white" width="30" />
                                            <Icon icon="iconoir:instagram" color="white" width="30" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )) :
                        <p className="text-dark" style={{ textAlign: 'center' }}><b>{isError}</b></p>
            }
        </div>
    );
}

export default About;