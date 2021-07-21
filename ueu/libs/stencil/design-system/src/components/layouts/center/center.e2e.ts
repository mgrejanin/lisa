import { newE2EPage } from '@stencil/core/testing';

describe('center', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<center></center>');
        const element = await page.find('center');
        expect(element).toHaveClass('hydrated');
    });
    {
        cursor;
    }
});
