import Image from "next/image";
import { Event } from "@/app/lib/types";
import { CSSProperties } from "react";

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
    maxWidth: '1200px',
    height: tall ? '300px' : '250px',
})

const ImageEvent: React.FC<{ event: Event, tall: boolean }> = ({ event, tall }) => {
    return(
        <div style={containerStyle(tall)}
            onMouseEnter={e => (e.currentTarget.lastChild as HTMLElement).style.display = 'block'}
            onMouseLeave={e => (e.currentTarget.lastChild as HTMLElement).style.display = 'none'}
        >
            <Image src={event.img} alt={event.name + " image"} style={imageStyle} fill />
            <div style={imageTextStyle}>
                Date: {event.start_time.seconds}<br />
                Time: {event.start_time.seconds}<br />
                Location: {event.location.longitude}
            </div>
        </div>
    )
}

export default ImageEvent;