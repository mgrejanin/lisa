import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { Button } from './button';

describe('ApolloButton', () => {
    let page: SpecPage;
    let element: HTMLApolloButtonElement;

    it('should build my component', async () => {
        page = await newSpecPage({
            components: [Button],
            html: `<apollo-button></apollo-button>`,
        });

        element = page.doc.querySelector('apollo-button');

        expect(element).toBeTruthy();
    });

    it('should build my component with label', async () => {
        page = await newSpecPage({
            components: [Button],
            html: `<apollo-button>PicPay Lover</apollo-button>`,
        });

        element = page.doc.querySelector('apollo-button');

        expect(element).toEqualText('PicPay Lover');
    });

    it('should build my component with leading icon', async () => {
        page = await newSpecPage({
            components: [Button],
            html: `<apollo-button>
                <apollo-icon slot="leading-icon" svg-icon="objects-heart" size="sm"></apollo-icon>
            </apollo-button>`,
        });

        element = page.doc.querySelector('apollo-button');

        expect(element).toBeTruthy();

        const icon = page.doc.querySelector('apollo-icon');

        expect(icon).toBeTruthy();
    });

    it('should build my component with trailing icon', async () => {
        page = await newSpecPage({
            components: [Button],
            html: `<apollo-button>
                <apollo-icon slot="trailing-icon" svg-icon="objects-heart" size="sm"></apollo-icon>
            </apollo-button>`,
        });

        element = page.doc.querySelector('apollo-button');

        expect(element).toBeTruthy();

        const icon = page.doc.querySelector('apollo-icon');

        expect(icon).toBeTruthy();
    });

    describe('Methods', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [Button],
                html: `<apollo-button></apollo-button>`,
            });

            element = page.doc.querySelector('apollo-button');

            expect(element).toBeTruthy();
        });

        it('should set loading', async () => {
            await element.setLoading(true);
            await page.waitForChanges();
            expect(element.loading).toEqual(true);
        });
    });
});
