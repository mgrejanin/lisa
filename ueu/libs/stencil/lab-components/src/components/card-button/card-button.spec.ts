import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { LabCardButton } from './card-button';

describe('LabCardButton', () => {
    let page: SpecPage;
    let element: HTMLLabCardButtonElement;

    it('should build card-button component', async () => {
        page = await newSpecPage({
            components: [LabCardButton],
            html: `<lab-card-button></lab-card-button>`,
        });

        element = page.doc.querySelector('lab-card-button');

        expect(element).toBeTruthy();
    });

    it('should build card-button component with any avatar', async () => {
        page = await newSpecPage({
            components: [LabCardButton],
            html: `<lab-card-button avatar='https://via.placeholder.com/728x90.png?text=avatar'></lab-card-button>`,
        });

        element = page.doc.querySelector('lab-card-button');

        expect(element.avatar).toEqual('https://via.placeholder.com/728x90.png?text=avatar');
    });

    it('should build card-button component with any description', async () => {
        page = await newSpecPage({
            components: [LabCardButton],
            html: `<lab-card-button description='Texto de descrição do card-button'></lab-card-button>`,
        });

        element = page.doc.querySelector('lab-card-button');

        expect(element.description).toEqual('Texto de descrição do card-button');
    });

    it('should build card-button component with any spotlight', async () => {
        page = await newSpecPage({
            components: [LabCardButton],
            html: `<lab-card-button spotlight='Texto em destaque'></lab-card-button>`,
        });

        element = page.doc.querySelector('lab-card-button');

        expect(element.spotlight).toEqual('Texto em destaque');
    });

    it('should build card-button component with any value', async () => {
        page = await newSpecPage({
            components: [LabCardButton],
            html: `<lab-card-button value='R$ 20,00'></lab-card-button>`,
        });

        element = page.doc.querySelector('lab-card-button');

        expect(element.value).toEqual('R$ 20,00');
    });

    it('should emit click on card button', async () => {
        page = await newSpecPage({
            components: [LabCardButton],
            html: `<lab-card-button />`,
        });

        const callbackFn = jest.fn();
        page.doc.addEventListener('actionButtonClick', callbackFn);
        const cardButton = page.doc.querySelector('lab-card-button');
        await cardButton.click();
        expect(callbackFn).toHaveBeenCalled();
    });

    it('should not emit click on card button', async () => {
        page = await newSpecPage({
            components: [LabCardButton],
            html: `<lab-card-button is-editing="true" />`,
        });

        const callbackFn = jest.fn();
        page.doc.addEventListener('actionButtonClick', callbackFn);
        const cardButton = page.doc.querySelector('lab-card-button');
        await cardButton.click();
        expect(callbackFn).toBeCalledTimes(0);
    });
});
