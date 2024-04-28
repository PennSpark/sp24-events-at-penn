export const dynamic = 'force-dynamic';
import React, { Suspense } from 'react';
import Header from '../(components)/header';
import Events from '../(components)/events/events';
import './Explore.css'

async function getData() {
    const eventsRes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/events`);
    const tagsRes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/tags`);

    if(!eventsRes.ok || !tagsRes.ok) {
        return { events: [], tags: [] };
    }

    return { events: (await eventsRes.json()).body, tags: (await tagsRes.json()).body };
}

export default async function Explore() {
    const { events, tags } = await getData();

    return (
        <div className="explore">
            <Suspense>
            <Header />
            <div>
                <Events events={events} tags={tags} />
            </div>
            </Suspense>

        </div>
    );
}
