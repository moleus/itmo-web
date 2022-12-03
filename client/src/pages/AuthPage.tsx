import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import AuthForm from "../components/auth/AuthForm";
import {User} from "../models/User";
import {userAPI} from "../services/AuthService";

import "./AuthPage.scss";

const AuthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loginUser] = userAPI.useLoginUserMutation()
    const [registerUser, {}] = userAPI.useRegisterUserMutation()

    const fromPage = location.state?.from?.pathname || '/';

    const handleLogin = (user: User) => {
        loginUser(user).then(
            () => navigate(fromPage, {replace: true})
        );
    }

    const handleRegister = (user: User) => {
        // TODO: display errror on form
        registerUser(user).then(() => {
            navigate(fromPage, {replace: true});
        })
    }

    return (
        <div className="login-page">
            <AuthForm onLogin={handleLogin} onRegister={handleRegister}/>
        </div>
    );
}

export default AuthPage;