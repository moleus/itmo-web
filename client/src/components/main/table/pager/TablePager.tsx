import React, {useEffect} from 'react';
import Pager from "@jetbrains/ring-ui/dist/pager/pager";
import {HitResultItem} from "../body/HitsTable";


interface PagerProps {
    dataSlice: HitResultItem[];
    dataCount: number;
    currentPage: number;
    setPage: (page: number) => void;
    rowsPerPage: number;
}

const TablePager = ({dataSlice, dataCount, currentPage, setPage, rowsPerPage}: PagerProps) => {
    useEffect(() => {
        if (dataSlice.length < 1 && currentPage !== 1) {
            setPage(currentPage - 1);
        }
    }, [dataSlice, currentPage, setPage]);

    return (
        <Pager
            total={dataCount}
            disablePageSizeSelector
            pageSize={rowsPerPage}
            currentPage={currentPage}
            onPageChange={setPage}
        />
    );
}

export default TablePager;