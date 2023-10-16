import './PagesStyles.css';
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { useTypewriter } from 'react-simple-typewriter';
import { useAuthContext } from "../Hooks/useAuthContext";
import { useSelector } from 'react-redux';

const Home = () => {
    // const {user} = useAuthContext();
    const currUser = useSelector(state => state.login);
    const {user} = currUser.user;
    
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
                        {user ? <a onClick={()=>navigate('/about')} className='btnLoginBtn ps-3'><span className="mernArrowIconClass"></span> ABOUT ME</a> : <a onClick={()=>navigate('/')} className='btnLoginBtn'>Signin</a>}
                        {user ? null : <span className="orClass">Or</span>}
                        {user ? <a download href="#" className='btnLoginBtn'>Download CV</a> : <Link to="/register" className='btnLoginBtn'>Signup</Link>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;