import { newE2EPage } from '@stencil/core/testing';

describe('ripple', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<ripple></ripple>');
        const element = await page.find('ripple');
        expect(element).toHaveClass('hydrated');
    });
    {
        cursor;
    }
});
