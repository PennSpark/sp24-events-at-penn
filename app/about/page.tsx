import './AboutPage.css';

export default function About() {
    return (
        <div className = "About">
            <div className = "center-content">
            <div className = "what-is">
                <h1 className = 'montserratStroke' >Welcome to SocialCalendar@Penn!</h1>
                <h2 className = 'montserratStroke' >WHAT IS SocialCalendar@PENN?</h2>
                <p>
                Looking for something fun to do during the weekend? SocialCalendar@Penn is a one-stop shop for Penn students to find out social events. The platform not only offers Penn students a convenient overview of what is happening around the campus but also to assist organizations in gaining more visibility. With SocialCalendar, you will never miss another social gathering, restaurant promotion, or party again.           </p>
             </div>

             <div className = "for-whom">
                <h2 className = 'montserratStroke' >FOR WHOM?</h2>
                <p>
                    All <b>off-campus social organizations</b> are welcomed to join us and promote your events here! From exclusive restaurant promotions to store discounts, themed parties to social gatherings, SocialCalendar@Penn covers it all.               
                </p>
            </div>

             <div className = "who-are-we">
                <h2 className = 'montserratStroke' >WHO ARE WE?</h2>
                <p>
                Established in Spring 2021, Spark is a community of student developers and designers at the University of Pennsylvania that builds both creative and client projects. Find out more about us <a href="https://pennspark.org/" className="underline-link">here</a>
                !
                </p>
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