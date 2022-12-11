import {Column} from '@jetbrains/ring-ui/dist/table/header-cell';
import {HitResultItem} from "../body/HitsTable";

export const columns: Column<HitResultItem>[] = [
    {
        id: "id",
        title: "id",
        sortable: true,
        className: "table-column",
    },
    {
        id: "x",
        title: "x",
        getValue: (item) => item.x.toFixed(2)
    },
    {
        id: "y",
        title: "y",
        getValue: (item) => item.y.toFixed(2)
    },
    {
        id: "r",
        title: "r",
    },
    {
        id: "hit",
        title: "Is hit",
        getValue: (item) =>item.hit.toString()
    },
    {
        id: "hitTime",
        title: "Date",
        sortable: true
    },
    {
        id: "executionTimeMicros",
        title: "execution Time",
        sortable: true
    }
]
