import React, { Suspense } from 'react';
import Header from '../(components)/header';
import Events from '../(components)/events/events';
import './Explore.css'
async function getData() {
    const eventsRes = await fetch(`http://localhost:3000/api/events`);
    const tagsRes = await fetch('http://localhost:3000/api/tags');

    if(!eventsRes.ok && !tagsRes.ok) {
        return { events: [], tags: [] };
    }

    return { events: (await eventsRes.json()).body, tags: (await tagsRes.json()).body };
}

export default async function Explore() {
    const { events, tags } = await getData();

    return (
        <div className="explore">
            <Header isAuthenticated={true} />
            <div>
                <Events events={events} tags={tags} />
            </div>
        </div>
    );
}
