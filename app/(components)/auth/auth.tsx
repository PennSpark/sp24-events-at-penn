import React, { ReactNode } from 'react';
import Link from 'next/link';

interface RequireAuthProps {
    user: any;
    children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ user, children }) => {
    return user ? (
        <>{children}</>
    ) : (
        <div>
            <p>You are not allowed here!</p>
            {/*TODO add link here or route to main page*/}
        </div>
    );
};

export default RequireAuth;