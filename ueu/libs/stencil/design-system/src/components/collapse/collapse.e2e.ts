import { newE2EPage } from '@stencil/core/testing';

describe('collapse', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<collapse></collapse>');
        const element = await page.find('collapse');
        expect(element).toHaveClass('hydrated');
    });
    {
        cursor;
    }
});
