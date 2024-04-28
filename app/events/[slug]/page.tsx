
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ['latin'],
})

const imageGallery: string[] = [];
const relevantEvents = Array(6).fill(0);

async function getData(slug: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/events/${slug}`);
    const json = await res.json();
    if(!res.ok) {
        console.log(`Failed to get event data for ${slug}`);
        return { eventData: null }
    }

    const toReturn = json.body;
    if (toReturn.organizers === undefined || toReturn.tags === undefined) {
        return { eventData: json.body, organizerData: undefined, tagData: undefined };
    }

    const organizers = await Promise.all(toReturn.organizers.map(async (e) => {
        const id = e._key.path.segments.slice(-1)[0];
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/organizers/${id}`);

        if(!res.ok) {
            console.log(`Failed to get organizer data for ${id}`);
        } else {
            const json = await res.json();
            return json.body;
        }
    }));

    const tags = await Promise.all(toReturn.tags.map(async (e) => {
        const id = e._key.path.segments.slice(-1)[0];
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/tags/${id}`);

        if(!res.ok) {
            console.log(`Failed to get tag data for ${id}`);
        } else {
            const json = await res.json();
            return json.body;
        }
    }));

    return { eventData: json.body, organizerData: organizers, tagData: tags };
}


export default async function Event({ params }: { params: { slug: string } }) {

    const { eventData, organizerData, tagData } = await getData(params.slug);

    if (organizerData === undefined || eventData === undefined) {
        return (<div className = "grid place-content-center h-[80vh]">
                <h1>404 - Page Not Found</h1>
            </div>)
    }

    return (
        <div className = "min-h-screen h-fit px-[5%] bg-paper-bg bg-no-repeat bg-center bg-cover">
            
            <p className = "text-5xl font-extrabold pt-20">
                {eventData.name}
            </p>
            <div className = "mt-5 inline-block lg:flex justify-between place-content-center gap-x-20">
            
                <table className="table-fixed text-lg mt-5 max-w-[650px] h-fit">
                    <tbody>
                        <tr>
                            <td className = {`${montserrat.className} montserrat pr-5 align-top`}>Organizer</td>
                            <td className = "pb-5 text-[#15009A] font-bold flex relative">
                                <Link href = {`/organizers/${organizerData[0].slug}`}>
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
                                <Link href = {`/organizers/${organizerData[0].slug}`}>
                                    {organizerData && organizerData.map((organizer, index) => (
                                        <p className = "bg-[#BEDBE3] w-fit rounded-full px-4" key = {index}>{organizer.name}</p>
                                    ))}</Link>
                                </td>
                        </tr>
                        <tr>
                            <td className = {`${montserrat.className} montserrat pr-5 align-top`}>Time</td>
                            <td className = "pb-6 align-top">{eventData.start_time && new Date(eventData.start_time.seconds * 1000).toLocaleString("en-US")}</td>
                        </tr>
                        <tr>
                            <td className = {`${montserrat.className} montserrat pr-5 align-top`}>Tag(s)</td>
                            <td className = "pb-6">
                                <div className = "flex">
                                {tagData && tagData.map((tag, index) => (
                                    <p className = {`bg-[#BEDBE3] w-fit rounded-full px-4 mr-3 align-top ${montserrat.className} font-bold`} key = {index}>{tag.name}</p>
                                ))}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className = {`${montserrat.className} montserrat pr-5 align-top`}>Address</td>
                            <td className = "pb-6 align-top">{eventData.location && eventData.location.name}</td>
                        </tr>
                        <tr>
                            <td className = {`${montserrat.className} montserrat pr-5 align-top`}>Registration</td>
                            <td className = "pb-6 text-[#15009A] align-top">
                                <Link href = {eventData.url ? eventData.url : ""}>
                                    <p className = "max-w-[650px] break-words">{eventData.url && eventData.url} </p>
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td className = {`${montserrat.className} montserrat pr-5 align-top`}>Description</td>
                            <td className = "pb-6 align-top">{eventData ? eventData.desc : ""}</td>
                        </tr>
                    </tbody>
                </table>
            <div>
                <Image
                    src = {eventData.img}
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
