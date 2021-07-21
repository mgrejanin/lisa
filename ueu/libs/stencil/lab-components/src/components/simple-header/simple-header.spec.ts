import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { LabSimpleHeader } from './simple-header';

describe('LabSimpleHeader', () => {
    let page: SpecPage;
    let element: HTMLLabSimpleHeaderElement;

    it('should build simple-header component', async () => {
        page = await newSpecPage({
            components: [LabSimpleHeader],
            html: `<lab-simple-header />`,
        });

        element = page.doc.querySelector('lab-simple-header');

        expect(element).toBeTruthy();
    });

    it('should build simple-header component with editing status', async () => {
        page = await newSpecPage({
            components: [LabSimpleHeader],
            html: `<lab-simple-header is-editing='true' />`,
        });

        element = page.doc.querySelector('lab-simple-header');

        expect(element.isEditing).toBeTruthy();
    });

    it('should build simple-header component with any page title', async () => {
        page = await newSpecPage({
            components: [LabSimpleHeader],
            html: `<lab-simple-header page-title='Detalhes do Produto' />`,
        });

        element = page.doc.querySelector('lab-simple-header');

        expect(element.pageTitle).toEqual('Detalhes do Produto');
    });

    it('should emit click on back button', async () => {
        page = await newSpecPage({
            components: [LabSimpleHeader],
            html: `<lab-simple-header />`,
        });

        const callbackFn = jest.fn();
        page.doc.addEventListener('backButtonClick', callbackFn);
        const button = page.root.shadowRoot.querySelector('apollo-icon-button') as HTMLApolloIconButtonElement;
        await button.click();
        expect(callbackFn).toHaveBeenCalled();
    });
});
