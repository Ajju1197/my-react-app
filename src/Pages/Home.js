import './PagesStyles.css';
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { useTypewriter } from 'react-simple-typewriter';
import { useAuthContext } from "../Hooks/useAuthContext";

const Home = () => {
    const {user} = useAuthContext();
    const [technologies] = useTypewriter({
        words: ['MERN','MONGO DB','EXPRESS JS','REACT','Angular', 'NODE JS'],
        loop: 0
    })
    const navigate = useNavigate();
    return (
        <div className="homePageClass">
            <div className="main-block">
                <div className="headingBlock">
                    <h1 className="homePageTitle">SYED AJMATHULLA</h1>
                    <p className="subHeading">I am a <span className="mernClass">{technologies}</span> Developer</p>
                </div>
                <div className="aboutMeBtn">
                    <div className="btns">
                        {user ? <a onClick={()=>navigate('/about')} className='aboutLoginBtn ps-3'><AiOutlineDoubleRight className="rightArrowIcon"/> ABOUT ME</a> : <a onClick={()=>navigate('/')} className='aboutLoginBtn'>Signin</a>}
                        {user ? null : <span className="orClass">Or</span>}
                        {user ? <a download href="#" className='aboutLoginBtn'>Download CV</a> : <Link to="/register" className='aboutLoginBtn'>Signup</Link>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;