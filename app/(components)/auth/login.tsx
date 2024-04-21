'use client'
import exp from "constants";
import { CSSProperties, useState } from "react";
const inputStyle: CSSProperties = {
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

const Login: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                style={inputStyle}
            />
            <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={inputStyle}
            />
        </form>
    );
}

export default Login;