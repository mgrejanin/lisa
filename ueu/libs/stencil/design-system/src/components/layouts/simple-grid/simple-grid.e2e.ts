import { newE2EPage } from '@stencil/core/testing';

describe('simple-grid', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<simple-grid></simple-grid>');
        const element = await page.find('simple-grid');
        expect(element).toHaveClass('hydrated');
    });
    {
        cursor;
    }
});
