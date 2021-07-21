import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ApolloList } from './list';

const cases = {
    default: `
        <apollo-list>
            <apollo-list-item>
                Item1
            </apollo-list-item>
            <apollo-list-item>
                Item2
            </apollo-list-item>
        </apollo-list>
            `,
    dense: `
        <apollo-list dense="true">
            <apollo-list-item>
                Item1
            </apollo-list-item>
            <apollo-list-item>
                Item2
            </apollo-list-item>
        </apollo-list>
    `,
    menuParent: `
        <apollo-menu>
            <apollo-list>
                <apollo-list-item>Item 1</apollo-list-item>
                <apollo-list-item>Item 2</apollo-list-item>
            </apollo-list>
        </apollo-menu>`,
};

const snapshot = {
    default: `
        <apollo-list>
            <ul aria-hidden="true" aria-orientation="vertical" class="mdc-list" role="menu" tabindex="-1">
                <apollo-list-item> Item1 </apollo-list-item>
                <apollo-list-item> Item2 </apollo-list-item>
            </ul>
        </apollo-list>
    `,
    dense: `
        <apollo-list dense="true">
            <ul aria-hidden="true" aria-orientation="vertical" class="mdc-list mdc-list--dense" role="menu" tabindex="-1">
                <apollo-list-item> Item1 </apollo-list-item>
                <apollo-list-item> Item2 </apollo-list-item>
            </ul>
        </apollo-list>
    `,
    menuParent: `
        <apollo-list>
            <ul aria-hidden=\"true\" aria-orientation=\"vertical\" class=\"mdc-list\" role=\"menu\" tabindex=\"-1\">
            <apollo-list-item>
                Item 1
            </apollo-list-item>
            <apollo-list-item>
                Item 2
            </apollo-list-item>
            </ul>
        </apollo-list>
    `,
};

describe('ApolloList', () => {
    let page: SpecPage;
    let element: HTMLApolloListElement;

    const createPageSpec = (caseString: string): Promise<SpecPage> => {
        return newSpecPage({
            components: [ApolloList],
            html: caseString,
        });
    };

    it('should build apollo list component', async () => {
        page = await createPageSpec(cases.default);

        element = page.doc.querySelector('apollo-list');

        expect(element).toBeTruthy();
        expect(page.root).toEqualHtml(snapshot.default);
    });

    it('should have class mdc-list--dense when dense prop is true', async () => {
        page = await createPageSpec(cases.dense);

        element = page.doc.querySelector('apollo-list');
        const ulHTMLElement: HTMLUListElement = element.querySelector('ul');

        expect(ulHTMLElement).toHaveClass('mdc-list--dense');
        expect(page.root).toEqualHtml(snapshot.dense);
    });

    it('should render apollo list component with parent node as apollo menu', async () => {
        page = await createPageSpec(cases.menuParent);

        element = page.doc.querySelector('apollo-list');

        expect(element).toBeTruthy();
        expect(page.root).toEqualHtml(snapshot.menuParent);
    });

    it('should trigger disconnectedCallback if remove the component from dom when list variable is true', async () => {
        page = await createPageSpec(cases.default);

        element = page.doc.querySelector('apollo-list');
        const spyMethod = jest.spyOn(element, 'disconnectedCallback');
        element.remove();

        expect(spyMethod).toHaveBeenCalled();
    });

    it('should trigger disconnectedCallback if remove the component from dom when list variable is false', async () => {
        page = await createPageSpec(cases.menuParent);

        element = page.doc.querySelector('apollo-list');
        const spyMethod = jest.spyOn(element, 'disconnectedCallback');
        element.remove();

        expect(spyMethod).toHaveBeenCalled();
    });
});
