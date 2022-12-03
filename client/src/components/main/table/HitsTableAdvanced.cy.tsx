import React from 'react';
import {Column} from '@jetbrains/ring-ui/dist/table/header-cell';
import TableAdvanced, {HitResultItem} from "./TableAdvanced";

const data: HitResultItem[] = [
    {
        "id": 1,
        "x": 1.2,
        "y": 1.3,
        "r": 1.4,
        "hit": true,
        "hitTime": "11.11.2020",
        "executionTime": 11
    },
    {
        "id": 2,
        "x": 2.2,
        "y": 2.3,
        "r": 2.4,
        "hit": false,
        "hitTime": "22.22.2022",
        "executionTime": 22
    },
    {
        "id": 3,
        "x": 3.2,
        "y": 3.3,
        "r": 3.4,
        "hit": true,
        "hitTime": "33.33.3033",
        "executionTime": 33
    },
    {
        "id": 4,
        "x": 4.2,
        "y": 4.3,
        "r": 4.4,
        "hit": true,
        "hitTime": "44.44.4044",
        "executionTime": 44
    }
]

const columns: Column<HitResultItem>[] = [
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

describe('Table of hits', function () {
    it('mounts', () => {
        cy.mount(<TableAdvanced data={data} columns={columns}/>)
    })
})
