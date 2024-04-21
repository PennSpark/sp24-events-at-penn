import { Organizer } from "@/app/lib/types";
import Image from "next/image";
import ImageEvent from "@/app/(components)/events/imageevent";
import { Event } from "@/app/lib/types";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
})

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
    const upcoming: Event[] = [];
    const past: Event[] = [];

    events.forEach((event: Event) => (event.start_time.seconds*1000) < new Date().getSeconds() ? upcoming.push(event) : past.push(event));

    return(
        <div className = "min-h-screen h-fit px-[5%] bg-paper-bg bg-no-repeat bg-center bg-cover">
            <p className = "text-5xl font-extrabold pt-20">
                {organizer.name}
            </p>
            <div className = "inline-block lg:flex justify-between gap-4 place-content-center gap-x-20">
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
                                        <h2>{}</h2>
                                    </td>
                                    <td>{organizer.events[0].id}</td>
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
            </div>
        </div>
        <div className = "my-16">
            <p className = "text-2xl font-bold">Upcoming Events</p>
            <div className = "overflow-x-scroll">
                {upcoming.map((event, index) => 
                    <div className = "max-w-80" key={index}>
                        <ImageEvent event={event} tall={false} />
                    </div>
                )}
            </div>
        </div>

        <div className = "my-16">
            <p className = "text-2xl font-bold">Past Events</p>
            <div className = "overflow-x-scroll">
                {past.map((event, index) =>
                    <div className = "max-w-80" key={index}>
                        <ImageEvent event={event} tall={false} />
                    </div>
                )}
            </div>
        </div>
    </div>
    )
}
