import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import AuthForm from "../components/auth/AuthForm";
import {User} from "../api/types/User";
import {userAPI} from "../api/authService";

import "./AuthPage.scss";
import AuthPageHeader from "../components/auth/AuthPageHeader";

const AuthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loginUser] = userAPI.useLoginUserMutation()
    const [registerUser] = userAPI.useRegisterUserMutation()

    const fromPage = location.state?.from?.pathname || '/';

    const handleLogin = (user: User): Promise<string> => {
        return loginUser(user).unwrap().then((data) => {
            navigate(fromPage, {replace: true})
            return data;
        });
    }

    const handleRegister = (user: User) => {
        return registerUser(user).unwrap().then((data) => {
            navigate(fromPage, {replace: true})
            return data;
        });
    }

    return (
        <div className="login-page">
            <AuthPageHeader/>
            <AuthForm onLogin={handleLogin} onRegister={handleRegister}/>
        </div>
    );
}

export default AuthPage;