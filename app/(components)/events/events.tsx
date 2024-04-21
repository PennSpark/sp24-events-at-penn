"use client"
import React, { useMemo, useState } from 'react';
import { Event } from '@/app/lib/types';
import Calendar from './calendar';
import ImageGrid from './imagegrid';
import SearchEvents from './filter/searchevents';
import CategoryFilter from './filter/categoryfilter';
import { isToday, isThisWeek, isThisMonth, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
const Events: React.FC<{ events?: Event[] }> = ({ events: initialEvents }) => {
    const [viewMode, setViewMode] = useState<string>("grid");
    const [searchQuery, setSearchQuery] = useState('');
    const [ordering, setOrdering] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [activeCategories, setActiveCategories] = useState<string[]>([]);

    const filteredEvents = useMemo(() => {
        let filtered = initialEvents?.filter(event => {
            let includeEvent = event.name.toLowerCase().includes(searchQuery.toLowerCase());
            const eventStartDate = new Date(event.start_time.seconds * 1000);

            switch (time) {
                case "Today":
                    includeEvent = includeEvent && isToday(eventStartDate);
                    break;
                case "This week":
                    includeEvent = includeEvent && isThisWeek(eventStartDate, { weekStartsOn: 0 });
                    break;
                case "This month":
                    includeEvent = includeEvent && isThisMonth(eventStartDate);
                    break;
                default:
                    break;
            }

            if (activeCategories.length > 0 && event.tags) {
                includeEvent = includeEvent && event.tags && event.tags.length > 0 && activeCategories.some(category => event.tags.includes(category));
            }

            return includeEvent;
        });

        switch (ordering) {
            case "Alphabetical":
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Trending":
                filtered.sort((a, b) => b.views - a.views);
                break;
            case "Random":
                for (let i = filtered.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
                }
                break;
            default:
                break;
        }

        return filtered;
    }, [initialEvents, searchQuery, location, time, ordering, activeCategories]);

    return (
        <>
            <SearchEvents
                viewMode={viewMode}
                setViewMode={setViewMode}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                ordering={ordering}
                setOrdering={setOrdering}
                time={time}
                setTime={setTime}
                location={location}
                setLocation={setLocation}
            />
            <CategoryFilter setActiveCategories={setActiveCategories} />
            <div className="content-container">
                {viewMode === 'grid' ? <ImageGrid events={filteredEvents} /> : <Calendar events={filteredEvents} />}
            </div>
        </>
    );
};

export default Events;
