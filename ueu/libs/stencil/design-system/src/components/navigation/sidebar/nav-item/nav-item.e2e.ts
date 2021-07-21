import { newE2EPage } from '@stencil/core/testing';

describe('nav-item', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<nav-item></nav-item>');
        const element = await page.find('nav-item');
        expect(element).toHaveClass('hydrated');
    });
    {
        cursor;
    }
});
