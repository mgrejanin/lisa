import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ApolloSwitchToggle } from './switch-toggle';

describe('ApolloSwitchToggle', () => {
    let page: SpecPage;
    let element: HTMLApolloSwitchToggleElement;

    it('should build my component', async () => {
        page = await newSpecPage({
            components: [ApolloSwitchToggle],
            html: `<apollo-switch-toggle label="Off/On" />`,
        });

        element = page.doc.querySelector('apollo-switch-toggle');

        expect(element).toBeTruthy();
    });

    it('should render a default component', async () => {
        page = await newSpecPage({
            components: [ApolloSwitchToggle],
            html: `<apollo-switch-toggle />`,
        });

        element = page.doc.querySelector('apollo-switch-toggle');

        expect(element.checked).toBe(false);
        expect(element.disabled).toBe(false);
        expect(element.label).toBe('');
        expect(element.nowrap).toBe(false);
        expect(element.position).toBe('after');

        let toggle = page.doc.querySelector('.mdc-switch');
        expect(toggle).toMatchClasses(['mdc-switch']);

        let formField = page.doc.querySelector('.mdc-form-field');
        expect(formField).toMatchClasses(['mdc-form-field']);
    });

    it('should set checked', async () => {
        page = await newSpecPage({
            components: [ApolloSwitchToggle],
            html: `<apollo-switch-toggle checked />`,
        });

        element = page.doc.querySelector('.mdc-switch');

        expect(element).toHaveClass('mdc-switch--checked');
    });

    it('should set disabled', async () => {
        page = await newSpecPage({
            components: [ApolloSwitchToggle],
            html: `<apollo-switch-toggle disabled />`,
        });

        element = page.doc.querySelector('.mdc-switch');

        expect(element).toHaveClass('mdc-switch--disabled');
    });

    it('should set label', async () => {
        page = await newSpecPage({
            components: [ApolloSwitchToggle],
            html: `<apollo-switch-toggle label="Off/On" />`,
        });

        element = page.doc.querySelector('apollo-switch-toggle');

        expect(element).toEqualText('Off/On');
    });

    it('should set nowrap', async () => {
        page = await newSpecPage({
            components: [ApolloSwitchToggle],
            html: `<apollo-switch-toggle nowrap="true"/>`,
        });

        element = page.doc.querySelector('.mdc-form-field');

        expect(element).toHaveClass('mdc-form-field--nowrap');
    });

    it('should set position', async () => {
        page = await newSpecPage({
            components: [ApolloSwitchToggle],
            html: `<apollo-switch-toggle position="before"/>`,
        });

        element = page.doc.querySelector('.mdc-form-field');

        expect(element).toHaveClass('mdc-form-field--align-end');
    });

    describe('Methods', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [ApolloSwitchToggle],
                html: `<apollo-switch-toggle label="Off/On" />`,
            });

            element = page.doc.querySelector('apollo-switch-toggle');

            expect(element).toBeTruthy();
        });

        it('should set disabled', async () => {
            await element.setDisabled(true);
            await page.waitForChanges();
            let disabled = page.doc.querySelector('.mdc-switch--disabled');
            expect(disabled).toBeTruthy();
        });

        it('should set checked', async () => {
            await element.setChecked(true);
            await page.waitForChanges();
            let input = page.doc.querySelector('.mdc-switch');
            expect(input).toHaveClass('mdc-switch--checked');
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
