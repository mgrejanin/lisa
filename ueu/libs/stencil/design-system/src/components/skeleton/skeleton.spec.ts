import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { Skeleton } from './skeleton';

describe('ApolloSnackbar', () => {
    let page: SpecPage;
    let element: HTMLApolloSkeletonElement;

    it('should build my component', async () => {
        page = await newSpecPage({
            components: [Skeleton],
            html: `<apollo-skeleton></apollo-skeleton>`,
        });

        element = page.doc.querySelector('apollo-skeleton');

        expect(element).toBeTruthy();
    });

    it('should build my component with any animation', async () => {
        page = await newSpecPage({
            components: [Skeleton],
            html: `<apollo-skeleton animation='any'></apollo-skeleton>`,
        });

        element = page.doc.querySelector('apollo-skeleton');

        expect(element).toBeTruthy();
    });

    it('should build my component with any size', async () => {
        page = await newSpecPage({
            components: [Skeleton],
            html: `<apollo-skeleton size='any'></apollo-skeleton>`,
        });

        element = page.doc.querySelector('apollo-skeleton');

        expect(element).toBeTruthy();
    });

    it('should build my component with custom styles', async () => {
        page = await newSpecPage({
            components: [Skeleton],
            html: `<apollo-skeleton custom-styles='{"box-shadow":"0 2px 4px #ccc"}'></apollo-skeleton>`,
        });

        element = page.doc.querySelector('apollo-skeleton');

        expect(element).toBeTruthy();
    });

    it('should build my component with any custom styles', async () => {
        page = await newSpecPage({
            components: [Skeleton],
            html: `<apollo-skeleton custom-styles='any'></apollo-skeleton>`,
        });

        element = page.doc.querySelector('apollo-skeleton');

        expect(element).toBeTruthy();
    });

    it('should build my component with width', async () => {
        page = await newSpecPage({
            components: [Skeleton],
            html: `<apollo-skeleton width='100%'></apollo-skeleton>`,
        });

        element = page.doc.querySelector('apollo-skeleton');

        expect(element).toBeTruthy();
    });

    it('should build my component with height', async () => {
        page = await newSpecPage({
            components: [Skeleton],
            html: `<apollo-skeleton height='20px'></apollo-skeleton>`,
        });

        element = page.doc.querySelector('apollo-skeleton');

        expect(element).toBeTruthy();
    });

    it('should build my component when update prop', async () => {
        page = await newSpecPage({
            components: [Skeleton],
            html: `<apollo-skeleton height='20px'></apollo-skeleton>`,
        });

        element = page.doc.querySelector('apollo-skeleton');

        element.height = '40px';
        await page.waitForChanges();

        expect(element).toBeTruthy();
    });
});
