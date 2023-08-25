import React from "react";
import { useNavigate } from "react-router-dom";
import myProfile from '../images/ajjuProfile.jpg'
import myProfile1 from '../images/syed.jpeg';
import './PagesStyles.css'

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="homePageClass">
            <div className="main-block">
                {/* <img src={myProfile1} alt='Syed'/> */}
                <h2 className="homePageTitle">Home Page</h2>
                <p>This is the home page where you can learn.</p>
            </div>
            <div className="overlay"></div>
            {/* <button className="btn btn-primary" onClick={() => navigate('orderSummary')}>Place Order</button> */}
        </div>
    );
}

export default Home;