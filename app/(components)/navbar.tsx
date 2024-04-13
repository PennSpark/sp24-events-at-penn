"use client";
import React, { useState } from 'react';
import ovalImage from '../images/oval.png';
import sparkImage from '../images/spark.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

interface Styles {
    [key: string]: React.CSSProperties;
}

const styles: Styles = {
    iconSpacing: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '5px',
        alignItems: 'center',
    },
    navBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundImage: 'transparent',
        padding: '20px',
        position: 'relative',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
    },
    logo: {
        fontSize: '15px',
        fontWeight: 'bold',
        marginRight: '20px',
    },
    sparkImage: {
        position: 'absolute',
        top: '-5px',
        right: '0',
        width: '20px',
        height: 'auto',
    },
    navItems: {
        display: 'inline-block',
        gap: '20px',
        alignItems: 'center',
    },
    navItem: {
        textDecoration: 'none',
        color: 'black',
        fontSize: '15px',
        fontWeight: 'bold',
        padding: '5px 10px',
        borderRadius: '25px',
        border: '2px solid transparent',
        cursor: 'pointer',
        display: 'inline-block',
        width: '100px',
        height: '20px',
        lineHeight: '20px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 0,
    },
    navItemActive: {
        backgroundImage: `url(${ovalImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'inline-block',
        width: '100px',
        height: '20px',
        lineHeight: '20px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
    },
    button: {
        backgroundColor: '#555',
        color: 'white',
        border: 'none',
        padding: '5px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 'bold',
        marginLeft: '22px',
        display: 'inline-block',
        minWidth: '100px',
    },
    lineContainer: {
        height: '10px',
    },
    line1: {
        height: '4px',
        backgroundColor: 'black',
        marginTop: '10px',
    },
    line2: {
        height: '2px',
        backgroundColor: 'black',
        marginTop: '5px',
    },
};

const Navbar: React.FC<{ isAuthenticated: boolean, setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>> }> = ({ isAuthenticated, setIsAuthenticated }) => {
    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="App">
            <nav style={styles.navBar}>
                <div style={styles.logoContainer}>
                    <span style={styles.logo}>
                        By Penn Spark
                    </span>
                    <div style={styles.sparkImageContainer}>
                        <Image src={sparkImage} alt="Penn Spark" style={styles.sparkImage} />
                    </div>
                </div>
                <div style={styles.navItems}>
                    <a href="/explore" style={{ ...styles.navItem, ...(isActive('/explore') ? styles.navItemActive : {}) }}>
                        Explore
                    </a>
                    <a href="/about" style={{ ...styles.navItem, ...(isActive('/about') ? styles.navItemActive : {}) }}>
                        About
                    </a>
                    {isAuthenticated ? (
                        <a href="/profile" style={{ ...styles.navItem, ...(isActive('/profile') ? styles.navItemActive : {}) }}>
                            <div style={styles.iconSpacing}>
                                <FontAwesomeIcon icon={faUser} />
                                <span style={{ marginLeft: '5px' }}>Organizer</span>
                            </div>
                        </a>
                    ) : (
                        <button onClick={handleLogin} style={styles.button}>Club Login</button>
                    )}
                </div>
            </nav>
            <div style={styles.lineContainer}>
                <div style={styles.line1}></div>
                <div style={styles.line2}></div>
            </div>
        </div>
    );
};

export default Navbar;
