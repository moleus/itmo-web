import React from 'react';
import HitsTable from "./HitsTable";
import '@testing-library/cypress/add-commands';

import {columns} from "../data/columns";
import {getRandomHits} from "../../../../../cypress/support/util";

import '../container/hitsTableContainer.scss'
import '@jetbrains/ring-ui/dist/style.css';
import {range} from "../../../util/Util";

const ELEMENTS_COUNT = 30;
const PAGE_SIZE = 5

const getInnerTextBy = (selector: string) => {
    return cy.get(selector).then((el) =>
        Cypress._.map(el, (el) => el.innerText),
    )
}

const getColumn = (columnName: string) => {
    return getInnerTextBy(`[data-test="ring-table-cell ${columnName}"]`)
}

const toNum = (values: string[]) => values.map(i => +i);

const manyHits = getRandomHits(ELEMENTS_COUNT)
const singleHit = getRandomHits(1)

describe('Sortable hits table', function () {
    beforeEach(() => {
        cy.viewport(720, 720);
    })
    it('mounts', () => {
        cy.mount(<HitsTable columns={columns} data={manyHits} rowsPerPage={17}/>)
    })

    it('shows only single page rows', () => {
        cy.mount(<HitsTable columns={columns} data={manyHits} rowsPerPage={PAGE_SIZE}/>)
        cy.get('[data-test=ring-table-body]').find("tr").should("have.length", PAGE_SIZE);
    })

    it('sorts data on click', () => {
        cy.mount(<HitsTable columns={columns} data={manyHits} rowsPerPage={PAGE_SIZE}/>)
        // sorted by id
        cy.get('[data-test=ring-table-body]').find("tr").should("have.length", PAGE_SIZE);
        getColumn("id")
            .then((ids) => {
                const sorted = toNum(ids).slice().sort();
                expect(sorted).to.be.deep.equal(toNum(ids));
                sorted.forEach((id) => {
                    expect(id).to.be.within(0, PAGE_SIZE)
                })
            })
        cy.log('**reverse sort sorted by id**')
        cy.get('[data-test="ring-table-header-cell id"]').click()
        getColumn("id")
            .then((ids) => {
                const reverseOrdered = toNum(ids).slice().sort().reverse();
                expect(reverseOrdered).to.deep.equal(toNum(ids))
                reverseOrdered.forEach((id) => {
                    expect(id).to.be.within(ELEMENTS_COUNT - PAGE_SIZE, ELEMENTS_COUNT - 1)
                })
            })
    })

    it('switch pages', () => {
        cy.mount(<HitsTable columns={columns} data={manyHits} rowsPerPage={PAGE_SIZE}/>).then(({rerender}) => {
            cy.findByText("Next page").click();
            getColumn("id")
                .then((values) => {
                    const ids = toNum(values);
                    expect(ids).to.be.deep.equal(range(PAGE_SIZE, PAGE_SIZE))
                })
                .then(() => {
                    cy.log("Clear table data and re-render");
                    rerender(<HitsTable columns={columns} data={singleHit} rowsPerPage={PAGE_SIZE}/>)
                    cy.get('[data-test=ring-table-body]').find("tr").should("have.length", 1);
                })
        })
    })
});
