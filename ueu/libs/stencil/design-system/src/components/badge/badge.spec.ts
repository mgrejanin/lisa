import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ApolloBadge } from './badge';

describe('ApolloDialog', () => {
    let page: SpecPage;
    let element: HTMLApolloBadgeElement;

    it('should build my component', async () => {
        page = await newSpecPage({
            components: [ApolloBadge],
            html: `<apollo-badge></apollo-badge>`,
        });

        element = page.doc.querySelector('apollo-badge');

        expect(element).toBeTruthy();
    });

    it('should render simple badge', async () => {
        page = await newSpecPage({
            components: [ApolloBadge],
            html: `<apollo-badge></apollo-badge>`,
        });

        element = page.doc.querySelector('.apollo-badge');

        expect(element).toMatchClasses(['apollo-badge', 'apollo-badge--simple']);
    });

    it('should render numeric badge default (99+)', async () => {
        page = await newSpecPage({
            components: [ApolloBadge],
            html: `<apollo-badge variant="numeric"></apollo-badge>`,
        });

        element = page.doc.querySelector('.apollo-badge');

        expect(element).toMatchClasses(['apollo-badge', 'apollo-badge--numeric']);
        expect(element).toEqualText('99+');
    });

    it('should render numeric badge with quantity', async () => {
        page = await newSpecPage({
            components: [ApolloBadge],
            html: `<apollo-badge variant="numeric" quantity="20"></apollo-badge>`,
        });

        element = page.doc.querySelector('.apollo-badge');

        expect(element).toMatchClasses(['apollo-badge', 'apollo-badge--numeric']);
        expect(element).toEqualText('20');
    });
});
