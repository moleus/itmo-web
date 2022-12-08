// @ts-check
///<reference path="../global.d.ts" />

import {setupStore} from "../../src/store/store";
import {Provider} from "react-redux";
import {mount} from "cypress/react18";

// @ts-ignore
Cypress.Commands.add('dataCy', (value) => {
    return cy.get(`[data-cy=${value}]`)
})

Cypress.Commands.add("getByTestId", (value: string) => {
    return cy.get(`[data-test-id=${value}]`)
})


Cypress.Commands.add('clickCanvas', (testId: string, clientX: number, clientY: number) => {
    cy.getByTestId(testId).trigger('click', {
        clientX: clientX,
        clientY: clientY,
    })
})