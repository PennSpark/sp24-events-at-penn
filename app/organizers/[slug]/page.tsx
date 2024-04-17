import { app } from "@/app/lib/firebase";
import { Organizer } from "@/app/lib/types";
import { DocumentData, DocumentReference, getDoc, getDocs, getFirestore } from "firebase/firestore";
import Image from "next/image";
import { Event } from "@/app/lib/types";

async function getData(slug: string) {
    const res = await fetch(`http://localhost:3000/api/organizers/${slug}`);

    if(!res.ok) {
        throw new Error("Failed to get Organizer data");
    }

    return res.json();
}

interface EventsProps {
    events: DocumentReference[];
}

const Events: React.FC<EventsProps> = ({ events }) => {
    const arr: Event[] = [];

    events.forEach(async (event) => {
        const key = event._key.path.segments.pop();
        const res = await fetch(`http://localhost:3000/api/events/${key}`);

        events.push((await res.json()).body);
    });

    return(
        <div className= "events">
            {arr.map((event) => 
                <p key={event.name}>{event.name}</p>
            )}
        </div>
    )
}

const images = Array(10).fill(0);

export default async function Page({ params }: { params: { slug: string } }) {
    const res = await getData(params.slug);
    const organizer: Organizer = res.body;

    return(
        <div className = "min-h-screen h-fit px-24 bg-paper-bg bg-no-repeat bg-center bg-cover">
            <p className = "text-5xl font-extrabold pt-20">
                {organizer.name}
            </p>
            <div className = "grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4 place-content-center gap-x-20">
                <div>
                    <table className="table-auto text-lg mt-5 border-separate border-spacing-y-5">
                        <tbody>
                            <tr>
                                <td className = "text-gray-700 pr-5 align-top">Categories</td>
                                <td>FOOD</td>
                            </tr>
                            <tr>
                                <td className = "text-gray-700 pr-5 align-top">Bio</td>
                                <td>{organizer.desc}</td>
                            </tr>
                            <tr>
                                <td className = "text-gray-700 pr-5 align-top">Events hosted</td>
                                <td>{organizer.events.length}</td>
                            </tr>
                        </tbody>
                    </table>
                    {organizer.events.length > 0 && (
                        <table className="table-auto text-lg mt-5">
                            <tbody>
                                <tr>
                                    <td className = "text-gray-700 pr-5 align-top">
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
            
            <div className = "flex gap-5 overflow-x-scroll my-8">
                {/* <Events events={organizer.events} /> */}
            </div>
        </div>

        <div className = "my-16">
            <p className = "text-2xl font-bold">Past Events</p>
            <div className = "flex gap-5 overflow-x-scroll my-8">
                {images.map((img, index) => (
                    <>
                        <Image
                            src = "https://cdn.pixabay.com/photo/2016/12/13/22/25/bird-1905255_1280.jpg"
                            alt = "bird"
                            height = {400}
                            width = {400}   
                        />
                    </>
                ))}
            </div>
            
        </div>
    </div>
    )
}
