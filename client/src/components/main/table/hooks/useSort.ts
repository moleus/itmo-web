import {sortData} from "../util/tableUtil";
import {useCallback, useEffect, useState} from "react";
import {HitResultItem} from "../body/HitsTable";
import {SortParams} from "@jetbrains/ring-ui/dist/table/header-cell";

interface UseSortProps {
    data: HitResultItem[];
}

const useSort = ({data}: UseSortProps) => {
    const [sortedData, setSortedData] = useState<HitResultItem[]>([]);
    const [sortKey, setSortKey] = useState<string>("id");
    const [sortOrder, setSortOrder] = useState<boolean>(true);

    useEffect(() => {
        setSortedData(sortData(data, sortKey, sortOrder));
    }, [data, sortOrder, sortKey])

    const onSort = useCallback((params: SortParams) => {
        setSortKey(params.column.id);
        setSortOrder(params.order);
    }, [])

    return {sortedData, sortKey, sortOrder, onSort}
}

export default useSort;