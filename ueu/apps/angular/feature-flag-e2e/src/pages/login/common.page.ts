import { LoginCommonElements } from './elements/common.elements';

const elements = new LoginCommonElements();
const baseUrl = Cypress.config('baseUrl');

export class LoginCommonPage {
    navigateTo() {
        cy.visit(baseUrl);
    }

    isLocation(path: string) {
        cy.location().should(location => {
            expect(location.pathname).to.eq(path);
        });
    }

    informUser(user) {
        cy.get(elements.INPUT_USER()).type(user);
    }

    informPassword(password) {
        cy.get(elements.INPUT_PASSWORD()).type(password);
    }

    viewErrorLogin() {
        cy.get(elements.MESSAGE_ERRO()).should(
            'contain',
            'Ops! Ocorreu um erro inesperado ao processar a sua solicitação.',
        );
    }
}
