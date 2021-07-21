import { newE2EPage } from '@stencil/core/testing';

describe('grid-item', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<grid-item></grid-item>');
        const element = await page.find('grid-item');
        expect(element).toHaveClass('hydrated');
    });
    {
        cursor;
    }
});
