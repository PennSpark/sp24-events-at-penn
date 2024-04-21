"use client"
import React, {useMemo, useState} from 'react';
import { Event } from '@/app/lib/types';
import Calendar from './calendar';
import ImageGrid from './imagegrid';
import SearchEvents from './filter/searchevents';
import CategoryFilter from './filter/categoryfilter';

const Events: React.FC<{ events?: Event[] }> = ({ events: initialEvents }) => {
    const [viewMode, setViewMode] = useState<string>("grid");
    const [searchQuery, setSearchQuery] = useState('');
    const [ordering, setOrdering] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');

    const filteredEvents = useMemo(() => {
        return initialEvents?.filter(event => {
            return event.name.toLowerCase().includes(searchQuery.toLowerCase())
        }) || [];
    }, [initialEvents, searchQuery, location, time, ordering]);

    return (
        <>
            <SearchEvents
                viewMode={viewMode}
                setViewMode={setViewMode}
                setSearchQuery={setSearchQuery}
                setOrdering={setOrdering}
                setTime={setTime}
                setLocation={setLocation}
            />
            <CategoryFilter />
            <div className="content-container">
                {viewMode === 'grid' ? <ImageGrid events={filteredEvents} /> : <Calendar events={filteredEvents} />}
            </div>
        </>
    );
};

export default Events;
