import React from 'react';
import Table from '@jetbrains/ring-ui/dist/table/table';
import Pager from '@jetbrains/ring-ui/dist/pager/pager';
import {Col, Grid, Row} from '@jetbrains/ring-ui/dist/grid/grid';
import {Column, SortParams} from '@jetbrains/ring-ui/dist/table/header-cell';
import Selection, {SelectionItem} from '@jetbrains/ring-ui/dist/table/selection';

import './HitsTable.scss'
import {HitResult} from "../../../api/types/HitResult";

export type HitResultItem = HitResult & SelectionItem

export interface HitsTableAdvancedProps {
    data: HitResult[];
    columns: Column<SelectionItem>[];
    pageSize: number;
}

interface TableState {
    data: HitResultItem[]
    page: number
    pageSize: number
    total: number
    sortOrder: boolean;
    sortKey: string;
}

const initialState: TableState = {
    data: [], page: 1, pageSize: 18, sortKey: "id", sortOrder: true, total: 0
}

const TableAdvanced = ({data, columns, pageSize}: HitsTableAdvancedProps) => {
    const [state, setState] = React.useState<TableState>({
        ...initialState,
        data: data as HitResultItem[],
        total: data.length,
        pageSize: pageSize
    });

    const getDataPerPage = (page: number, pageSize: number) => {
        const startIndex = (page - 1) * pageSize;
        return state.data.slice(startIndex, startIndex + pageSize);
    }

    React.useEffect(() => {
        setCurrentPage(data);
        setState((prevState) => ({
            ...prevState,
            data: getSortedData(prevState.sortKey, prevState.sortOrder),
            total: data.length
        }))
    }, [data])

    const setCurrentPage = (totalData: HitResult[]) => {
        if (totalData.length <= state.pageSize * state.page) {
            setState((prevState) => ({
                ...prevState,
                page: 1
            }))
        }
    }

    const getSortedData = (colId: number | string, order: boolean): HitResultItem[] => {
        return [].concat(data).sort((a, b) =>
            String(a[colId]).localeCompare(String(b[colId]), undefined, {numeric: true}) * (order ? 1 : -1))
    }

    const handleSort = (params: SortParams) => {
        const colId = params.column.id;
        const order = params.order;
        const sorted = getSortedData(colId, order);
        setState(prevState => ({...prevState, data: sorted, sortKey: colId, sortOrder: order}));
    };

    const handlePageChange = (page: number) => {
        setState(prevState => ({...prevState, page: page}))
    }

    return (
        <div>
            <Table
                data={getDataPerPage(state.page, state.pageSize)}
                columns={columns}
                renderEmpty={() => 'No data'}
                selectable={false}
                selection={new Selection({})}
                onSelect={() => {
                }}

                sortKey={state.sortKey}
                sortOrder={state.sortOrder}
                onSort={handleSort}
            />
            <Grid style={{marginTop: "auto"}}>
                <Row>
                    <Col>
                        <Pager
                            total={state.total}
                            pageSize={state.pageSize}
                            currentPage={state.page}
                            disablePageSizeSelector
                            onPageChange={handlePageChange}
                        />
                    </Col>
                </Row>
            </Grid>
        </div>
    );
}

export default TableAdvanced;