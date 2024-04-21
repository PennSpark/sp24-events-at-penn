import React from 'react';
import ImageEvent from './imageevent';
import { Event } from '@/app/lib/types';
import { GeoPoint, Timestamp } from '@firebase/firestore';

const imageGrid = {
    columnCount: 4,
    columnGap: '1em',
    margin: '0 auto',
}

const placeholder: Event = {
    name: 'Loading name...',
    desc: 'Loading description...',
    location: {
        name: "Loading location...",
        geopoint: new GeoPoint(0, 0),
    },
    start_time: Timestamp.fromDate(new Date()),
    end_time: Timestamp.fromDate(new Date()),
    img: 'https://www.solidbackgrounds.com/images/1920x1080/1920x1080-gray-solid-color-background.jpg',
    slug: '',
    tags: [],
    organization: [],
    views: 0,
    price: 0,
    max_occupancy: 0,
    is_active: false,
    signup_deadline: Timestamp.fromDate(new Date()),
    date_published: Timestamp.fromDate(new Date()),
}

const ImageGrid: React.FC<{ events?: Event[] }> = ({ events }) => {
    if (!events || events.length === 0) {
        return <div style={{ textAlign: 'center', marginTop: '20px' }}>No event found.</div>;
    }

    return (
        <div style={imageGrid}>
            {events ?
                events.map((event, index) => (
                    <ImageEvent key={index} event={event} />
                ))
                : [...Array(20)].map((event, index) => (
                    <ImageEvent key={index} event={placeholder} />
                ))
            }
        </div>
    );
};

export default ImageGrid;
