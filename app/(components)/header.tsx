"use client"
import React, { useContext } from 'react';
import benImage from '../images/ben.png';
import exclamationImage from '../images/exclamation.png';
import Image from 'next/image';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from "next/head";
import Link from "next/link";
import { AuthContext } from './auth/authprovider';
import { Timestamp } from 'firebase/firestore';
import { getSeconds } from '../lib/utils';

interface HeaderStyles {
    container: React.CSSProperties;
    headerFlex: React.CSSProperties;
    title: React.CSSProperties;
    subtitle: React.CSSProperties;
    ben: React.CSSProperties;
    exclamation: React.CSSProperties;
    button: React.CSSProperties;
}

const headerStyles: HeaderStyles = {
    container: {
        fontFamily: "'Montserrat', sans-serif",
        color: '#000',
        padding: '28px',
        textAlign: 'left',
    },
    button: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#555',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 'bold',
        padding: '10px 20px',
        fontSize: '1em',
        textDecoration: 'none',
        marginLeft: 'auto',
    },
    headerFlex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: '36px',
        fontWeight: '900',
        marginBottom: '0px',
    },
    subtitle: {
        fontSize: '18px',
        marginTop: '0px',
        fontWeight: '700',
    },
    ben: {
        backgroundImage: `url(${benImage})`,
        width: 'auto',
        height: 'auto',
    },
    exclamation: {
        backgroundImage: `url(${exclamationImage})`,
        width: 'auto',
        height: 'auto',
        backgroundRepeat: 'no-repeat'
    }
};

const Header: React.FC = () => {
    const { user, organizer } = useContext(AuthContext);
    const isAuthenticated = user !== null;

    return (
        <div>
            <div style={headerStyles.container}>
                <div style={headerStyles.headerFlex}>
                    <div>
                        <div style={headerStyles.headerFlex}>
                            <h1 style={headerStyles.title}>Explore the SocialCalendar@Penn</h1>
                            <Image src={exclamationImage} alt="exclamation" style={headerStyles.exclamation} />
                        </div>
                        <p style={headerStyles.subtitle}>Take a look at what’s going on today 👀</p>
                    </div>
                    <Image src={benImage} alt="ben" style={headerStyles.ben} />
                    {isAuthenticated && (
                        <Link href="/create-event" style={headerStyles.button}>
                            <button>
                                <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} /> ADD EVENT
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;