import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { LabButton } from './button';

describe('LabButton', () => {
    let page: SpecPage;
    let element: HTMLLabButtonElement;

    it('should build component without parameters', async () => {
        page = await newSpecPage({
            components: [LabButton],
            html: `<lab-button></lab-button>`,
        });

        element = page.doc.querySelector('lab-button');
        expect(element).toBeTruthy();
    });

    describe('parameters', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [LabButton],
                html: `<lab-button is-editing label='label' type='button_link'></lab-button>`,
            });

            element = page.doc.querySelector('lab-button');
        });

        it('should set editing', () => {
            expect(element.isEditing).toBeTruthy();
        });

        it('should buil button component with label', () => {
            expect(element.label).toEqual('label');
        });

        it('should buil button component with type', () => {
            expect(element.type).toEqual('button_link');
        });
    });
});
