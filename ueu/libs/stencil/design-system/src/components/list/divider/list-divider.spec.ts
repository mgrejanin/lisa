import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ApolloListDivider } from './list-divider';

const cases = {
    default: `<apollo-list-divider></apollo-list-divider>`,
};

const snapshots = {
    default: `
        <apollo-list-divider>
            <li class="mdc-list-divider" role="separator"></li>
        </apollo-list-divider>
    `,
};

describe('ApolloListDivider', () => {
    let page: SpecPage;
    let element: HTMLApolloListDividerElement;

    const createPageSpec = (caseString: string): Promise<SpecPage> => {
        return newSpecPage({
            components: [ApolloListDivider],
            html: caseString,
        });
    };

    it('should build apollo list group component and match html snapshot', async () => {
        page = await createPageSpec(cases.default);

        element = page.doc.querySelector('apollo-list-divider');

        expect(element).toBeTruthy();
        expect(page.root).toEqualHtml(snapshots.default);
    });
});
