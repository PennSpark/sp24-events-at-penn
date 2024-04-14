import React, { useState } from 'react';

interface Image {
    src: string;
    alt: string;
    date: string;
    time: string;
    location: string;
}

interface GridStyles {
    imageGrid: React.CSSProperties;
    gridItem: React.CSSProperties;
    image: React.CSSProperties;
    imageText: React.CSSProperties;
}

const gridStyles: GridStyles = {
    imageGrid: {
        columnCount: 4,
        columnGap: '1em',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    gridItem: {
        marginBottom: '1em',
        breakInside: 'avoid',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '10px',
        display: 'block',
    },
    imageText: {
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
    },
};

const ImageGrid: React.FC = () => {
    const [images, setImages] = useState<Image[]>([
        { src: 'https://via.placeholder.com/300x300?text=Image+1', alt: 'Placeholder 1', date: 'Jan 1, 2024', time: '3:00 PM', location: 'Park' },
        { src: 'https://via.placeholder.com/300x350?text=Image+2', alt: 'Placeholder 2' , date: 'Jan 1, 2024', time: '3:00 PM', location: 'Park'},
        { src: 'https://via.placeholder.com/300x400?text=Image+3', alt: 'Placeholder 3' , date: 'Jan 1, 2024', time: '3:00 PM', location: 'Park'},
        { src: 'https://via.placeholder.com/300x450?text=Image+4', alt: 'Placeholder 4', date: 'Jan 1, 2024', time: '3:00 PM', location: 'Park' },
        { src: 'https://via.placeholder.com/300x500?text=Image+5', alt: 'Placeholder 5', date: 'Jan 1, 2024', time: '3:00 PM', location: 'Park' },
        { src: 'https://via.placeholder.com/300x550?text=Image+6', alt: 'Placeholder 6' , date: 'Jan 1, 2024', time: '3:00 PM', location: 'Park'},
        { src: 'https://via.placeholder.com/300x300?text=Image+7', alt: 'Placeholder 7', date: 'Jan 1, 2024', time: '3:00 PM', location: 'Park' },
        { src: 'https://via.placeholder.com/300x350?text=Image+8', alt: 'Placeholder 8' , date: 'Jan 1, 2024', time: '3:00 PM', location: 'Park'},
        { src: 'https://via.placeholder.com/300x400?text=Image+9', alt: 'Placeholder 9' , date: 'Jan 1, 2024', time: '3:00 PM', location: 'Park'},
        { src: 'https://via.placeholder.com/300x450?text=Image+10', alt: 'Placeholder 10', date: 'Jan 1, 2024', time: '3:00 PM', location: 'Park' },
        { src: 'https://via.placeholder.com/300x500?text=Image+11', alt: 'Placeholder 11' , date: 'Jan 1, 2024', time: '3:00 PM', location: 'Park'},
        { src: 'https://via.placeholder.com/300x550?text=Image+12', alt: 'Placeholder 12' , date: 'Jan 1, 2024', time: '3:00 PM', location: 'Park'},
    ]);



    return (
        <div style={gridStyles.imageGrid}>
            {images.map((img, index) => (
                <div key={index} style={gridStyles.gridItem}
                     onMouseEnter={e => (e.currentTarget.lastChild as HTMLElement).style.display = 'block'}
                     onMouseLeave={e => (e.currentTarget.lastChild as HTMLElement).style.display = 'none'}>
                    <img src={img.src} alt={img.alt} style={gridStyles.image} />
                    <div style={gridStyles.imageText}>
                        Date: {img.date}<br />
                        Time: {img.time}<br />
                        Location: {img.location}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ImageGrid;
