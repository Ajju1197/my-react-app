import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import aboutProfile from '../images/aboutProfilePhoto.jpeg';

const About = () => {

    const [userData, setUserData] = useState([]);
    const [useLoadingSpin, setLoadingSpin] = useState(false);
    const navigate = useNavigate();

    const callAboutPage = async () => {
        try {
            setLoadingSpin(true);
            // const res = await fetch("/about", {
            //     method: 'GET', // or 'PUT'
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     credentials: 'include',
            // });
            const res = await fetch('http://localhost:5000/aboutUserDetails');
            const dataList = await res.json();
            console.log(`From About.js ${JSON.stringify(dataList)}`);
            setUserData(dataList);

            if (res.status !== 200) {
                throw new Error(res.error);
            }
            setLoadingSpin(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        callAboutPage();
    }, []);

    return (
        <div className="aboutPageClass">
            {
                useLoadingSpin ? <LoadingSpinner/> :
                userData.map(data => (
                    <div className="about_card_block card">
                        <div className="aboutBgImg">
                            <img src={aboutProfile} alt="bgImage" />
                        </div>
                        <div className="about_left_block">
                            <img src={aboutProfile} alt="Syed Ajmathulla" />
                        </div>
                        <div className="about_right_block">
                            <label htmlFor="">Name:</label>
                            <label htmlFor="">{data.name}</label>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default About;