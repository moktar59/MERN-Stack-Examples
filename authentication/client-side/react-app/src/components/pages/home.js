import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import UserContext from './../../context/userContext';


export default function Home() {
    const {userData} = useContext(UserContext);
    console.log('userData=', userData);
    return (
        <div className="page">
            <h1>Home Page</h1>
            {
                userData.user ? 
                <h1>Welcome {userData.user.displayName}</h1>:
                <>
                    <h1>You are not logged in</h1>
                    <Link to="/login">Login</Link>
                </>
            }
        </div>
    );
}