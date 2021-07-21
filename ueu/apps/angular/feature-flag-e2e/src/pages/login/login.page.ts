import { LoginElements } from './elements/login.elements';

const elements = new LoginElements();

export class LoginPage {
    informAuth(auth) {
        cy.get(elements.INPUT_AUTH()).type(auth);
    }

    clickLogIn() {
        cy.get(elements.BUTTON_LOG_IN()).click();
    }

    clickFirstAccess() {
        cy.get(elements.BUTTON_FIRST_ACCESS()).click();
    }
}
