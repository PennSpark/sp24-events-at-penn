import { Organizer } from "@/app/lib/types";
import Image from "next/image";
import ImageEvent from "@/app/(components)/events/imageevent";
import { Event } from "@/app/lib/types";
import { Montserrat } from "next/font/google";
import { CSSProperties } from "react";

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
    const res = await fetch(`http://localhost:3000/api/organizers/${slug}`);

    if(!res.ok) {
        throw new Error("Failed to get Organizer data");
    }

    const organizer: Organizer = (await res.json()).body;
    const events = await Promise.all(organizer.events.map(async (e) => {
        const id = e._key.path.segments.pop();
        const res = await fetch(`http://localhost:3000/api/events/${id}`);

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
            <div className = "inline-block lg:flex justify-start gap-x-60 place-content-center">
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
                        </tbody>
                    </table>
                    {upcoming.length > 0 && (
                        <table className="table-auto text-lg mt-5">
                            <tbody>
                                <tr>
                                    <td className = {`${montserrat.className} montserrat pr-5 align-top`}>
                                        {organizer.name}&apos;s next event is
                                        <h2>{upcoming[0].name}</h2>
                                        <sub>{new Date(upcoming[0].start_time.seconds * 1000).toLocaleString("en-US")}</sub>
                                        <button style={buttonStyles}>
                                            SEE MORE
                                        </button>
                                    </td>
                                    <td>{upcoming[0].desc}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
            </div>
            <div>
                <Image
                    src = {organizer.img}
                    alt = "Organizer PFP"
                    width = {300}
                    height = {300}
                    style = {{borderRadius: "8px", objectFit: "contain"}}
                />
                {Object.entries(organizer.channels).map(([key, value]) => (
                    <p className={`${montserrat.className} montserrat pr-5 align-top my-4`} key={key}>
                        <a href={value}>{key}</a>
                    </p>
                ))}
            </div>
        </div>
        <div className = "my-16">
            <p className = "text-2xl font-bold">Upcoming Events</p>
            <div className = "overflow-x-scroll">
                {upcoming.length > 0 ? upcoming.map((event, index) => 
                    <div className = "max-w-80" key={index}>
                        <ImageEvent event={event} tall={false} />
                    </div>
                ) : <sub className = "text-gray-800">{organizer.name} has no upcoming events</sub>}
            </div>
        </div>

        <div className = "my-16">
            <p className = "text-2xl font-bold">Past Events</p>
            <div className = "overflow-x-scroll">
                {past.length > 0 ? past.map((event, index) =>
                    <div className = "max-w-80" key={index}>
                        <ImageEvent event={event} tall={false} />
                    </div>
                ) : <sub className = "my-8">{organizer.name} has no past events</sub>}
            </div>
        </div>
    </div>
    )
}
