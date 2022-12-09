import React from 'react';

import TableAdvanced, {HitResultItem} from "./TableAdvanced";
import {hitAPI} from "../../../api/hitsService";
import {HitResult} from "../../../api/types/HitResult";
import {columns} from "./columns";

import './HitsTable.scss'

const hitResultToItem = (data: HitResult[]): HitResultItem[] => {
    return data ? data.map(hit => hit as HitResultItem) : [];
}

const HitsTableContainer = () => {
    const {data: hits} = hitAPI.useFetchAllHitsQuery();
    return (
        <section className="grid-section results-table">
            <div className="table-container flex-table-parent">
                <TableAdvanced data={hitResultToItem(hits)} columns={columns} pageSize={17}/>
            </div>
        </section>
    );
}

export default HitsTableContainer;