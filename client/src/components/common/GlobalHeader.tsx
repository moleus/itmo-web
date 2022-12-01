import React from 'react';
import {Outlet} from "react-router-dom";

import "./GlobalHeader.scss"

const GlobalHeader = () => {
    return (
        <>
            <section className="grid-section header">
                <span>My Lab 4</span>
            </section>
            <Outlet/>
        </>
);
}

export default GlobalHeader;