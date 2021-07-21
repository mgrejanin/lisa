import { newE2EPage } from '@stencil/core/testing';

describe('container', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<container></container>');
        const element = await page.find('container');
        expect(element).toHaveClass('hydrated');
    });
    {
        cursor;
    }
});
