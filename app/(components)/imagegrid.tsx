import React, { useRef, useState, useEffect } from 'react';
//
interface Image {
    src: string;
    alt: string;
}

interface GridStyles {
    imageGrid: React.CSSProperties;
    gridItem: React.CSSProperties;
    image: React.CSSProperties;
    imageText: React.CSSProperties;
    gridItemHovered: React.CSSProperties;
}

const gridStyles: GridStyles = {
    imageGrid: {
        position: 'relative',
        margin: '0 auto',
        maxWidth: '1200px',
        minHeight:'1200000000px',
        backgroundColor: 'transparent',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    gridItem: {
        position: 'relative',
        marginBottom: '20px',
        borderRadius: '10px',
        overflow: 'hidden',
        padding: '10px',
        backgroundColor: 'transparent',
    },
    image: {
        display: 'block',
        width: '100%',
        height: 'auto',
        borderRadius: '10px',
        maxWidth: '300px',
        transition: 'transform 0.3s ease-in-out',
        backgroundColor: 'transparent',
    },
    imageText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
    },
    gridItemHovered: {
        zIndex: 1,
    },
};

const ImageGrid: React.FC = () => {
    const [columns, setColumns] = useState<number>(4); // Number of columns
    const columnRefs = useRef<Array<React.RefObject<HTMLDivElement>>>(Array.from({ length: columns }, () => React.createRef()));
    const [columnElements, setColumnElements] = useState<Array<JSX.Element[]>>(Array.from({ length: columns }, () => []));
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        // Fetch images from the backend
        fetch('/api/events')
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    setImages(data.body);
                } else {
                    console.error(data.body);
                }
            })
            .catch(error => console.error('Error fetching images:', error));
    }, []);

    useEffect(() => {

        const handleResize = () => {
            const containerWidth = columnRefs.current[0].current?.parentElement ? columnRefs.current[0].current.parentElement.clientWidth : 0;
            const newColumns = Math.ceil((containerWidth || 1) / 320);
            setColumns(newColumns || 1); // ensure at least one column

            setColumnElements(Array.from({ length: newColumns }, () => []));
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const distributeItemsToColumns = () => {
            images.forEach((image, index) => {
                const item = (
                    <div
                        key={index}
                        style={{ ...gridStyles.gridItem, ...(index === hoveredIndex && gridStyles.gridItemHovered) }}
                    >
                        <img src={image.src} alt={image.alt} style={gridStyles.image} />
                    </div>
                );

                const columnIndex = index % columns;
                setColumnElements(prevColumnElements => {
                    const newColumnElements = [...prevColumnElements];
                    if (!Array.isArray(newColumnElements[columnIndex])) {
                        newColumnElements[columnIndex] = [];
                    }
                    newColumnElements[columnIndex].push(item);
                    return newColumnElements;
                });
            });
        };

        distributeItemsToColumns();
    }, [images, columns, hoveredIndex]);

    return (
        <div>
            <div style={gridStyles.imageGrid}>
                {[...Array(columns)].map((_, index) => (
                    <div key={index} ref={columnRefs.current[index]}
                         style={{ width: `${100 / columns}%`, float: 'left', ...(index === hoveredIndex && gridStyles.gridItemHovered)}}>
                        {columnElements[index]}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGrid;
