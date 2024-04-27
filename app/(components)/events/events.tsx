"use client"
import React, { useMemo, useState } from 'react';
import { Event, Tag } from '@/app/lib/types';
import Calendar from './calendar';
import ImageGrid from './imagegrid';
import SearchEvents from './filter/searchevents';
import CategoryFilter from './filter/categoryfilter';
import { isToday, isThisWeek, isThisMonth, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

const Events: React.FC<{ events?: Event[], tags?: Tag[] }> = ({ events: initialEvents, tags }) => {
    const [viewMode, setViewMode] = useState<string>("grid");
    const [searchQuery, setSearchQuery] = useState('');
    const [ordering, setOrdering] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [activeTags, setActiveTags] = useState<Tag[]>([]);

    const toggleTag = (tag: Tag): void => {
        const categoryLowerCase = tag.name.toLowerCase();
        if (activeTags.some(t => t.name.toLowerCase() === categoryLowerCase)) {
            setActiveTags(activeTags.filter(t => t.name.toLowerCase() !== categoryLowerCase));
        } else {
            setActiveTags([...activeTags, tag]);
        }
    };

    const filteredEvents = useMemo(() => {
        let filtered = initialEvents ? initialEvents.filter(event => {
            let includeEvent = event.name ? event.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
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
            }

            if (includeEvent && location && event.location && event.location.name) {
                includeEvent = event.location.name.toLowerCase() === location.toLowerCase();
            }

            if(tags) {
                const temp = event.tags.map(tag => tag._key.path.segments.slice(-1)[0]);
                const tagNames = activeTags.map(tag => tag.name);

                if (includeEvent && temp.length > 0 && tagNames.length > 0) {
                    includeEvent = temp.some(t => tagNames.includes(t));
                }
            }

            return includeEvent;
        }) : [];

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
        }

        return filtered;
    }, [initialEvents, searchQuery, location, time, ordering, activeTags, tags]);
    
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
            {tags && <CategoryFilter tags={tags} activeTags={activeTags} toggleTag={toggleTag} />}
            <div className="content-container">
                {viewMode === 'grid' ? <ImageGrid events={filteredEvents} /> : <Calendar events={filteredEvents} />}
            </div>
        </>
    );
};

export default Events;
