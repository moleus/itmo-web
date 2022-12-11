import React from 'react';

import HitsTable, {HitResultItem} from "../body/HitsTable";
import {hitAPI} from "../../../../api/hitsService";
import {HitResult} from "../../../../api/types/HitResult";
import {columns} from "../data/columns";

import './hitsTableContainer.scss'

const hitResultToItem = (data: HitResult[]): HitResultItem[] => {
    return data ? data.map(hit => hit as HitResultItem) : [];
}

const HitsTableContainer = () => {
    const {data: hits} = hitAPI.useFetchAllHitsQuery();
    return (
        <section className="grid-section results-table">
            <div className="table-container flex-table-parent">
                <HitsTable data={hitResultToItem(hits)} columns={columns} rowsPerPage={17}/>
            </div>
        </section>
    );
}

export default HitsTableContainer;