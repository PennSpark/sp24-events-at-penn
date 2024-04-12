import Image from "next/image";
import './AboutPage.css';

export default function About() {
    return (
        <div className = "About">
            <div className = "center-content">
            <div className = "what-is">
                <h1 className = 'montserratStroke' >Welcome to Events@Penn!</h1>
                <h2 className = 'montserratStroke' >WHAT IS EVENTS@PENN?</h2>
                <p>
                Events@Penn, the ultimate platform where the vibrant life of our campus comes into focus! This is your one-stop destination for discovering events hosted by various clubs and organizations at Penn. Whether you're looking to expand your horizons, dive deeper into your interests, or just find a fun way to fill your free time, Events@Penn connects you to the heart of our university's community life.                </p>
             </div>

             <div className = "who-are-we">
                <h2 className = 'montserratStroke' >WHO ARE WE?</h2>
                <p>
                Established in Spring 2021, Spark is a community of student developers and designers at the University of Pennsylvania that builds both creative and client projects. Find out more about us here: https://pennspark.org/  
                </p>
            </div>

            <div className = "for-whom">
                <h2 className = 'montserratStroke' >FOR WHOM?</h2>
                <p>
                Events@Penn is designed for University of Pennsylvania students seeking campus events and for student organizations to publicize their activities, fostering an engaged and informed community.                </p>
            </div>
            </div>
        </div>
    );
}
