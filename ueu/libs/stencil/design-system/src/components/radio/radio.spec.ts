import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ApolloRadio } from './radio';

describe('ApolloRadio', () => {
    let page: SpecPage;
    let element: HTMLApolloRadioElement;

    it('should build my component', async () => {
        page = await newSpecPage({
            components: [ApolloRadio],
            html: `<apollo-radio label="PicPay Lovers" />`,
        });

        element = page.doc.querySelector('apollo-radio');

        expect(element).toBeTruthy();
    });

    it('should set label', async () => {
        page = await newSpecPage({
            components: [ApolloRadio],
            html: `<apollo-radio label="PicPay Lovers" />`,
        });

        element = page.doc.querySelector('apollo-radio');

        expect(element).toEqualText('PicPay Lovers');
    });

    it('should set checked', async () => {
        page = await newSpecPage({
            components: [ApolloRadio],
            html: `<apollo-radio label="PicPay Lovers" checked/>`,
        });

        element = page.doc.querySelector('.mdc-radio');

        expect(element).toHaveClass('mdc-radio--checked');
    });

    it('should set disabled', async () => {
        page = await newSpecPage({
            components: [ApolloRadio],
            html: `<apollo-radio label="PicPay Lovers" disabled/>`,
        });

        element = page.doc.querySelector('.mdc-radio');

        expect(element).toHaveClass('mdc-radio--disabled');
    });

    it('should set invalid', async () => {
        page = await newSpecPage({
            components: [ApolloRadio],
            html: `<apollo-radio label="PicPay Lovers" invalid/>`,
        });

        element = page.doc.querySelector('.mdc-radio');

        expect(element).toHaveClass('mdc-radio--invalid');
    });

    it('should set inline', async () => {
        page = await newSpecPage({
            components: [ApolloRadio],
            html: `<apollo-radio label="PicPay Lovers" inline/>`,
        });

        element = page.doc.querySelector('label');

        expect(element).toHaveClass('radio-inline');
    });

    it('should set name', async () => {
        page = await newSpecPage({
            components: [ApolloRadio],
            html: `<apollo-radio label="PicPay Lovers" name="PicPay"/>`,
        });

        element = page.doc.querySelector('input');

        expect(element).toEqualAttribute('name', 'PicPay');
    });

    it('should set nowrap', async () => {
        page = await newSpecPage({
            components: [ApolloRadio],
            html: `<apollo-radio label="PicPay Lovers" nowrap="false"/>`,
        });

        element = page.doc.querySelector('.mdc-form-field');

        expect(element).toMatchClasses(['mdc-form-field']);
    });

    it('should set position', async () => {
        page = await newSpecPage({
            components: [ApolloRadio],
            html: `<apollo-radio label="PicPay Lovers" position="before"/>`,
        });

        element = page.doc.querySelector('.mdc-form-field');

        expect(element).toHaveClass('mdc-form-field--align-end');
    });

    describe('Methods', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [ApolloRadio],
                html: `<apollo-radio label="PicPay Lovers" value="1"/>`,
            });

            element = page.doc.querySelector('apollo-radio');

            expect(element).toBeTruthy();
        });

        it('should set disabled', async () => {
            await element.setDisabled(true);
            await page.waitForChanges();
            let disabled = page.doc.querySelector('.mdc-radio--disabled');
            expect(disabled).toBeTruthy();
        });

        it('should emit apolloChange event', async () => {
            let eventSpy = jest.fn();
            page.doc.addEventListener('apolloChange', eventSpy);
            const inputElement = page.doc.querySelector('input');
            await inputElement.dispatchEvent(new Event('change'));
            await page.waitForChanges();
            expect(eventSpy).toHaveBeenCalled();
        });

        it('should emit apolloBlur event', async () => {
            let eventSpy = jest.fn();
            page.doc.addEventListener('apolloBlur', eventSpy);
            const inputElement = page.doc.querySelector('input');
            await inputElement.dispatchEvent(new Event('blur'));
            await page.waitForChanges();
            expect(eventSpy).toHaveBeenCalled();
        });
    });
});
