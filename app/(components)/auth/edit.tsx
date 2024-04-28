"use client"

import { CSSProperties, useContext } from "react";
import { AuthContext } from "./authprovider";
import Link from "next/link";

const styles: CSSProperties = {
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
}
export default function Edit({ url }: { url: string}) {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <></>;
    }
    return(
        <Link href={url} style={styles}>
            <button>
                EDIT
            </button>
        </Link>
    )
}