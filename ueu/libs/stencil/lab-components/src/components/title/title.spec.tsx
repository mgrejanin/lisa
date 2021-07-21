import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { LabTitle } from './title';

describe('LabTitle', () => {
    let page: SpecPage;
    let element: HTMLLabTitleElement;

    it('should create', async () => {
        page = await newSpecPage({
            components: [LabTitle],
            html: `<lab-title></lab-title>`,
        });

        element = page.doc.querySelector('lab-title');
        expect(element).toBeTruthy();
    });
    describe('isEditing', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [LabTitle],
                html: `<lab-title is-editing></lab-title>`,
            });

            element = page.doc.querySelector('lab-title');
        });
        it('should enable editing', () => {
            expect(element.isEditing).toBeTruthy();
        });
    });
    describe('title', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [LabTitle],
                html: `<lab-title text='lorem ipsum' type='title'></lab-title>`,
            });

            element = page.doc.querySelector('lab-title');
        });
        it('should build title component with text', () => {
            expect(element.text).toEqual('lorem ipsum');
        });
        it('should build title component with type', () => {
            expect(element.type).toEqual('title');
        });
    });
    describe('subtitle', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [LabTitle],
                html: `<lab-title text='new subtitle' type='subtitle'></lab-title>`,
            });

            element = page.doc.querySelector('lab-title');
        });
        it('should build subtitle component with text', () => {
            expect(element.text).toEqual('new subtitle');
        });
        it('should build title component with type', () => {
            expect(element.type).toEqual('subtitle');
        });
    });
});
