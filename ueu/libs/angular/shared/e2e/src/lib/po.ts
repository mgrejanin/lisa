import { Constructable } from './commands';
import { CustomElement } from './custom-element';

export class PageObject extends CustomElement {
    protected path: string;

    visit<T extends PageObject>(pageClass: Constructable<T>): T {
        const page = new pageClass();
        cy.visit(page.path);
        return page;
    }

    navigate<T extends PageObject>(pageClass: Constructable<T>): T {
        const page = new pageClass();
        this.location(this.path);
        return page;
    }

    elCheckValue(selector: string, value: string) {
        const element = this.getElement(selector);
        element.checkValue(value);
    }

    elValue(selector: string, value: string) {
        const element = this.getElement(selector);
        element.value(value);
    }

    constructor(selector: string) {
        super(selector);
    }
}
