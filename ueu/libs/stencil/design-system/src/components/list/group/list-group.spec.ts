import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ApolloListGroup } from './list-group';

const cases = {
    default: `
        <apollo-list-group>
            <apollo-list-item>
                Item1
            </apollo-list-item>
            <apollo-list-item>
                Item2
            </apollo-list-item>
        </apollo-list-group>
    `,
    header: `
        <apollo-list-group header="Title1">
            <apollo-list-item>
                Item1
            </apollo-list-item>
            <apollo-list-item>
                Item2
            </apollo-list-item>
        </apollo-list-group>
    `,
};

const snapshots = {
    default: `
        <apollo-list-group>
            <div class=\"mdc-list-group\">
            <ul class=\"mdc-list\">
                <apollo-list-item>
                Item1
                </apollo-list-item>
                <apollo-list-item>
                Item2
                </apollo-list-item>
            </ul>
            </div>
    </apollo-list-group>
    `,
    header: `
        <apollo-list-group header=\"Title1\">
            <div class=\"mdc-list-group\">
            <h3 class=\"mdc-list-group__subheader\">
                Title1
            </h3>
            <ul class=\"mdc-list\">
                <apollo-list-item>
                Item1
                </apollo-list-item>
                <apollo-list-item>
                Item2
                </apollo-list-item>
            </ul>
            </div>
    </apollo-list-group>
    `,
};

describe('ApolloListGroup', () => {
    let page: SpecPage;
    let element: HTMLApolloListGroupElement;

    const createPageSpec = (caseString: string): Promise<SpecPage> => {
        return newSpecPage({
            components: [ApolloListGroup],
            html: caseString,
        });
    };

    it('should build apollo list group component', async () => {
        page = await createPageSpec(cases.default);

        element = page.doc.querySelector('apollo-list-group');

        expect(element).toBeTruthy();
        expect(page.root).toEqualHtml(snapshots.default);
    });

    it('should build apollo list group component with header prop', async () => {
        page = await createPageSpec(cases.header);

        element = page.doc.querySelector('apollo-list-group');

        expect(element).toBeTruthy();
        expect(element.header).toEqual('Title1');
        expect(page.root).toEqualHtml(snapshots.header);
    });
});
