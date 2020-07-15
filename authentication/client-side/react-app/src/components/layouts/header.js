import React from 'react';
import {Link} from 'react-router-dom';
import AuthOptions from './../auth/auth-options';

export default function Header() {
    return (
        <header id="header">
            <Link to="/">
                <h1 className="title">MERN Auth Template</h1>
            </Link>
            <AuthOptions />
        </header>
    );
}