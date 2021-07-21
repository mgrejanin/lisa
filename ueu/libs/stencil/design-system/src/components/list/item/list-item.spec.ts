import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ApolloListItem } from './list-item';

const cases = {
    default: `<apollo-list-item>Item1</apollo-list-item>`,
    disabled: `<apollo-list-item disabled="true">Item1</apollo-list-item>`,
    selected: `<apollo-list-item selected="true">Item1</apollo-list-item>`,
    icon: `
        <apollo-list-item>
            <apollo-icon slot="leading" svg-icon="objects-heart" size="sm"></apollo-icon>
            Item1
        </apollo-list-item>

    `,
    trailing: `
        <apollo-list-item>
            Item1
            <apollo-checkbox slot="trailing"></apollo-checkbox>
        </apollo-list-item>
    `,
    multLine: `
        <apollo-list-item>
            Item1
            <span slot="line">multi text</span>         
        </apollo-list-item>
    `,
    select: `
        <apollo-list-item select="true">Item1</apollo-list-item>
    `,
};

const snapshots = {
    default: `
        <apollo-list-item>
            <li aria-selected=\"false\" class=\"mdc-list-item\" data-value role=\"menuitem\">
                <span class=\"mdc-list-item__ripple\"></span>
                <span class=\"mdc-list-item__text\">
                    Item1
                </span>
            </li>
    </apollo-list-item>
    `,
    disabled: `
        <apollo-list-item disabled=\"true\">
            <li aria-selected=\"false\" class=\"mdc-list-item mdc-list-item--disabled\" data-value role=\"menuitem\">
                <span class=\"mdc-list-item__ripple\"></span>
                <span class=\"mdc-list-item__text\">
                    Item1
                </span>
            </li>
        </apollo-list-item>
    `,
    selected: `
        <apollo-list-item selected=\"true\">
            <li aria-selected=\"true\" class=\"mdc-list-item mdc-list-item--selected\" data-value role=\"menuitem\">
                <span class=\"mdc-list-item__ripple\"></span>
                <span class=\"mdc-list-item__text\">
                    Item1
                </span>
            </li>
    </apollo-list-item>
    `,
    icon: `
        <apollo-list-item>
            <li aria-selected=\"false\" class=\"mdc-list-item\" data-value role=\"menuitem\">
                <span class=\"mdc-list-item__ripple\"></span>
                <span aria-hidden=\"true\" class=\"mdc-list-item__graphic\">
                    <apollo-icon size=\"sm\" slot=\"leading\" svg-icon=\"objects-heart\"></apollo-icon>
                </span>
                <span class=\"mdc-list-item__text\">
                    Item1
                </span>
            </li>
        </apollo-list-item>
    `,
    trailing: `
        <apollo-list-item>
                <li aria-selected=\"false\" class=\"mdc-list-item\" data-value role=\"menuitem\">
                    <span class=\"mdc-list-item__ripple\"></span>
                    <span class=\"mdc-list-item__text\">
                        Item1
                    </span>
                    <span aria-hidden=\"true\" class=\"material-icons mdc-list-item__meta\">
                        <apollo-checkbox slot=\"trailing\"></apollo-checkbox>
                    </span>
                </li>
        </apollo-list-item>
    `,
    multLine: `
        <apollo-list-item>
            Item1
            <li aria-selected=\"false\" class=\"mdc-list-item\" data-value role=\"menuitem\">
                <span class=\"mdc-list-item__ripple\"></span>
                <span class=\"mdc-list-item__text\">
                    <span class=\"mdc-list-item__primary-text\" slot=\"line\">
                    multi text
                    </span>
                </span>
            </li>
        </apollo-list-item>
    `,
};

describe('ApolloListItem', () => {
    let page: SpecPage;
    let element: HTMLApolloListItemElement;

    const createPageSpec = (caseString: string): Promise<SpecPage> => {
        return newSpecPage({
            components: [ApolloListItem],
            html: caseString,
        });
    };

    it('should build apollo list item component', async () => {
        page = await createPageSpec(cases.default);

        element = page.doc.querySelector('apollo-list-item');

        expect(element).toBeTruthy();
        expect(page.root).toEqualHtml(snapshots.default);
    });

    it('should have class mdc-list-item--disabled when prop disabled true', async () => {
        page = await createPageSpec(cases.disabled);

        element = page.doc.querySelector('apollo-list-item');
        const liHTMLElement: HTMLLIElement = element.querySelector('li');

        expect(liHTMLElement).toHaveClass('mdc-list-item--disabled');
        expect(page.root).toEqualHtml(snapshots.disabled);
    });

    it('should have class mdc-list-item--selected when prop selected true', async () => {
        page = await createPageSpec(cases.selected);

        element = page.doc.querySelector('apollo-list-item');
        const liHTMLElement: HTMLLIElement = element.querySelector('li');

        expect(liHTMLElement).toHaveClass('mdc-list-item--selected');
        expect(page.root).toEqualHtml(snapshots.selected);
    });

    it('should have an icon slot', async () => {
        page = await createPageSpec(cases.icon);

        element = page.doc.querySelector('apollo-list-item');
        const iconSlotWrapper: HTMLElement = element.querySelector('.mdc-list-item__graphic');

        expect(iconSlotWrapper).toBeTruthy();
        expect(page.root).toEqualHtml(snapshots.icon);
    });

    it('should have trailing slot', async () => {
        page = await createPageSpec(cases.trailing);

        element = page.doc.querySelector('apollo-list-item');
        const trailingSlotWrapper: HTMLElement = element.querySelector('.mdc-list-item__meta');

        expect(trailingSlotWrapper).toBeTruthy();
        expect(page.root).toEqualHtml(snapshots.trailing);
    });

    it('should have line slot', async () => {
        page = await createPageSpec(cases.multLine);

        element = page.doc.querySelector('apollo-list-item');

        expect(element).toBeTruthy();
        expect(page.root).toEqualHtml(snapshots.multLine);
    });

    it('should have prop select true when is a select case', async () => {
        page = await createPageSpec(cases.select);

        element = page.doc.querySelector('apollo-list-item');

        expect(element.select).toEqual(true);
        expect(element).toBeTruthy();
    });

    it('should emit custom event press when list item clicked', async () => {
        page = await createPageSpec(cases.default);
        element = page.doc.querySelector('apollo-list-item');

        const liHTMLElement: HTMLLIElement = element.querySelector('li');
        const eventSpy = jest.fn();

        page.doc.addEventListener('press', eventSpy);

        await liHTMLElement.dispatchEvent(new Event('click'));
        await page.waitForChanges();

        expect(eventSpy).toHaveBeenCalled();
    });

    it('should not emit custom event press when list item clicked is disabled', async () => {
        page = await createPageSpec(cases.disabled);
        element = page.doc.querySelector('apollo-list-item');

        const liHTMLElement: HTMLLIElement = element.querySelector('li');
        const eventSpy = jest.fn();

        page.doc.addEventListener('press', eventSpy);

        await liHTMLElement.dispatchEvent(new Event('click'));
        await page.waitForChanges();

        expect(eventSpy).toHaveBeenCalledTimes(0);
    });
});
