import React from "react";
import {useForm} from "react-hook-form";
import {User} from "../../models/User";

import "./AuthForm.scss"

interface LoginFormProps {
    onLogin: (user: User) => void;
    onRegister: (user: User) => void;
}

const AuthForm = ({onLogin, onRegister}: LoginFormProps) => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    return (
        <section className="login-input-form">
        <form className="centered">
            <div className="input-container">
                <input className="input-field" defaultValue="aboba" {...register("username", {required: true, minLength: 4})} />
                {errors.username && <span>Username is required</span>}
            </div>
            <div className="input-container">
                <input className="input-field" {...register("password", {required: true, minLength: 4})} />
                {errors.password && <span>Password is required</span>}
            </div>
            <div className="input-container">
                <button className="input-field backlight clickable" onClick={handleSubmit(onLogin)}>Login</button>
                <button className="input-field backlight clickable" onClick={handleSubmit(onRegister)}>Register</button>
            </div>
        </form>
        </section>
    );
}

export default AuthForm;