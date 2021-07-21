import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ApolloMenu } from './menu';

describe('ApolloMenu', () => {
    let page: SpecPage;
    let element: HTMLApolloMenuElement;
    let htmlDefault = `
    <apollo-button slot="anchor">Open Menu</apollo-button>
    <apollo-list>
        <apollo-list-item id="1">Item 1</apollo-list-item>
        <apollo-list-item>Item 2</apollo-list-item>
        <apollo-list-item>Item 3</apollo-list-item>
        <apollo-list-item>Item 4</apollo-list-item>
    </apollo-list>`;

    it('should build my component', async () => {
        page = await newSpecPage({
            components: [ApolloMenu],
            html: `<apollo-menu></apollo-menu>`,
        });

        element = page.doc.querySelector('apollo-menu');

        expect(element).toBeTruthy();
    });

    it('should render a default menu', async () => {
        page = await newSpecPage({
            components: [ApolloMenu],
            html: `<apollo-menu></apollo-menu>`,
        });

        element = page.doc.querySelector('apollo-menu');
        let menu = page.doc.querySelector('.mdc-menu');
        expect(element.defaultOpen).toBe(false);
        expect(menu).toMatchClasses(['mdc-menu', 'mdc-menu-surface']);
        expect(element.select).toBe(false);
    });

    it('should render a open menu', async () => {
        page = await newSpecPage({
            components: [ApolloMenu],
            html: `<apollo-menu defaultOpen="true">
                    ${htmlDefault}
                   </apollo-menu>`,
        });

        let menu = page.doc.querySelector('.mdc-menu');
        expect(menu).toMatchClasses(['mdc-menu', 'mdc-menu-surface']);
    });

    describe('Methods and events', () => {
        let componentInstance;
        beforeEach(async () => {
            page = await newSpecPage({
                components: [ApolloMenu],
                html: `<apollo-menu>
                            ${htmlDefault}
                       </apollo-menu>`,
            });

            element = page.doc.querySelector('apollo-menu');

            expect(element).toBeTruthy();
        });

        it('should open menu', async () => {
            await element.open();
            await page.waitForChanges();
            let menu = page.doc.querySelector('.mdc-menu');
            expect(menu).toMatchClasses(['mdc-menu', 'mdc-menu-surface', 'mdc-menu-surface--animating-open']);
        });

        it('should close menu', async () => {
            await element.close();
            await page.waitForChanges();
            let menu = page.doc.querySelector('.mdc-menu');
            expect(menu).toMatchClasses(['mdc-menu', 'mdc-menu-surface']);
        });

        it('should toggle', async () => {
            await element.toggle();
            await page.waitForChanges();
            let menu = page.doc.querySelector('.mdc-menu');
            expect(menu).toMatchClasses(['mdc-menu', 'mdc-menu-surface', 'mdc-menu-surface--animating-open']);
        });

        it('should select item', async () => {
            componentInstance = page.rootInstance;
            let spyMethod = jest.spyOn(componentInstance.itemSelect, 'emit');

            componentInstance.handleItemSelect({ detail: { index: 1, item: 'li.mdc-list-item' } });
            expect(spyMethod).toBeCalled();
        });

        it('should call disconnectedCallback', async () => {
            let spyMethod = jest.spyOn(element, 'disconnectedCallback');

            element.remove();
            await page.waitForChanges();

            expect(element).toBeTruthy();
            expect(spyMethod).toHaveBeenCalled();
        });
    });
});
