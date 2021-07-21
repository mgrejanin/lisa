import { newE2EPage } from '@stencil/core/testing';

describe('text', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<text></text>');
        const element = await page.find('text');
        expect(element).toHaveClass('hydrated');
    });
    {
        cursor;
    }
});
