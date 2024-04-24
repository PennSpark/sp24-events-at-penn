'use client'
import { useState } from 'react';
import './LoginPage.css';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch(error) {
            console.error('Error logging in:', error);
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
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
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
                    <button className = "montserratStroke" onClick={() => onSubmit(username, password)}>
                            Login
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
