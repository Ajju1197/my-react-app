import React, { useEffect, useRef } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import profileIcon from '../images/syed_ajmathulla.jpg';
import { useGetUserData } from "../Hooks/useGetUsersData";
import { useGetUserContext } from "../Hooks/useGetUserContext";
import { useTypewriter } from 'react-simple-typewriter';
import { Icon } from '@iconify/react';
import appLogo from '../images/logo192.png';
import './PagesStyles.css';

const About = () => {

    const { users } = useGetUserContext();
    const { isError, isLoading, getAboutUsersData } = useGetUserData();
    const sectionToPrint = useRef();

    const [technologies] = useTypewriter({
        words: ['MERN','MONGO DB','EXPRESS JS','REACT','ANGULAR', 'NODE JS'],
        loop: 0
    })

    useEffect(() => {
        getAboutUsersData();
    }, []);

    const printAboutPage = (printId) => {
        var originalContents = document.body.innerHTML;
        var printContent = sectionToPrint.current.innerHTML;
        document.body.innerHTML = printContent;
        window.print();

        setTimeout(() => {
            document.body.innerHTML = originalContents;
        }, 100);
    }

    return (
        // <div className="aboutPageClass">
        //     <div className="d-flex justify-end">
        //         <button className="commonButtonStyle" onClick={() => printAboutPage('printBlock')}>
        //             <Icon icon="flat-color-icons:print" color="white" width="20" />
        //             <span>Print</span>
        //         </button>
        //     </div>
        //     {
        //         isLoading ? <LoadingSpinner /> :
        //             users.length ?
        //                 users.map(data => (
        //                     <section className="printBlock" ref={sectionToPrint} id="printBlock">
        //                         <div className="profileSection">
        //                             <div className="profileBlock">
        //                                 <div className="aboutImageClass">
        //                                     <img src={profileIcon} alt={data.name} />
        //                                 </div>
        //                                 <div className="text-start">
        //                                     <h1>{data.name}</h1>
        //                                     <small><span className="mernClass">{technologies}</span> Developer</small>
        //                                 </div>
        //                             </div>
        //                             <div className="address">
        //                                 <div className="d-flex align-items-center gap-2">
        //                                     <Icon icon="ph:phone-thin" color="white" width="26" />
        //                                     <span>Phone : {data.phone}</span>
        //                                 </div>
        //                                 <div className="d-flex align-items-center gap-2">
        //                                     <Icon icon="iconamoon:email-thin" color="white" width="26" />
        //                                     <span>Email : {data.email}</span>
        //                                 </div>
        //                                 <div className="d-flex align-items-center gap-2 socialMediaClass">
        //                                     <div>
        //                                         <Icon icon="bxl:linkedin" color="white" width="30" />
        //                                     </div>
        //                                     <div>
        //                                         <Icon icon="ant-design:youtube-outlined" color="white" width="30" />
        //                                     </div>
        //                                     <div>
        //                                         <Icon icon="iconoir:instagram" color="white" width="30" />
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </section>
        //                 )) :
        //                 <p className="text-dark" style={{ textAlign: 'center' }}><b>{isError}</b></p>
        //     }
        // </div>
        <div className="commingSoonClass">
            <h2>Comming soon...</h2>
        </div>
    );
}

export default About;