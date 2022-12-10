import React from 'react';
import {useNavigate} from 'react-router-dom';
import {userAPI} from "../../../api/authService";
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
            <Button data-test-id="logout-button" label="Logout" onClick={logout}/>
        </section>
    )
};

export default MainHeader;