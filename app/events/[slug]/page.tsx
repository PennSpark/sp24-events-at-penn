import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
})

const imageGallery: string[] = [];
const relevantEvents = Array(6).fill(0);
const event = {
    organizer: "Organizer 1",
    organizerLink: "/organizers/organizer1",
    organizerImg: "https://th-thumbnailer.cdn-si-edu.com/IxLk-Pyqergx4Zks2k7m2rqIEvA=/1072x720/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e8/e0/e8e0c712-dddc-42ae-ad7a-0452d5bd4be4/bat.jpg",
    time: "3/17 6-7pm",
    tags: ["Sports🏈"],
    location: "Annenburg Center",
    address: "1234 Locust Walk",
    registration: "youtube.com",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis, enim quis scelerisque placerat, justo leo fringilla lacus, et lobortis urna purus a nunc. Quisque facilisis ipsum ornare metus accumsan congue. Proin cursus justo ut condimentum pellentesque."
}

export default function Event({ params }: { params: { slug: string } }) {
    return (
        <div className = "min-h-screen h-fit px-[5%] bg-paper-bg bg-no-repeat bg-center bg-cover">
            
            <p className = "text-5xl font-extrabold pt-20">
                {params.slug}
            </p>
            <div className = "inline-block lg:flex justify-between gap-4 place-content-center gap-x-20">
            
                <table className="table-auto text-lg mt-5 max-w-[650px]">
                    <tbody>
                        <tr>
                            <td className = {`${montserrat.className} montserrat pr-5 align-top`}>Organizer</td>
                            <td className = "pb-5 text-[#15009A] font-bold flex items-center relative">
                                <Link href = "/organizers/organizer">
                                    <Image
                                        src = "https://th-thumbnailer.cdn-si-edu.com/IxLk-Pyqergx4Zks2k7m2rqIEvA=/1072x720/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e8/e0/e8e0c712-dddc-42ae-ad7a-0452d5bd4be4/bat.jpg"
                                        alt = "bat"
                                        width = {50}
                                        height = {50}
                                        fill = {false}
                                        className = "rounded-full mr-3 w-9 h-9"
                                        style={{objectFit: "cover"}}
                                    />
                                </Link>
                                <Link href = "/organizers">{event.organizer}</Link>
                                </td>
                        </tr>
                        <tr>
                            <td className = {`${montserrat.className} montserrat pr-5 align-top`}>Time</td>
                            <td className = "pb-5">{event.time}</td>
                        </tr>
                        <tr>
                            <td className = {`${montserrat.className} montserrat pr-5 align-top`}>Tag(s)</td>
                            <td className = "pb-5">
                                {event.tags.map((tag, index) => (
                                    <p className = "bg-[#BEDBE3] w-fit rounded-full px-4" key = {index}>{tag}</p>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td className = {`${montserrat.className} montserrat pr-5 align-top`}>Location</td>
                            <td className = "pb-5">{event.location}</td>
                        </tr>
                        <tr>
                            <td className = {`${montserrat.className} montserrat pr-5 align-top`}>Address</td>
                            <td className = "pb-5">{event.address}</td>
                        </tr>
                        <tr>
                            <td className = {`${montserrat.className} montserrat pr-5 align-top`}>Registration</td>
                            <td className = "pb-5 text-[#15009A]"><Link href = {event.registration}>{event.registration}</Link></td>
                        </tr>
                        <tr>
                            <td className = {`${montserrat.className} montserrat pr-5 align-top`}>Description</td>
                            <td className = "pb-5">{event.description}</td>
                        </tr>
                    </tbody>
                </table>
            <div>
                <Image
                    src = "https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
                    alt = "cat"
                    width = {520}
                    height = {520}
                    style = {{borderRadius: "8px", objectFit: "contain"}}
                    className = "pt-5 lg:pt-0 mx-auto"
                />
            </div>
            <Image 
                src = "/images/person2.png"
                alt = "person image"
                width = {220}
                height = {220}
                className = "absolute left-[50%] -translate-x-1/2 hidden lg:block"
            />
        </div>
                
        <div className = "my-16">
            <p className = {`${montserrat.className} text-2xl mb-5 font-bold`}>Image Gallery</p>
            
            
            {imageGallery.length > 0 ? (
                <div className = "flex gap-5 overflow-x-scroll my-8">
                    {imageGallery.map((img, index) => (
                        <Image
                            src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Labrador_Retriever_portrait.jpg/1200px-Labrador_Retriever_portrait.jpg"
                            alt = "dog"
                            height = {400}
                            width = {400} 
                            style = {{objectFit: "cover", borderRadius: "12px"}}  
                            key = {index}
                        />
                        
                    ))}
                </div>
            ) : (
                <div className = "flex">
                    <p className = {`${montserrat.className} font-bold`}>Ops! No image has been posted yet!</p>
                    <Image
                        alt = "bulb"
                        src = "/images/bulb.png"
                        width = {120}
                        height = {120}
                        className = "-mt-10 -ml-4 origin-center rotate-[80deg]"
                    />
                </div>
            )}
        </div>

        <div className = "my-16">
            <p className = {`${montserrat.className} text-2xl font-bold`}>Relevant Events</p>
            
            <div className = "flex gap-5 overflow-x-scroll my-8">
                {relevantEvents.map((event, index) => (
                    <Image
                        src = "https://cdn.pixabay.com/photo/2016/12/13/22/25/bird-1905255_1280.jpg"
                        alt = "bird"
                        height = {400}
                        width = {400}   
                        style = {{objectFit: "cover", borderRadius: "12px"}}
                        key = {index}
                    />
                ))}
            </div>
            
        </div>
    </div>
    );
}
