import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { Icon } from './icon';

describe('IconComponent', () => {
    let page: SpecPage;
    let element: HTMLApolloIconElement;

    beforeEach(async () => {
        page = await newSpecPage({
            components: [Icon],
            html: `<apollo-icon svg-icon="arrows-arrow-circle-left"></apollo-icon>`,
        });

        element = page.doc.querySelector('apollo-icon');

        expect(page.root).toMatchSnapshot();
    });

    it('should build', () => {
        expect(element).toBeTruthy();
        expect(element).toHaveClass('apollo-icon--svg');
    });

    it('should render props', () => {
        expect(element.svgIcon).toEqual('arrows-arrow-circle-left');
        expect(element.size).toEqual('md');
    });

    it('should have expected viewBox on <svg>', () => {
        expect(element.querySelector('svg').attributes.getNamedItem('viewBox')).not.toEqual('');
        expect(element.querySelector('svg').attributes.getNamedItem('viewBox').value).toEqual('0 0 24 24');
    });

    it('should have expected width, height on <svg>', () => {
        expect(element.querySelector('svg').attributes.getNamedItem('width').value).toEqual('24');
        expect(element.querySelector('svg').attributes.getNamedItem('height').value).toEqual('24');
    });

    it('should have expected color and fill on <svg>', async () => {
        element.fill = '#ccc';

        await page.waitForChanges();

        expect(element.querySelector('svg').attributes.getNamedItem('color').value).toEqual('#ccc');
        expect(element.querySelector('svg').attributes.getNamedItem('fill').value).toEqual('#ccc');
    });

    it('should have expected role on <svg>', async () => {
        element.role = 'document';

        await page.waitForChanges();

        expect(element.querySelector('svg').attributes.getNamedItem('role').value).toEqual('document');
    });

    it('should have expected label on <svg>', async () => {
        element.label = 'Documentar';

        await page.waitForChanges();

        expect(element.querySelector('svg').attributes.getNamedItem('aria-label').value).toEqual('Documentar');
    });

    it('should be able to change the type and svg', async () => {
        element.svgIcon = 'brand-google';
        element.size = 'sm';

        await page.waitForChanges();

        expect(element.svgIcon).toEqual('brand-google');
        expect(element.size).toEqual('sm');
        expect(element.querySelector('svg').attributes.getNamedItem('width').value).toEqual('16');
        expect(element.querySelector('svg').attributes.getNamedItem('height').value).toEqual('16');
        expect(element.querySelector('svg').attributes.getNamedItem('viewBox')).not.toEqual('');
        expect(element.querySelector('svg').attributes.getNamedItem('viewBox').value).toEqual('0 0 16 16');
    });

    it('must be able to apply the default size', async () => {
        element.size = null;

        await page.waitForChanges();

        expect(element.querySelector('svg').attributes.getNamedItem('width').value).toEqual('16');
        expect(element.querySelector('svg').attributes.getNamedItem('height').value).toEqual('16');
        expect(element.querySelector('svg').attributes.getNamedItem('viewBox')).not.toEqual('');
        expect(element.querySelector('svg').attributes.getNamedItem('viewBox').value).toEqual('0 0 16 16');
    });
});
