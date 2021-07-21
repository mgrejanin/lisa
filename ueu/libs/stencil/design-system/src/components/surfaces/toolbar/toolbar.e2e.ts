import { newE2EPage } from '@stencil/core/testing';

describe('toolbar', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<toolbar></toolbar>');
        const element = await page.find('toolbar');
        expect(element).toHaveClass('hydrated');
    });
    {
        cursor;
    }
});
