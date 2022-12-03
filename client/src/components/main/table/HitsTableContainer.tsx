import React from 'react';

import {Column} from '@jetbrains/ring-ui/dist/table/header-cell';
import TableAdvanced, {HitResultItem} from "./TableAdvanced";
import {hitAPI} from "../../../services/HitsService";
import {HitResult} from "../../../models/HitResult";


import './HitsTable.scss'

type HitColumn = Column<HitResultItem>
const columns: HitColumn[] = [
    {
        id: "id",
        title: "id",
        sortable: true
    },
    {
        id: "x",
        title: "x",
    },
    {
        id: "y",
        title: "y",
    },
    {
        id: "r",
        title: "r",
    },
    {
        id: "isHit",
        title: "Is hit",
        getValue: (item) =>item.hit.toString()
    },
    {
        id: "startDate",
        title: "Date",
        sortable: true
    },
    {
        id: "executionTime",
        title: "execution Time",
        sortable: true
    }
]

const hitResultToItem = (data: HitResult[]): HitResultItem[] => {
    if (data) {
        console.log("Has data");
        return data.map(hit => hit as HitResultItem)
    }
    console.log("No data");
    return [];
}

const HitsTableContainer = () => {
    const {data: hits} = hitAPI.useFetchAllHitsQuery();
    return (
        <section className="grid-section results-table">
            <div className="table-container">
                <TableAdvanced data={hitResultToItem(hits)} columns={columns}/>
            </div>
        </section>
    );
}

export default HitsTableContainer;