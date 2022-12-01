import React from 'react';
import CoordinatesForm from "../components/main/form/CoordinatesForm";
import HitsTable from "../components/main/table/HitsTable";
import CanvasContainer from "../components/main/canvas/CanvasContainer";

import "./MainPage.scss";

const MainPage = () => {
    return (
        <main className="main-page">
            <HitsTable></HitsTable>
            <CanvasContainer/>
            <CoordinatesForm/>
        </main>
    )
}

export default MainPage;