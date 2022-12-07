import React from 'react';
import {useNavigate} from 'react-router-dom';
import {userAPI} from "../../../services/AuthService";
import Button from "../../common/Button";

const MainHeader = () => {
    const navigate = useNavigate();
    const [logoutUser] = userAPI.useLogoutUserMutation();

    const logout = () => {
        logoutUser().then(
            () => navigate("/login", {replace: true})
        )
    }

    return (
        <section className="grid-section header">
            <span className="centered">Made by Pavel</span>
            <Button label="Logout" onClick={logout}/>
        </section>
    )
};

export default MainHeader;