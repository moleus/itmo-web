import React from 'react';
import Table from '@jetbrains/ring-ui/dist/table/table';
import Pager from '@jetbrains/ring-ui/dist/pager/pager';
import {Col, Grid, Row} from '@jetbrains/ring-ui/dist/grid/grid';
import {Column, SortParams} from '@jetbrains/ring-ui/dist/table/header-cell';
import Selection, {SelectionItem} from '@jetbrains/ring-ui/dist/table/selection';

import '@jetbrains/ring-ui/components/table/table.css'
import '@jetbrains/ring-ui/dist/style.css'
import './HitsTable.scss'
import {HitResult} from "../../../models/HitResult";

export type HitResultItem = HitResult & SelectionItem

export interface HitsTableAdvancedProps {
    data: HitResultItem[];
    columns: Column<SelectionItem>[];
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
    data: [], page: 1, pageSize: 20, sortKey: "id", sortOrder: true, total: 0
}

const TableAdvanced = ({data, columns}: HitsTableAdvancedProps) => {
    const getDataPerPage = (page: number, pageSize: number) => {
        return data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    }

    const [state, setState] = React.useState<TableState>({...initialState, data: getDataPerPage(initialState.page, initialState.pageSize), total: data.length});

    React.useEffect(() => {
        setState((prevState) => ({...prevState, data: getDataPerPage(prevState.page, prevState.pageSize), total: data.length}))
    }, [data])

    const handleSort = (params: SortParams) => {
        const sortKey = params.column.id;
        const sortOrder = params.order;
        data.sort((a, b) =>
            String(a[sortKey]).localeCompare(String(b[sortKey])) * (sortOrder ? 1 : -1));
        setState(prevState => ({...prevState, data: data, sortKey: params.column.id, sortOrder: params.order}));
    };

    const handlePageChange = (page: number) => {
        setState(prevState => ({...prevState, page: page, data: getDataPerPage(page, prevState.pageSize)}))
    }

    return (
        <div className="flex-table-parent">
            <Table
                data={dataPerPage}
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