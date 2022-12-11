import React from 'react';
import CoordinatesForm from "../components/main/form/CoordinatesForm";
import HitsTableContainer from "../components/main/table/container/HitsTableContainer";
import CanvasContainer from "../components/main/canvas/CanvasContainer";

import "./MainPage.scss";
import MainHeader from "../components/main/header/MainHeader";

const MainPage = () => {
    return (
        <main className="main-page">
            <MainHeader/>
            <HitsTableContainer></HitsTableContainer>
            <CanvasContainer/>
            <CoordinatesForm/>
        </main>
    )
}

export default MainPage;