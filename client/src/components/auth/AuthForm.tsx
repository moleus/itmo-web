import React from "react";
import {useForm} from "react-hook-form";
import {User} from "../../api/types/User";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

import "./AuthForm.scss"
import ValidatedInput from "../main/common/ValidatedInput";
import Button from "../common/Button";

interface LoginFormProps {
    onLogin: (user: User) => Promise<string>;
    onRegister: (user: User) => Promise<string>;
}

interface AuthInputTypes {
    username: string;
    password: string;
}

const formSchema = yup.object({
    username: yup.string().min(4).required(),
    password: yup.string().min(5).required(),
}).required();

const AuthForm = ({onLogin, onRegister}: LoginFormProps) => {
    const {register, handleSubmit, setError, formState: {errors}} = useForm<AuthInputTypes>({resolver: yupResolver(formSchema)});

    const handleLogin = (user: User) => {
       onLogin(user).catch(() => setError("password", { type: 'custom', message: "Invalid login or password provided" }))
    }

    const handleRegister = (user: User) => {
        onRegister(user).catch((cause) => {
            setError("password", { type: 'custom', message: cause.data.errorMessage })
        })
    }

    return (
        <section className="login-input-form">
        <form className="centered">
            <ValidatedInput label="Username" error={errors.username}>
                <input data-test-id="username-input" className="input-field" {...register("username", {required: true, minLength: 4})} />
            </ValidatedInput>
            <ValidatedInput label="Password" error={errors.password}>
                <input data-test-id="password-input" type="password" className="input-field" {...register("password", {required: true, minLength: 4})} />
            </ValidatedInput>
            <div className="input-container">
                <Button data-test-id="login-button" label="Login" onClick={handleSubmit(handleLogin)}/>
                <Button data-test-id="register-button" label="Register" onClick={handleSubmit(handleRegister)}/>
            </div>
        </form>
        </section>
    );
}

export default AuthForm;