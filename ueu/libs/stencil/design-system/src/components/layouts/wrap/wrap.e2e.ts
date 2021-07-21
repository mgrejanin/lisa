import { newE2EPage } from '@stencil/core/testing';

describe('wrap', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<wrap></wrap>');
        const element = await page.find('wrap');
        expect(element).toHaveClass('hydrated');
    });
    {
        cursor;
    }
});
