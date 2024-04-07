import Image from "next/image";

const images = Array(16).fill(0);

export default function Events({ params }: { params: { slug: string } }) {
    return (
    
        <div className = "min-h-screen h-fit mx-24 mt-10">

            <p className = "font-bold text-5xl">Explore the SocialCalendar@Penn!</p>
            <p className = "font-semibold text-xl mt-2">Take a look at what's going on today</p>
        
            <div className = "grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] auto-rows-[170px] grid-flow-dense gap-5 my-20">
                {images.map((img, index) => (
                    <div>
                        <Image
                            src = "https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?cs=srgb&dl=pexels-pixabay-47547.jpg&fm=jpg"
                            alt = "event"
                            height = {200}
                            width = {200}   
                        />
                    </div>
                ))}
            </div>
        </div>
    
    );
}
