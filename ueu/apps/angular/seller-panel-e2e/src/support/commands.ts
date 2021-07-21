// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
        login(email: string, password: string, cnpj: string): void;
    }
}

Cypress.Commands.add('login', (email, password, cnpj) => {
    cy.get('input[type=text]').type(cnpj);
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(password);

    cy.get('button[type=submit]').click();
});
