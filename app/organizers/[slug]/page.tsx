import { Organizer } from "@/app/lib/types";
import Image from "next/image";
import ImageEvent from "@/app/(components)/events/imageevent";
import { Event } from "@/app/lib/types";
import { Montserrat } from "next/font/google";
import { CSSProperties } from "react";
import Link from "next/link";
import Edit from "@/app/(components)/auth/edit";

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
});

const buttonStyles: CSSProperties = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 'bold',
    padding: '10px 20px',
    fontSize: '1em',
    textDecoration: 'none',
    marginLeft: 'auto',
}


async function getData(slug: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/organizers/${slug}`);

    if(!res.ok) {
        throw new Error("Failed to get Organizer data");
    }

    const organizer: Organizer = (await res.json()).body;
    const events = await Promise.all(organizer.events.map(async (e) => {
        const id = e._key.path.segments.slice(-1)[0];
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/events/${id}`);

        if(!res.ok) {
            console.log(`Failed to get event data for ${id}`);
        } else {
            const json = await res.json();
            return json.body;
        }
    }));

    return {
        organizer: organizer,
        events: events,
    };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { organizer, events } = await getData(params.slug);
    const upcoming: Event[] = []; // TODO: sort by date
    const past: Event[] = [];

    events.forEach((event: Event) => (event.start_time.seconds*1000) < new Date().getSeconds() ? upcoming.push(event) : past.push(event));

    return(
        <div className = "min-h-screen h-fit px-[5%] bg-paper-bg bg-no-repeat bg-center bg-cover">
            <p className = "text-5xl font-extrabold pt-20">
                {organizer.name}
            </p>
            <Edit url={"/setup"} />
            <div className = "mt-5 inline-block lg:flex justify-between place-content-center gap-x-20">
                <div>
                    <table className="table-auto text-lg mt-5 max-w-[650px]">
                        <tbody>
                            <tr>
                                <td className = {`${montserrat.className} montserrat pr-5 align-top`}>Categories</td>
                                <td className = "pb-5">FOOD</td>
                            </tr>
                            <tr>
                                <td className = {`${montserrat.className} montserrat pr-5 align-top`}>Bio</td>
                                <td className = "pb-5">{organizer.desc}</td>
                            </tr>
                            <tr>
                                <td className = {`${montserrat.className} montserrat pr-5 align-top`}>Events hosted</td>
                                <td className = "pb-5">{organizer.events.length}</td>
                            </tr>
                            <tr>
                                <td className = {`${montserrat.className} montserrat pr-5 align-top`}>Email</td>
                                <td className = "pb-5">{organizer.email}</td>
                            </tr>
                        </tbody>
                    </table>
                    
            </div>
            <div>
                <Image
                    src = {organizer.img}
                    alt = "Organizer PFP"
                    width = {360}
                    height = {360}
                    style = {{borderRadius: "8px", objectFit: "contain"}}
                />
                {Object.entries(organizer.channels).map(([key, value]) => (
                    <p className={`${montserrat.className} montserrat pr-5 align-top my-4`} key={key}>
                        <Link href={value} target = "_blank">{key}</Link>
                    </p>
                ))}
            </div>
        </div>
        <div className = "my-16">
            <p className = "text-2xl font-bold">Upcoming Events</p>
            <div className = "overflow-x-scroll">
                {upcoming.length > 0 ? upcoming.map((event, index) => 
                    <div className = "max-w-80" key={index}>
                        <ImageEvent event={event} />
                    </div>
                ) : <p className = {`${montserrat.className} font-bold`}>Oops! There are no upcoming events for this organizer!</p>}
            </div>
        </div>

        <div className = "my-16">
            <p className = {`${montserrat.className} text-2xl font-bold`}>Past Events</p>
            
            <div className = "flex gap-5 overflow-x-scroll py-8">
                {past.length ? past.map((event, index) => (
                    <Image
                        src = "https://www.bizzabo.com/wp-content/uploads/2021/09/philadelphia-event-venues-red-wall.png"
                        alt = "bird"
                        height = {300}
                        width = {300}
                        style = {{objectFit: "cover", borderRadius: "12px", height: "300px"}}
                        key = {index}
                    />
                )) : 
                <p className = {`${montserrat.className} font-bold`}>Oops! There are no past events for this organizer!</p>
                }
            </div>
        </div>
    </div>
    )
}
