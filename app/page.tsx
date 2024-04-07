import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className = "min-h-screen h-fit place-content-center grid justify-items-center">
          <p className = "font-extrabold text-6xl mt-[-20%]">SocialCalendar@Penn</p>
          <p className = "font-extrabold text-2xl underline underline-offset-8 bg-yellow-200" 
            style = {{
              transform: "rotate(-4deg)",
              textDecoration: "underline 3px"
            }}>
            Explore!
          </p>
       
        
      </div>
    </>
  );
}
