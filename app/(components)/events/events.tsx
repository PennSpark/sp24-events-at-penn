"use client"
import React, { useState } from 'react';
import { Event } from '@/app/lib/types';
import Calendar from './calendar';
import ImageGrid from './imagegrid';
import SearchEvents from './filter/searchevents';
import CategoryFilter from './filter/categoryfilter';

const Events: React.FC<{ events?: Event[] }> = ({ events }) => {
    const [viewMode, setViewMode] = useState<string>("grid");
    return (
        <>
            <SearchEvents viewMode={viewMode} setViewMode={setViewMode} />
            <CategoryFilter />
            <div className="content-container">
                {viewMode === 'grid' ? <Calendar /> : <ImageGrid events={events} />}
            </div>
        </>
    );
};

export default Events;
