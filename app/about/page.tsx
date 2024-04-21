import './AboutPage.css';

export default function About() {
    return (
        <div className = "About">
            <div className = "center-content">
            <div className = "what-is">
                <h1 className = 'montserratStroke' >Welcome to SocialCalendar@Penn!</h1>
                <h2 className = 'montserratStroke' >WHAT IS SocialCalendar@PENN?</h2>
                <p>
                SocialCalendar@Penn is a “social calendar” that would serve as a one-stop shop for Penn students to find promotional/exclusive events at our university. We aspire not only to offer Penn students a convenient overview of promotions near them but also to assist on-campus organizations in gaining more visibility.          </p>
             </div>

             <div className = "who-are-we">
                <h2 className = 'montserratStroke' >WHO ARE WE?</h2>
                <p>
                Established in Spring 2021, Spark is a community of student developers and designers at the University of Pennsylvania that builds both creative and client projects. Find out more about us  
                <a href="https://pennspark.org/"> here</a>
                !
                </p>
            </div>

            <div className = "for-whom">
                <h2 className = 'montserratStroke' >FOR WHOM?</h2>
                <p>
                Promos@Penn is designed for University of Pennsylvania students seeking promotional/exclusive events and for on-campus organizations to publicize their activities. 
Your events deserve to be noticed!                </p>
            </div>

                <div className="about-rocket"></div>
                <div className="about-smile"></div>
                <div className="about-person-thinking"></div>
                <div className="about-confetti"></div>
                <div className="about-artist"></div>
                <div className="about-campfire-people"></div>
                <div className="about-person-with-hat"></div>
            </div>
        </div>
    );
}
