"use client";
import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./../(components)/header";
import SearchEvents from "./../(components)/searchevents";
import CategoryFilter from "./../(components)/categoryfilter";
import ImageGrid from "./../(components)/imagegrid";
import Calendar from "./../calendar/calendar";
import Navbar from "./../(components)/navbar";

function App() {
    const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    return (
        <div className="App">
            <Router>
                <div>
                    <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

                    <Header isAuthenticated={isAuthenticated} />

                    <SearchEvents viewMode={viewMode} setViewMode={setViewMode} />
                    <CategoryFilter />
                    <div className="content-container">
                        {viewMode === 'grid' ? <Calendar /> : <ImageGrid />}
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;
