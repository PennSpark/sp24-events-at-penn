import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTh, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

interface Props {
    viewMode: string;
    setViewMode: React.Dispatch<React.SetStateAction<string>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    ordering: string;
    setOrdering: React.Dispatch<React.SetStateAction<string>>;
    time: string;
    setTime: React.Dispatch<React.SetStateAction<string>>;
    location: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const toggleButtonStyle: React.CSSProperties = {
    border: 'none',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    padding: '6px 12px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '0.9em',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 'bold',
};

const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '0px 35px 20px 25px',
    borderRadius: '4px',
    backgroundColor: 'transparent',
};

const leftGroupStyle: React.CSSProperties = {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
};

const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginRight: '30px'
};

const inputStyle: React.CSSProperties = {
    border: '0px solid #ccc',
    padding: '10px 30px 10px 10px',
    borderRadius: '4px',
    width: '100%',
    maxWidth: '200px',
    background: 'white',
    color: '#555',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 'bold',
    outline: 'none',
    flex: '1'
};

const iconStyle: React.CSSProperties = {
    marginLeft: '-25px',
    width:'20px',
    height:'20px',
    cursor: 'pointer'
};

const dropdownStyle: React.CSSProperties = {
    border: '0px solid #ccc',
    padding: '10px 15px',
    borderRadius: '4px',
    background: 'white',
    color: '#555',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 'bold',
    outline: 'none',
    cursor: 'pointer',
    marginLeft: '30px'
};
const toggleActiveStyle: React.CSSProperties = {
    ...toggleButtonStyle,
    backgroundColor: 'white',
    color: 'black',
    justifyContent: 'flex-start',
};

const toggleInactiveStyle: React.CSSProperties = {
    ...toggleButtonStyle,
    backgroundColor: 'lightgray',
    color: 'black',
    justifyContent: 'flex-end',
};


const toggleContainerStyle: React.CSSProperties = {
    display: 'flex',
    background: 'lightgray',
    borderRadius: '20px',
    padding: '2px',
    height: '28px',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#fff',
};

const SearchEvents: React.FC<Props> = ({     viewMode, setViewMode, searchQuery, setSearchQuery, ordering, setOrdering, time, setTime, location, setLocation}) => {

    return (
        <div style={containerStyle}>
            <div style={leftGroupStyle}>
                <div style={inputGroupStyle}>
                    <input
                        type="text"
                        placeholder="search for events"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        style={inputStyle}
                    />
                    <FontAwesomeIcon icon={faSearch} style={iconStyle} />
                </div>
                <select style={dropdownStyle} value={ordering} onChange={e => setOrdering(e.target.value)}>
                    <option value="">Ordering</option>
                    <option value="Trending">Trending</option>
                    <option value="Alphabetical">Alphabetical</option>
                    <option value="Random">Random</option>
                </select>
                <select style={dropdownStyle} value={time} onChange={e => setTime(e.target.value)}>
                    <option value="">Time</option>
                    <option value="All">All</option>
                    <option value="Today">Today</option>
                    <option value="This week">This week</option>
                    <option value="This month">This month</option>
                </select>
                <select style={dropdownStyle} value={location} onChange={e => setLocation(e.target.value)}>
                    <option value="">Location</option>
                    <option value="university">University City</option>
                    <option value="center">Center City</option>
                    <option value="fishtown">Fishtown</option>
                    <option value="oncampus">On-Campus</option>
                    <option value="oncampus">Off-Campus</option>
                    <option value="other">Other</option>
                </select>

            </div>
            <div style={toggleContainerStyle}>
                <div style={viewMode === 'grid' ? toggleActiveStyle : toggleInactiveStyle}
                     onClick={() => setViewMode('grid')}>
                    {viewMode === 'grid' && <FontAwesomeIcon icon={faTh} />}
                    {viewMode !== 'grid' && <span>Grid</span>}
                </div>
                <div style={viewMode === 'calendar' ? toggleActiveStyle : toggleInactiveStyle}
                     onClick={() => setViewMode('calendar')}>
                    {viewMode !== 'calendar' && <span>Calendar</span>}
                    {viewMode === 'calendar' && <FontAwesomeIcon icon={faCalendarAlt} />}
                </div>
            </div>
        </div>
    );
};

export default SearchEvents;
