import Image from "next/image";
import Link from 'next/link'
import './Homepage.css';

export default function Home() {
  // return (
  //   <>
  //     <div className = "min-h-screen h-fit place-content-center grid justify-items-center">
  //         <p className = "font-extrabold text-6xl mt-[-20%]">SocialCalendar@Penn</p>
  //         <Link href="/events">
  //           <p className = "font-extrabold text-2xl underline underline-offset-8 bg-yellow-200" 
  //             style = {{
  //               transform: "rotate(-4deg)",
  //               textDecoration: "underline 3px"
  //             }}>
  //             Explore!
  //           </p>
  //         </Link>
        
  //     </div>
  //   </>
  // );



  return (
 
    <>
        <div className="Home" >
            <div>
                {/* <NavBar/> */}
                <div className = "center-container">
                    
                <div className = "title">
                    <span className="text-style montserrat"> Events </span> 
                    <span className="text-style dr-sugiyama-regular"> @ </span> 
                    <span className="text-style montserratStroke">Penn</span>
                </div>

                <div className="explore-link-container">
                    <a href="/events" className="text-style montserratStroke explore-link">Explore</a>
                </div>
               
                {/* <div className="explore-bulb"></div>
                <div className="explore-person-with-hat"></div>
                <div className="explore-confetti"></div>
                <div className="explore-rocket"></div>
                <div className="explore-smile"></div>
                <div className="explore-sitting-person"></div>
                <div className="explore-exclamation"></div> */}

                </div>
            </div>
    </div>
    </>
);

}
