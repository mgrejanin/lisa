import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ApolloDialog } from './dialog';

describe('ApolloDialog', () => {
    let page: SpecPage;
    let element: HTMLApolloDialogElement;

    it('should build my component', async () => {
        page = await newSpecPage({
            components: [ApolloDialog],
            html: `<apollo-dialog></apollo-dialog>`,
        });

        element = page.doc.querySelector('apollo-dialog');

        expect(element).toBeTruthy();
    });

    it('should render title and subtitle', async () => {
        page = await newSpecPage({
            components: [ApolloDialog],
            html: `<apollo-dialog
                        dialog-title="Apollo Dialog"
                        dialog-subtitle="Descrição da Dialog"
                    ></apollo-dialog>`,
        });

        let title = page.doc.querySelector('.mdc-dialog__title__text');

        expect(title.querySelector('h3')).toEqualText('Apollo Dialog');
        expect(title.querySelector('span')).toEqualText('Descrição da Dialog');
    });

    it('should render icon', async () => {
        page = await newSpecPage({
            components: [ApolloDialog],
            html: `<apollo-dialog
                        icon="money_business-atm-card",
                    ></apollo-dialog>`,
        });

        let icon = page.doc.querySelector('.mdc-dialog__title__icon');

        expect(icon.querySelector('apollo-icon')).toEqualAttribute('svgIcon', 'money_business-atm-card');
    });

    it('should render buttons', async () => {
        page = await newSpecPage({
            components: [ApolloDialog],
            html: `<apollo-dialog
                        cancel-button-label="Cancelar"
                        confirm-button-label="Confirmar"
                    ></apollo-dialog>`,
        });

        let buttons = page.doc.querySelector('.mdc-dialog__actions').querySelectorAll('apollo-button');

        expect(buttons[0]).toEqualAttribute('data-mdc-dialog-action', 'cancel');
        expect(buttons[0]).toEqualText('Cancelar');
        expect(buttons[1]).toEqualAttribute('data-mdc-dialog-action', 'accept');
        expect(buttons[1]).toEqualText('Confirmar');
    });
});
