import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";

const About = () => {

    const [userData, setUserData] = useState({});
    const [useLoadingSpin, setLoadingSpin] = useState(false);
    const navigate = useNavigate();

    const callAboutPage = async () => {
        try {
            setLoadingSpin(true);
            const res = await fetch("/about", {
                method: 'GET', // or 'PUT'
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            const data = await res.json();
            console.log(`From About.js ${data}`);
            setUserData(data);

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
        <div>
            {useLoadingSpin ? <LoadingSpinner/> : <h2>{userData.name}</h2>}
            <p>This is the about page where you can learn about us.</p>
        </div>
    );
}

export default About;