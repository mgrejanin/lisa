import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { LabHeader } from './header';

describe('LabHeader', () => {
    let page: SpecPage;
    let element: HTMLLabHeaderElement;
    it('should build header component', async () => {
        page = await newSpecPage({
            components: [LabHeader],
            html: '<lab-header></lab-header>',
        });

        element = page.doc.querySelector('lab-header');

        expect(element).toBeTruthy();
    });
    it('should build header component with avatar', async () => {
        page = await newSpecPage({
            components: [LabHeader],
            html:
                '<lab-header avatar="libs/design-system/web-components/src/assets/design-system/avatar/avatar_default.png"></lab-header>',
        });

        const element = page.doc.querySelector('lab-header');
        expect(element.avatar).toBe(
            'libs/design-system/web-components/src/assets/design-system/avatar/avatar_default.png',
        );
    });
    it('should build header component with banner', async () => {
        page = await newSpecPage({
            components: [LabHeader],
            html:
                '<lab-header banner="libs/design-system/web-components/src/assets/design-system/avatar/avatar_default.png"></lab-header>',
        });

        const element = page.doc.querySelector('lab-header');
        expect(element.banner).toBe(
            'libs/design-system/web-components/src/assets/design-system/avatar/avatar_default.png',
        );
    });

    it('should build header with title', async () => {
        page = await newSpecPage({
            components: [LabHeader],
            html: '<lab-header page-title="Gugacast"></lab-header>',
        });

        const element = page.doc.querySelector('lab-header');
        expect(element.pageTitle).toBe('Gugacast');
    });

    it('should emit click event on back button', async () => {
        page = await newSpecPage({
            components: [LabHeader],
            html: `<lab-header/>`,
        });

        const callbackFn = jest.fn();
        page.doc.addEventListener('backButtonClick', callbackFn);
        const button = page.root.shadowRoot.querySelector('apollo-icon-button') as HTMLApolloIconButtonElement;
        await button.click();
        expect(callbackFn).toHaveBeenCalled();
    });

    it('should emit click event on edit header', async () => {
        page = await newSpecPage({
            components: [LabHeader],
            html: `<lab-header/>`,
        });

        const callbackFn = jest.fn();
        page.doc.addEventListener('edit', callbackFn);
        const header = page.root.shadowRoot.querySelector('.header');
        await header.dispatchEvent(new Event('click'));
        expect(callbackFn).toHaveBeenCalled();
    });

    it('should enable editing', async () => {
        page = await newSpecPage({
            components: [LabHeader],
            html: '<lab-header is-editing="true"></lab-header>',
        });

        const element = page.doc.querySelector('lab-header');
        expect(element.isEditing).toBeTruthy();
    });
});
