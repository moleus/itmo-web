import '@testing-library/cypress/add-commands';
import {getRandomName} from "../support/util";

const submitCredentials = (username: string, password: string, buttonId: string) => {
    cy.getByTestId('username-input').clear()
    cy.getByTestId('username-input').type(username, {force: true})
    cy.getByTestId('password-input').clear()
    cy.getByTestId('password-input').type(password, {force: true})
    cy.getByTestId(buttonId).focus().click()
}

const shouldHaveErr = (username: string, password: string, errMessage: string, buttonId: string) => {
    submitCredentials(username, password, buttonId);
    cy.get('[class="ring-error-bubble active"]').should("have.text", errMessage);
}

const shouldSubmitSuccess = (username: string, password: string, buttonId: string) => {
    submitCredentials(username, password, buttonId);
    cy.get('[class="ring-error-bubble active"]').should("not.exist");
}

const shouldBeRootUrl = () => {
    cy.url().should('eq', Cypress.config().baseUrl);
}

const shouldBeLoginUrl = () => {
    cy.url().should('eq', Cypress.config().baseUrl + "login");
}

const addPointOnCanvas = () => {
    cy.getByTestId('axis-canvas').click("center");
}

describe('authentication process', function () {
    it('should fail login with invalid credentials', function () {
        const newUsername = getRandomName();

        cy.visit("/");
        shouldBeLoginUrl()

        shouldHaveErr("username", "k", "password must be at least 5 characters", 'login-button');
        shouldHaveErr("k", "password", "username must be at least 4 characters", 'register-button');
        shouldHaveErr(newUsername, "defaultPassword", "Invalid login or password provided", 'login-button');
    });

    it('should register add hit and logout', function () {
        const newUsername = getRandomName();
        const password = "defaultPassword";

        cy.disableSameSiteCookieRestrictions();

        cy.visit("/");
        cy.getCookies().should('be.empty')
        shouldSubmitSuccess(newUsername, password, 'register-button')
        shouldBeRootUrl();
        cy.getCookie("JSESSIONID").should('exist')
        addPointOnCanvas();
        cy.get('[data-test=ring-table-body]').find('td').should('have.text', "No data");

        cy.log("Logout")
        cy.getByTestId('logout-button').click();
        shouldBeLoginUrl();
        cy.getCookies().should('be.empty')
        shouldHaveErr(newUsername, password + "_invalid", "User already exists", 'register-button')
        shouldSubmitSuccess(newUsername, password, 'login-button');
        cy.get('[data-test=ring-table-body]').find('td').should('not.have.text', "No data");
        cy.get('[data-test=ring-table-body]').find("tr").should("have.length", 1);
    });
});