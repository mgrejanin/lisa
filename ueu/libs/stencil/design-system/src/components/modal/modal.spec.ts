import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ApolloModal } from './modal';

describe('ApolloModal', () => {
    let page: SpecPage;
    let element: HTMLApolloModalElement;

    it('should build my component', async () => {
        page = await newSpecPage({
            components: [ApolloModal],
            html: `<apollo-modal></apollo-modal>`,
        });

        element = page.doc.querySelector('apollo-modal');

        expect(element).toBeTruthy();
    });

    it('should render title and subtitle', async () => {
        page = await newSpecPage({
            components: [ApolloModal],
            html: `<apollo-modal
                        modal-title="Apollo Modal"
                        modal-subtitle="Descrição da Modal"
                    ></apollo-modal>`,
        });

        let title = page.doc.querySelector('.mdc-dialog__title__text');

        expect(title.querySelector('h3')).toEqualText('Apollo Modal');
        expect(title.querySelector('span')).toEqualText('Descrição da Modal');
    });

    it('should render icon', async () => {
        page = await newSpecPage({
            components: [ApolloModal],
            html: `<apollo-modal
                        icon="money_business-atm-card",
                    ></apollo-modal>`,
        });

        let icon = page.doc.querySelector('.mdc-dialog__title__icon');

        expect(icon.querySelector('apollo-icon')).toEqualAttribute('svgIcon', 'money_business-atm-card');
    });
});
