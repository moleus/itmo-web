import React from 'react'
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

Cypress.Commands.add("mount", (component, options = {}) => {
    // Use the default store if one is not provided
    const {reduxStore = setupStore(), ...mountOptions} = options;

    const wrapRedux = <Provider store={reduxStore} children={component}/>
    return mount(wrapRedux, mountOptions);
});


Cypress.Commands.add('clickCanvas', (testId: string, clientX: number, clientY: number) => {
    cy.getByTestId(testId).trigger('click', {
        clientX: clientX,
        clientY: clientY,
    })
})

Cypress.Commands.add('disableSameSiteCookieRestrictions', () => {
    cy.intercept('*', (req) => {
        req.on('response', (res) => {
            if (!res.headers['set-cookie']) {
                return;
            }
            if (req.headers && req.headers['user-agent'] && req.headers['user-agent'].includes("Chrome")) {
                return;
            }

            const disableSecure = (headerContent: string): string => {
                return headerContent.replace(/secure/ig, '');
            }

            if (Array.isArray(res.headers['set-cookie'])) {
                res.headers['set-cookie'] = res.headers['set-cookie'].map(disableSecure);
            } else {
                res.headers['set-cookie'] = disableSecure(res.headers['set-cookie']);
            }
        })
    });
});
