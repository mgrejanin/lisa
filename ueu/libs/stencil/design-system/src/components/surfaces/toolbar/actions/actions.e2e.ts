import { newE2EPage } from '@stencil/core/testing';

describe('actions', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<actions></actions>');
        const element = await page.find('actions');
        expect(element).toHaveClass('hydrated');
    });
    {
        cursor;
    }
});
