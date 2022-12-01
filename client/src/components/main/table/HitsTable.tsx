import React from 'react';
import {hitAPI} from "../../../services/HitsService";
import {HitResult} from "../../../models/HitResult";

import "./HitsTable.scss"

const HitsTable = () => {
    const {data: hits, isLoading, error} = hitAPI.useFetchAllHitsQuery();
    const columnLabels = ["id", "X", "Y", "R", "Hit result", "Hit time", "Execution time"]

    return (
        <section className="grid-section results-table">
            <div className="table-container">
                {isLoading && <h1 data-test-id="result-table-loading">Идет загрузка данных таблицы...</h1>}
                {error && <h1 data-test-id="result-table-error">Произошла ошибка при загрузке таблицы</h1>}
                <table id="result-table" data-test-id="result-table">
                    <thead>
                    <tr>
                        {columnLabels.map(label => <th key={label}>{label}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {hits && hits.map((hit: HitResult) => (
                            <tr key={hit.id}>
                                <td>{hit.id}</td>
                                <td>{hit.x}</td>
                                <td>{hit.y}</td>
                                <td>{hit.r}</td>
                                <td>{hit.isHit}</td>
                                <td>{hit.hitTime}</td>
                                <td>{hit.executionTime}</td>
                            </tr>
                        )
                    )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default HitsTable;