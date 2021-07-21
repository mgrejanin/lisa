import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ApolloSnackbar } from './snackbar';

describe('ApolloSnackbar', () => {
    let page: SpecPage;
    let element: HTMLApolloSnackbarElement;

    it('should build', async () => {
        page = await newSpecPage({
            components: [ApolloSnackbar],
            html: `
                    <apollo-snackbar
                        action-button-label="Ação curta"
                        label="Insira aqui seu texto de feedback!"
                        type="done"
                    />`,
        });

        element = page.doc.querySelector('apollo-snackbar');

        expect(element).toBeTruthy();
    });

    it('should build using a non-existent type', async () => {
        process.env.NODE_ENV = 'development';

        page = await newSpecPage({
            components: [ApolloSnackbar],
            html: `
                    <apollo-snackbar
                        action-button-label="Ação curta"
                        label="Insira aqui seu texto de feedback!"
                        type="undefined"
                    />`,
        });

        element = page.doc.querySelector('apollo-snackbar');

        expect(element).toBeTruthy();
        expect(element.type).toEqual('undefined');

        process.env.NODE_ENV = '';
    });

    it('should build an emphasis snackbar', async () => {
        page = await newSpecPage({
            components: [ApolloSnackbar],
            html: `
                    <apollo-snackbar
                        action-button-label="Ação curta"
                        label="Insira aqui seu texto de feedback!"
                        type="done"
                        emphasis
                    />`,
        });

        element = page.doc.querySelector('apollo-snackbar');

        expect(element).toBeTruthy();
        expect(element.emphasis).toEqual(true);
        expect(element.firstElementChild).toHaveClass('mdc-snackbar--emphasis');
    });

    it('should build a snackbar with no action button', async () => {
        page = await newSpecPage({
            components: [ApolloSnackbar],
            html: `
                    <apollo-snackbar
                        label="Insira aqui seu texto de feedback!"
                        type="done"
                    />`,
        });

        element = page.doc.querySelector('apollo-snackbar');

        const button = page.doc.querySelector('apollo-button') as HTMLApolloButtonElement;

        expect(element).toBeTruthy();
        expect(button).toBeFalsy();
    });

    it('should build a snackbar with a dismiss button', async () => {
        page = await newSpecPage({
            components: [ApolloSnackbar],
            html: `
                    <apollo-snackbar
                        label="Insira aqui seu texto de feedback!"
                        type="undefined"
                        show-dismiss-button
                    />`,
        });

        element = page.doc.querySelector('apollo-snackbar');

        const iconButton = page.doc.querySelector('apollo-icon-button') as HTMLApolloIconButtonElement;

        expect(element).toBeTruthy();
        expect(iconButton).toBeTruthy();
        expect(iconButton).toHaveClass('mdc-snackbar__dismiss');
    });

    describe('Events and Methods', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [ApolloSnackbar],
                html: `
                        <apollo-snackbar
                            action-button-label="Ação curta"
                            label="Insira aqui seu texto de feedback!"
                            type="done"
                        />`,
            });

            element = page.doc.querySelector('apollo-snackbar');
        });

        it('should set label', async () => {
            await element.setLabel('New feedback text!');
            await page.waitForChanges();
            expect(element.label).toEqual('New feedback text!');
        });

        it('should open', async () => {
            await element.open();
            await page.waitForChanges();

            expect(element).toBeTruthy();
            expect(element.firstElementChild).toHaveClass('mdc-snackbar--opening');
        });

        it('should close', async () => {
            await element.close();
            await page.waitForChanges();

            expect(element).toBeTruthy();
            expect(element.firstElementChild.classList.contains('mdc-snackbar--opening')).toBeFalsy();
            expect(element.firstElementChild.classList.contains('mdc-snackbar--open')).toBeFalsy();
        });

        it('should call disconnectedCallback', async () => {
            let spyMethod = jest.spyOn(element, 'disconnectedCallback');

            element.remove();
            await page.waitForChanges();

            expect(element).toBeTruthy();
            expect(spyMethod).toHaveBeenCalled();
        });

        it('should emit click on action button', async () => {
            let button = page.doc.querySelector('apollo-button') as HTMLApolloButtonElement;
            let buttonSpy = jest.fn();
            page.win.addEventListener('actionButtonClick', buttonSpy);
            button.click();
            await page.waitForChanges();
            expect(buttonSpy).toHaveBeenCalled();
        });
    });
});
