import { newE2EPage } from '@stencil/core/testing';

describe('logo', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<logo></logo>');
        const element = await page.find('logo');
        expect(element).toHaveClass('hydrated');
    });
    {
        cursor;
    }
});
