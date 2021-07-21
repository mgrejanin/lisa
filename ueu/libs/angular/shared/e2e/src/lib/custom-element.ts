import { findElement } from './commands';

export class CustomElement {
    private _element: Cypress.Chainable<JQuery>;

    protected findElement(): Cypress.Chainable<JQuery> {
        if (!this._element) {
            this._element = findElement(this.selector, this.parentSelector);
        }
        return this._element;
    }

    value(value: string) {
        const element = this.findElement();
        element.type(value).should('have.value', value).wait(500);
    }

    checkValue(value: string) {
        const element = this.findElement();
        element.should('have.value', value).wait(500);
    }

    click() {
        const element = this.findElement();
        element.click().wait(500);
    }

    getElement(selector: string) {
        return new CustomElement(selector, this.selector);
    }

    location(path: string) {
        cy.location('pathname', { timeout: 10000 }).should('include', path).wait(500);
    }

    shouldHaveClass(className: string) {
        const element = this.findElement();
        element.should('have.class', className);
    }

    shouldBeVisible() {
        const element = this.findElement();
        element.should('be.visible');
    }

    constructor(public selector: string, public parentSelector?: string) {}
}
