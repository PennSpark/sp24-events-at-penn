'use client'
import Login from "../(components)/auth/login";



export default function Page() {
    const onSubmit = async () => {
        /*
        await fetch("/api/authentication/login", {
            "email": "jdatt@sas.upenn.edu",
            "password": "testpassw0rd"
        })
        */
    }

    return(
        <Login onSubmit={onSubmit} />
    )
}
