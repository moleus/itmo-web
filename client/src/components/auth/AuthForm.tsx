import React from "react";
import {useForm} from "react-hook-form";
import {User} from "../../models/User";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

import "./AuthForm.scss"
import ValidatedInput from "../main/common/ValidatedInput";

interface LoginFormProps {
    onLogin: (user: User) => Promise<string>;
    onRegister: (user: User) => Promise<string>;
}

const formSchema = yup.object({
    username: yup.string().min(4).required(),
    password: yup.string().min(5).required(),
}).required();

const AuthForm = ({onLogin, onRegister}: LoginFormProps) => {
    const {register, handleSubmit, setError, formState: {errors}} = useForm({resolver: yupResolver(formSchema)});

    const handleLogin = (user: User) => {
       onLogin(user).catch(() => setError("password", { type: 'custom', message: "Invalid login or password provided" }))
    }

    const handleRegister = (user: User) => {
        onRegister(user).catch(() => setError("password", { type: 'custom', message: "Invalid login or password provided" }))
    }

    return (
        <section className="login-input-form">
        <form className="centered">
            <ValidatedInput label="Username" error={errors.username}>
                <input className="input-field" defaultValue="aboba" {...register("username", {required: true, minLength: 4})} />
            </ValidatedInput>
            <ValidatedInput label="Password" error={errors.password}>
                <input className="input-field" {...register("password", {required: true, minLength: 4})} />
            </ValidatedInput>
            <div className="input-container">
                <button className="input-field backlight clickable" onClick={handleSubmit(handleLogin)}>Login</button>
                <button className="input-field backlight clickable" onClick={handleSubmit(handleRegister)}>Register</button>
            </div>
        </form>
        </section>
    );
}

export default AuthForm;