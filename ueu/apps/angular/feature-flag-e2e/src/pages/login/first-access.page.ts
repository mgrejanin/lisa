import { FirstAccessElements } from './elements/first-access.elements';

const elements = new FirstAccessElements();

export class FirstAccessPage {
    clickNextFirstAccess() {
        cy.get(elements.BUTTON_NEXT_FIRST_ACCESS()).click();
    }
}
