import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { LabInput } from './input';
describe('LabInput', () => {
    let page: SpecPage;
    let element: HTMLLabInputElement;
    it('should build input component', async () => {
        page = await newSpecPage({
            components: [LabInput],
            html: '<lab-input></lab-input>',
        });
        element = page.doc.querySelector('lab-input');
        expect(element).toBeTruthy();
    });
    it('should build input component with inputType', async () => {
        page = await newSpecPage({
            components: [LabInput],
            html: '<lab-input input-type ="general" ></lab-input>',
        });
        const element = page.doc.querySelector('lab-input');
        expect(element.inputType).toBe('general');
    });
    it('should build input component with maxSize', async () => {
        page = await newSpecPage({
            components: [LabInput],
            html: '<lab-input max-size="10"></lab-input>',
        });
        const element = page.doc.querySelector('lab-input');
        expect(element.maxSize).toBe('10');
    });
    it('should build input component with label', async () => {
        page = await newSpecPage({
            components: [LabInput],
            html: '<lab-input label="Label"></lab-input>',
        });
        const element = page.doc.querySelector('lab-input');
        expect(element.label).toBe('Label');
    });
    it('should build input component with text', async () => {
        page = await newSpecPage({
            components: [LabInput],
            html: '<lab-input text="Valor"></lab-input>',
        });
        const element = page.doc.querySelector('lab-input');
        expect(element.text).toBe('Valor');
    });

    it('should enable editing', async () => {
        page = await newSpecPage({
            components: [LabInput],
            html: '<lab-input is-editing></lab-input>',
        });
        const element = page.doc.querySelector('lab-input');
        expect(element.isEditing).toBeTruthy();
    });
});
