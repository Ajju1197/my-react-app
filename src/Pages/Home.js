import React from "react";
import { useNavigate } from "react-router-dom";
import './PagesStyles.css';
import Typed from 'react-typed';
import { AiOutlineDoubleRight } from "react-icons/ai";


const Home = ({isLoggedIn}) => {
    const technologies = ['MERN','MONGO DB','EXPRESS JS','REACT','NODE JS']
    const navigate = useNavigate();
    return (
        <div className="homePageClass">
            <div className="main-block">
                <div className="headingBlock">
                    <h1 className="homePageTitle">SYED AJMATHULLA</h1>
                    <p className="subHeading">I am a <Typed className="mernClass" strings={technologies}
                    typeSpeed={100}
                    backSpeed={100}
                    loop /> Developer</p>
                </div>
                <div className="aboutMeBtn">
                    <AiOutlineDoubleRight className="rightArrowIcon"/>
                    {isLoggedIn ? <a onClick={()=>navigate('/about')} className='aboutLoginBtn'>ABOUT ME</a> : <a onClick={()=>navigate('/')} className='aboutLoginBtn'>LOGIN</a>}
                </div>
            </div>
        </div>
    );
}

export default Home;