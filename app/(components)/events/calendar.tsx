import React, { useState } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { Event } from '@/app/lib/types';
import Link from 'next/link';

const calendarStyles = {
    calendar: {
        margin: '50px auto',
        padding: '0 20px',
        background: 'transparent',
        minHeight: 'auto',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 'bold',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontFamily: 'Montserrat, sans-serif',
        color: '#8E8E8E',
    },
    headerTitle: {
        fontWeight: 'bold',
        color: '#8E8E8E',
    },
    headerButton: {
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: 'large',
        color: '#444',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cell: {
        width: 'calc(100%/7 - 10px)',
        minHeight: '200px',
        margin: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        borderRadius: '10px',
    },
    number: {
        alignSelf: 'flex-start',
        margin: '5px',
        fontWeight: 'bold',
    },
    today: {
        fontWeight: 'bold',
    },
    disabled: {
        color: '#d9e1e8',
    },
    event: {
        marginTop: '10px',
        textAlign: 'center',
        fontSize: '0.85em',
        color: 'black',
        borderRadius: '4px',
        padding: '2px 10px',
        width: '100%',
        margin: '10px 0',
    },
    headerCell: {
        width: 'calc(100%/7)',
        textAlign: 'center',
        margin: '0',
        textTransform: 'uppercase',
        fontFamily: 'Montserrat, sans-serif',
        color: '#8E8E8E',
    },
};

const colorPalette = [
    '#bedbe3', '#a8bdc0', '#91a69f', '#778c85', '#6a7974','#c7dcd5','#c7dcd5',
    '#9faaa4','#8e9689','#808277','#707265','#5f6153',
    '#d2dfcd','#c1c3b5','#b1b3a5','#a29d8a','#928b78','#897c6c','#897c6c',
    '#daddc8','#d0cab2','#d0cab2','#b5a58c','#b5a58c','#9e836e','#9e836e',
    '#e4e1b8','#dccdac','#d3be9f','#cbac90','#c4a286','#bc9279','#bc9279',
    '#eae2b3','#eae2b3','#e5c39d','#e4ba92','#dbaf88','#d8a27e','#d19573',
    '#f4dfaa','#f6d8a2','#f8ce9c','#f8c495','#f7b988','#f9b083','#f9a87d'
];

const Calendar: React.FC<{ events?: Event[] }> = ({ events }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy";
        return (
            <div style={calendarStyles.header}>
                <button style={calendarStyles.headerButton} onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                    {"<"}
                </button>
                <div style={calendarStyles.headerTitle}>{format(currentMonth, dateFormat)}</div>
                <button style={calendarStyles.headerButton} onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                    {">"}
                </button>
            </div>
        );
    };

    const onDateClick = (day: Date) => {
        setSelectedDate(day);
    };

    const renderDays = () => {
        const dateFormat = "EEE";
        const days = [];
        let startDate = startOfWeek(currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div style={calendarStyles.headerCell} key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div style={calendarStyles.row}>{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                const isToday = isSameDay(day, new Date());
                const isDisabled = !isSameMonth(day, monthStart);

                const dayEvents = events ? events.filter(e => isSameDay(new Date(e.start_time.seconds * 1000), day)) : [];

                days.push(
                    <div
                        style={{
                            ...calendarStyles.cell,
                            ...(isDisabled ? calendarStyles.disabled : {}),
                            ...(isToday ? calendarStyles.today : {}),
                        }}
                        key={day.toString()}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        <span style={calendarStyles.number}>{formattedDate}</span>
                        {dayEvents.map((event, index) => (
                            <div
                                key={index}
                                style={{
                                    ...calendarStyles.event,
                                    backgroundColor: colorPalette[Math.floor(Math.random() * colorPalette.length)],
                                }}
                            >
                                <Link href={`/events/${event.slug}`} prefetch>
                                    {event.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div style={calendarStyles.row} key={day.toString()}>{days}</div>
            );
            days = [];
        }
        return <div>{rows}</div>;
    };

    return (
        <div>
            <div style={calendarStyles.calendar}>
                {renderHeader()}
                {renderDays()}
                {renderCells()}
            </div>
        </div>
    );
};

export default Calendar;
