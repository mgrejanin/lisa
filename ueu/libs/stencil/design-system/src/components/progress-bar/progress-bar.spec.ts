import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ProgressBar } from './progress-bar';

describe('ApolloProgressBar', () => {
    let page: SpecPage;
    let element: HTMLApolloProgressBarElement;

    beforeEach(async () => {
        page = await newSpecPage({
            components: [ProgressBar],
            html: `<apollo-progress-bar total="10" fraction="5"></apollo-progress-bar>`,
        });
        element = page.doc.querySelector('apollo-progress-bar');

        expect(element).toBeTruthy();
    });

    it('should render props', async () => {
        expect(element.total).toEqual(10);
        expect(element.fraction).toEqual(5);
    });

    it('shoud call the componentDidUpdate() lifecycle', async () => {
        const componentDidUpdate = await page.rootInstance.componentDidUpdate();

        await page.waitForChanges();
        expect(componentDidUpdate).toHaveBeenCalled;
    });

    it('should render the component with updated progress value and style', async () => {
        element.total = 100;
        element.fraction = 30;

        await page.waitForChanges();

        const percentage = page.doc.querySelector('.apollo-progress-bar__percentage');
        expect(percentage.textContent).toContain('30%');

        const bar = page.doc.querySelector('.apollo-progress-bar__fill');
        expect(bar.getAttribute('style')).toEqual('width: 30%;');
    });
});
