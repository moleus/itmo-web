import {useEffect, useState} from "react";
import {HitResultItem} from "../body/HitsTable";
import {arraysAreDeepEqual, sliceData} from "../util/tableUtil";

export interface UseTableProps {
    data: HitResultItem[];
    page: number;
    rowsPerPage: number;
}

const useTable = ({data, page, rowsPerPage}: UseTableProps) => {
    const [pageSlice, setPageSlice] = useState<HitResultItem[]>([]);

    useEffect(() => {
        const newPageSlice = sliceData(data, page, rowsPerPage);
        if (arraysAreDeepEqual(pageSlice, newPageSlice)) return;
        setPageSlice([...newPageSlice]);
    }, [data, page]);

    return {pageSlice}
}

export default useTable;