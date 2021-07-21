import { newE2EPage } from '@stencil/core/testing';

describe('flex', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<flex></flex>');
        const element = await page.find('flex');
        expect(element).toHaveClass('hydrated');
    });
    {
        cursor;
    }
});
