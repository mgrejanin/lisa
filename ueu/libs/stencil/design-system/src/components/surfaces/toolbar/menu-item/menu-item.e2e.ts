import { newE2EPage } from '@stencil/core/testing';

describe('menu-item', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<menu-item></menu-item>');
        const element = await page.find('menu-item');
        expect(element).toHaveClass('hydrated');
    });
    {
        cursor;
    }
});
