"use client"
import Image from "next/image";
import { Event } from "@/app/lib/types";
import { CSSProperties } from "react";
import Link from "next/link";

const imageStyle: CSSProperties = {
    borderRadius: '10px',
    display: 'block',
}

const imageTextStyle: CSSProperties = {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    color: 'white',
    fontSize: '14px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '5px',
    borderRadius: '5px',
    display: 'none',
    width: '90%',
}

const containerStyle = (tall: boolean): CSSProperties => ({
    marginBottom: '1em',
    position: 'relative',
    height: tall ? '300px' : '250px',
})

const ImageEvent: React.FC<{ event: Event, tall: boolean }> = ({ event, tall }) => {
    const date = new Date(event.start_time.seconds * 1000).toLocaleString("en-US").split(", ");

    return(
        <div style={containerStyle(tall)}
            onMouseEnter={e => (e.currentTarget.lastChild as HTMLElement).style.display = 'block'}
            onMouseLeave={e => (e.currentTarget.lastChild as HTMLElement).style.display = 'none'}
        >
            
            <Link href={`/events/${event.slug}`}>
                <Image src={event.img} alt={event.name + " image"} style={imageStyle} fill />
            </Link>
                <div style={imageTextStyle}>
                    Date: {date[0]}<br />
                    Time: {date[1]}<br />
                    Location: {event.location.longitude}
                </div>
        </div>
    )
}

export default ImageEvent;