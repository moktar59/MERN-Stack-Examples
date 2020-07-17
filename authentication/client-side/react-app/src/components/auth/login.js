import React, {useState, useContext} from 'react';
import UserContext from '../../context/userContext';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
import ErrorNotice from './../misc/error-notice';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const loginUser = {email, password};

            const loginRes = await Axios.post("http://localhost:8081/users/login", loginUser);

            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });

            localStorage.setItem('auth-token', loginRes.data.token);
            history.push('/home');
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    return (
        <div className="page">
            <h1>Log In</h1>
            {
                error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)}/>
                )

            }
            <form className="form" onSubmit={submit}>
                <label htmlFor="login-email">Email</label>
                <input
                    id="login-email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    />

                <label htmlFor="login-password">Password</label>
                <input
                    id="login-password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    />

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}