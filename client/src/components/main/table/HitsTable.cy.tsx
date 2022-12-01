///<reference path="../../../../cypress/global.d.ts" />

import React from 'react';
import HitsTable from "./HitsTable";
import {interceptIndefinitely} from "../../../../cypress/support/util";

const getTable = () => cy.get<HTMLTableElement>('[data-test-id=result-table]')

const getRows = () => getTable().find('tbody tr')

describe('Table of hits', function () {
    it.only('Table fills after request', () => {
        const interception = interceptIndefinitely('/api/hits', {fixture: '3-hits.json'});

        cy.mount(<HitsTable/>)

        getRows().should('have.length', 0)
        cy.getByTestId('result-table-error').should('not.exist')
        cy.getByTestId('result-table-loading').should('have.text', "Идет загрузка данных таблицы...")

        interception.sendResponse();

        cy.log("Data received state")
        cy.getByTestId('result-table-loading').should('not.exist')
        cy.getByTestId('result-table-error').should('not.exist')
        cy.getByTestId<HTMLTableElement>('result-table').find('tr').should('have.length', 3);
    })
})
