import Link from 'next/link';
import './Homepage.css';

export default function Home() {
  return (
    <>
        <div className="Home" >
            <div>
                <div className = "center-container">
                    
                <div className = "title">
                    <span className="text-style montserrat"> SocialCalendar </span> 
                    <span className="text-style dr-sugiyama-regular"> @ </span> 
                    <span className="text-style montserratStroke">Penn</span>
                </div>

                <div className="explore-link-container">
                    <Link href="/interests" className="text-style montserratStroke explore-link">Explore</Link>
                </div>
               
                <div className="explore-bulb"></div>
                <div className="explore-person-with-hat"></div>
                <div className="explore-confetti"></div>
                <div className="explore-rocket"></div>
                <div className="explore-smile"></div>
                <div className="explore-sitting-person"></div>
                <div className="explore-exclamation"></div>
                <div className="explore-scribble"></div>
                <div className="explore-underline"></div>
                </div>
            </div>
    </div>
    </>
);

}
