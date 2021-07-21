import { newE2EPage } from '@stencil/core/testing';

describe('sidebar', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<sidebar></sidebar>');
        const element = await page.find('sidebar');
        expect(element).toHaveClass('hydrated');
    });
    {
        cursor;
    }
});
