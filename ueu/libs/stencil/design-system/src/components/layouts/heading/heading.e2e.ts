import { newE2EPage } from '@stencil/core/testing';

describe('heading', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<heading></heading>');
        const element = await page.find('heading');
        expect(element).toHaveClass('hydrated');
    });
    {
        cursor;
    }
});
