import './Homepage.css';


export default function Home() {


  return (
 
    <>
        <div className="Home" >
            <div>
                {/* <NavBar/> */}
                <div className = "center-container">
                    
                <div className = "title">
                    <span className="text-style montserrat"> Promos </span> 
                    <span className="text-style dr-sugiyama-regular"> @ </span> 
                    <span className="text-style montserratStroke">Penn</span>
                </div>

                <div className="explore-link-container">
                    <a href="/explore" className="text-style montserratStroke explore-link">Explore</a>
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
