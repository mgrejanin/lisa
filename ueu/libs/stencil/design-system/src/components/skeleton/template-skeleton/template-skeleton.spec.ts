import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TemplateSkeleton } from './template-skeleton';

describe('ApolloSnackbar', () => {
    let page: SpecPage;
    let element: HTMLApolloTemplateSkeletonElement;

    it('should build my component', async () => {
        page = await newSpecPage({
            components: [TemplateSkeleton],
            html: `<apollo-template-skeleton></apollo-template-skeleton>`,
        });

        element = page.doc.querySelector('apollo-template-skeleton');

        expect(element).toBeTruthy();
    });

    it('should build my component with any avatar size', async () => {
        page = await newSpecPage({
            components: [TemplateSkeleton],
            html: `<apollo-template-skeleton avatar avatar-size='any'></apollo-template-skeleton>`,
        });

        element = page.doc.querySelector('apollo-template-skeleton');

        expect(element).toBeTruthy();
    });

    it('should build my component when update prop', async () => {
        page = await newSpecPage({
            components: [TemplateSkeleton],
            html: `<apollo-template-skeleton text-height='20px'></apollo-template-skeleton>`,
        });

        element = page.doc.querySelector('apollo-template-skeleton');

        element.textHeight = '40px';
        await page.waitForChanges();

        expect(element).toBeTruthy();
    });
});
