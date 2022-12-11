import React, {useState} from 'react';
import {Col, Grid, Row} from '@jetbrains/ring-ui/dist/grid/grid';
import {Column} from '@jetbrains/ring-ui/dist/table/header-cell';
import {SelectionItem} from '@jetbrains/ring-ui/dist/table/selection';

import {HitResult} from "../../../../api/types/HitResult";
import TablePage from "../page/TablePage";
import useTable from "../hooks/useTable";
import TablePager from "../pager/TablePager";
import useSort from "../hooks/useSort";

export type HitResultItem = HitResult & SelectionItem

export interface HitsTableAdvancedProps {
    data: HitResult[];
    columns: Column<SelectionItem>[];
    rowsPerPage: number;
}

const HitsTable = ({data, columns, rowsPerPage}: HitsTableAdvancedProps) => {
    const [page, setPage] = useState(1);
    const {sortedData, sortKey, sortOrder, onSort} = useSort({data: data as HitResultItem[]});
    const {pageSlice} = useTable({data: sortedData, page, rowsPerPage});

    return (
        <div>
            <TablePage data={pageSlice} columns={columns} sortOrder={sortOrder}
                       onSort={onSort} sortKey={sortKey}/>
            <Grid style={{marginTop: "auto"}}>
                <Row>
                    <Col>
                        <TablePager dataSlice={pageSlice} dataCount={data.length} currentPage={page}
                                    setPage={setPage} rowsPerPage={rowsPerPage}/>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
}

export default HitsTable;