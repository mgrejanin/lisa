import { newE2EPage } from '@stencil/core/testing';

describe('link', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<link></link>');
        const element = await page.find('link');
        expect(element).toHaveClass('hydrated');
    });
    {
        cursor;
    }
});
