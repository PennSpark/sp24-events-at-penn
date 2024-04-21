"use client"
import Image from "next/image";
import { Event } from "@/app/lib/types";
import React, { CSSProperties } from "react";
import Link from "next/link";

const imageStyle: CSSProperties = {
    borderRadius: '10px',
    display: 'block',
}

const imageTextStyle: CSSProperties = {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '30px',
    fontWeight: 'bold',
    fontFamily: 'Inter, sans-serif',
    padding: '5px',
    borderRadius: '5px',
    display: 'none',
    width: '90%',
    textAlign: 'left'
}

const containerStyle: CSSProperties = {
    marginBottom: '1em',
    position: 'relative',
};

const ImageEvent: React.FC<{ event: Event }> = ({ event }) => {
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

    const eventDate = new Date(event.start_time.seconds * 1000);
    const dateString = eventDate.toLocaleDateString("en-US", dateOptions);
    const timeString = eventDate.toLocaleTimeString("en-US", timeOptions);

    const date = new Date(event.start_time.seconds * 1000).toLocaleString("en-US").split(", ");

    return (
        <div style={containerStyle}
             onMouseEnter={e => (e.currentTarget.lastChild as HTMLElement).style.display = 'block'}
             onMouseLeave={e => (e.currentTarget.lastChild as HTMLElement).style.display = 'none'}
        >
            <Link href={`/events/${event.slug}`} prefetch>
                <Image src={event.img} alt={event.name + " image"} style={imageStyle} layout='responsive' width={300} height={300} />
            </Link>
            <div style={imageTextStyle}>
                {dateString}<br />
                {timeString}<br />
                {event.name}
            </div>
        </div>
    )
}

export default ImageEvent;