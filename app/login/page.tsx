'use client'
import { useState } from 'react';
import './LoginPage.css';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (email: string, password: string) => {
        console.log('handleing signin');
        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', userCred.user);
        } catch(error) {
            console.error('Error logging in:', error);
        }
    }

    const handleSignOut = async () => {
        try {
            await auth.signOut();
        } catch(error) {
            await console.error('Error logging in:', error);
        }
    }

    return(
        <>
        <div className="Login" >
            <div>
                <div className = "login-info">
                <h1 className = 'montserratStroke' >Organization Login</h1>
                <p>
                    Start advertising your events on SocialCalendar@Penn!                
                </p>

                <form>
                    <div className="form-group">
                        <input
                            className="px-4"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="px-4"
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button className = "montserratStroke" onClick={(e) => {e.preventDefault(); handleSignIn(email, password) }}>
                        Login
                    </button>
                    <button className = "montserratStroke" onClick={(e) => { e.preventDefault(); handleSignOut()}}>
                        Logout
                    </button>
                </form>
                 </div>
                 <div className="login-artist"></div>
                 <div className="login-exclamation"></div>
                 <div className="login-loop"></div>
            </div>
    </div>
    </>
)
}
