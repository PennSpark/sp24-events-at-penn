import React, { Suspense } from 'react';
import Header from '../(components)/header';
import Events from '../(components)/events/events';
import './Explore.css'
async function getData() {
    const res = await fetch(`http://localhost:3000/api/events`);

    if(!res.ok) {
        return { events: [] };
    }

    return res.json();
}

export default async function Explore() {
    const events = await (await getData()).body;

    return (
        <div className="explore">
            <Header isAuthenticated={true} />
            <div>
                <Suspense fallback={<Events />}>
                    <Events events={events} />
                </Suspense>
            </div>
        </div>
    );
}
