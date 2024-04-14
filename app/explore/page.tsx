"use client";
import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import SearchEvents from "./../(components)/searchevents";
import CategoryFilter from "./../(components)/categoryfilter";
import ImageGrid from "./../(components)/imagegrid";
import Calendar from "./../calendar/calendar";
import Header from '../(components)/header';

function App() {
    const [viewMode, setViewMode] = useState<string>("grid");

    return (
        <div className="App">
            <Header isAuthenticated={true} />
            <div>
                <SearchEvents viewMode={viewMode} setViewMode={setViewMode} />
                <CategoryFilter />
                <div className="content-container">
                    {viewMode === 'grid' ? <Calendar /> : <ImageGrid />}
                </div>
            </div>
        </div>
    );
}

export default App;
