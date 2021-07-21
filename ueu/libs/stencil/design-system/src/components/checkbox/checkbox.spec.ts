import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ApolloCheckbox } from './checkbox';

describe('ApolloCheckbox', () => {
    let page: SpecPage;
    let element: HTMLApolloCheckboxElement;

    it('should build my component', async () => {
        page = await newSpecPage({
            components: [ApolloCheckbox],
            html: `<apollo-checkbox>PicPay Lovers</apollo-checkbox>`,
        });

        element = page.doc.querySelector('apollo-checkbox');

        expect(element).toBeTruthy();
    });

    it('should render default checkbox', async () => {
        page = await newSpecPage({
            components: [ApolloCheckbox],
            html: `<apollo-checkbox>PicPay Lovers</apollo-checkbox>`,
        });

        let invalidClass = page.doc.querySelector('.mdc-checkbox--invalid');
        expect(invalidClass).toBeNull();

        let noWrapClass = page.doc.querySelector('.mdc-form-field--nowrap');
        expect(noWrapClass).not.toBeNull();

        let alignEndClass = page.doc.querySelector('.mdc-form-field--align-end');
        expect(alignEndClass).toBeNull();

        let input = page.doc.querySelector('input');
        expect(input.indeterminate).toBe(false);
        expect(input.disabled).toBe(false);
        expect(input.checked).toBe(false);
        expect(input.name).toBe('');
    });

    it('should render checkbox with label', async () => {
        page = await newSpecPage({
            components: [ApolloCheckbox],
            html: `<apollo-checkbox>PicPay Lovers</apollo-checkbox>`,
        });

        element = page.doc.querySelector('apollo-checkbox');

        expect(element).toEqualText('PicPay Lovers');
    });

    it('should render invalid checkbox', async () => {
        page = await newSpecPage({
            components: [ApolloCheckbox],
            html: `<apollo-checkbox invalid />`,
        });

        let element = page.doc.querySelector('.mdc-checkbox--invalid');

        expect(element).not.toBeNull();
    });

    it('should render indeterminate checkbox', async () => {
        page = await newSpecPage({
            components: [ApolloCheckbox],
            html: `<apollo-checkbox indeterminate />`,
        });

        let element = page.doc.querySelector('input');

        expect(element.indeterminate).toBe(true);
    });

    it('should render disabled checkbox', async () => {
        page = await newSpecPage({
            components: [ApolloCheckbox],
            html: `<apollo-checkbox disabled />`,
        });

        let element = page.doc.querySelector('input');

        expect(element.disabled).toBe(true);
    });

    it('should render checkbox with label position before', async () => {
        page = await newSpecPage({
            components: [ApolloCheckbox],
            html: `<apollo-checkbox position="before">PicPay Lovers</apollo-checkbox>`,
        });

        let element = page.doc.querySelector('.mdc-form-field--align-end');

        expect(element).not.toBeNull();
    });

    it('should render checkbox with nowrap false', async () => {
        page = await newSpecPage({
            components: [ApolloCheckbox],
            html: `<apollo-checkbox nowrap="false">PicPay Lovers</apollo-checkbox>`,
        });

        let element = page.doc.querySelector('.mdc-form-field--nowrap');

        expect(element).toBeNull();
    });

    it('should set checkbox checked', async () => {
        page = await newSpecPage({
            components: [ApolloCheckbox],
            html: `<apollo-checkbox checked="true">PicPay Lovers</apollo-checkbox>`,
        });

        let input = page.doc.querySelector('input');

        expect(input.checked).toBe(true);
    });

    it('should set checkbox name', async () => {
        page = await newSpecPage({
            components: [ApolloCheckbox],
            html: `<apollo-checkbox name="PP Lovers">PicPay Lovers</apollo-checkbox>`,
        });

        let input = page.doc.querySelector('input');

        expect(input.name).toBe('PP Lovers');
    });
});
