import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ApolloIconButton } from './icon-button';

describe('ApolloIconButton', () => {
    let page: SpecPage;
    let element: HTMLApolloIconButtonElement;

    it('should build my component', async () => {
        page = await newSpecPage({
            components: [ApolloIconButton],
            html: `<apollo-icon-button></apollo-icon-button>`,
        });

        element = page.doc.querySelector('apollo-icon-button');

        expect(element).toBeTruthy();
    });

    it('should build my component', async () => {
        page = await newSpecPage({
            components: [ApolloIconButton],
            html: `<apollo-icon-button 
                    icon="objects-heart" 
                ></apollo-icon-button>`,
        });

        let icon = page.doc.querySelector('apollo-icon');

        expect(icon).toEqualText('objects-heart');
    });

    it('should set invalid', async () => {
        page = await newSpecPage({
            components: [ApolloIconButton],
            html: `<apollo-icon-button 
                    icon="objects-heart"
                    invalid
                ></apollo-icon-button>`,
        });

        let invalid = page.doc.querySelector('.mdc-icon-button--invalid');

        expect(invalid).toBeTruthy();
    });

    it('should set iconOn and iconOff', async () => {
        page = await newSpecPage({
            components: [ApolloIconButton],
            html: `<apollo-icon-button 
                    icon-on="arrows-arrow-down-right" 
                    icon-off="arrows-arrow-down-left"
                ></apollo-icon-button>`,
        });

        let icon = page.doc.querySelectorAll('apollo-icon');
        let iconOn = icon[0];
        let iconOff = icon[1];

        expect(iconOff).toEqualText('arrows-arrow-down-left');
        expect(iconOn).toEqualText('arrows-arrow-down-right');

        let button = page.doc.querySelector('button');
        expect(button).not.toHaveClass('mdc-icon-button--on');
        button.click();
        await page.waitForChanges();
        expect(button).toHaveClass('mdc-icon-button--on');
    });

    it('should set checked', async () => {
        page = await newSpecPage({
            components: [ApolloIconButton],
            html: `<apollo-icon-button 
                    icon-on="arrows-arrow-down-right" 
                    icon-off="arrows-arrow-down-left"
                    checked="true"
                ></apollo-icon-button>`,
        });

        let button = page.doc.querySelector('button');

        expect(button).toHaveClass('mdc-icon-button--on');
    });

    it('should set pid', async () => {
        page = await newSpecPage({
            components: [ApolloIconButton],
            html: `<apollo-icon-button 
                    pid="123"
                ></apollo-icon-button>`,
        });

        let button = page.doc.querySelector('.mdc-icon-button');

        expect(button).toEqualAttribute('id', '123');
    });

    it('should set size', async () => {
        page = await newSpecPage({
            components: [ApolloIconButton],
            html: `<apollo-icon-button 
                    size="md"
                ></apollo-icon-button>`,
        });

        let icon = page.doc.querySelector('apollo-icon');

        expect(icon).toEqualAttribute('size', 'md');
    });

    it('should set color', async () => {
        page = await newSpecPage({
            components: [ApolloIconButton],
            html: `<apollo-icon-button 
                    color="#000"
                ></apollo-icon-button>`,
        });

        let icon = page.doc.querySelector('apollo-icon');

        expect(icon).toEqualAttribute('color', '#000');
    });

    describe('Events and Methods', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [ApolloIconButton],
                html: `<apollo-icon-button
                        icon-on="arrows-arrow-down-right"
                        icon-off="arrows-arrow-down-left"
                    ></apollo-icon-button>`,
            });

            element = page.doc.querySelector('apollo-icon-button');

            expect(element).toBeTruthy();
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
