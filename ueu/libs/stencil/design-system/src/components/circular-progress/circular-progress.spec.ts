import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ApolloCircularProgress } from './circular-progress';

describe('ApolloCheckbox', () => {
    let page: SpecPage;
    let element: HTMLApolloCircularProgressElement;

    it('should build my component', async () => {
        page = await newSpecPage({
            components: [ApolloCircularProgress],
            html: `<apollo-circular-progress></apollo-circular-progress>`,
        });

        element = page.doc.querySelector('apollo-circular-progress');

        expect(element).toBeTruthy();
    });

    it('should render default circular progress', async () => {
        page = await newSpecPage({
            components: [ApolloCircularProgress],
            html: `<apollo-circular-progress></apollo-circular-progress>`,
        });

        element = page.doc.querySelector('apollo-circular-progress');

        expect(element.determinate).toEqual(false);
        expect(element.progress).toEqual(1);
        expect(element).not.toHaveClass('--invert');
        expect(element).toEqualAttribute('aria-label', null);

        let circle = page.doc.querySelector('circle');
        let defaultRadius = 8.75;
        let stroke = Math.PI * defaultRadius * 2;

        expect(circle).toEqualAttribute('r', defaultRadius);
        expect(circle).toEqualAttribute('stroke-dasharray', stroke);
        expect(circle).toEqualAttribute('stroke-dashoffset', stroke);
        expect(circle).toEqualAttribute('stroke-width', 2.5);
    });

    it('should render inverted circular progress', async () => {
        page = await newSpecPage({
            components: [ApolloCircularProgress],
            html: `<apollo-circular-progress invert="true"></apollo-circular-progress>`,
        });

        element = page.doc.querySelector('apollo-circular-progress');

        expect(element).toHaveClass('--invert');
    });

    it('should set label', async () => {
        page = await newSpecPage({
            components: [ApolloCircularProgress],
            html: `<apollo-circular-progress label="PicPay Lover"></apollo-circular-progress>`,
        });

        let element = page.doc.querySelector('.mdc-circular-progress');

        expect(element).toEqualAttribute('aria-label', 'PicPay Lover');
    });

    it('should set radius', async () => {
        page = await newSpecPage({
            components: [ApolloCircularProgress],
            html: `<apollo-circular-progress radius="10"></apollo-circular-progress>`,
        });

        let element = page.doc.querySelector('circle');

        let stroke = Math.PI * 10 * 2;

        expect(element).toEqualAttribute('r', '10');
        expect(element).toEqualAttribute('stroke-dasharray', stroke);
        expect(element).toEqualAttribute('stroke-dashoffset', stroke);
    });

    it('should set stroke', async () => {
        page = await newSpecPage({
            components: [ApolloCircularProgress],
            html: `<apollo-circular-progress stroke="1"></apollo-circular-progress>`,
        });

        let element = page.doc.querySelector('circle');

        expect(element).toEqualAttribute('stroke-width', 1);
    });

    describe('Methods', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [ApolloCircularProgress],
                html: `<apollo-circular-progress></apollo-circular-progress>`,
            });

            element = page.doc.querySelector('apollo-circular-progress');

            expect(element).toBeTruthy();
        });

        it('should set determinate', async () => {
            await element.setDeterminate(true);
            await page.waitForChanges();
            expect(element.determinate).toEqual(true);
        });

        it('should set progress', async () => {
            await element.setProgress(0.5);
            await page.waitForChanges();
            expect(element.progress).toEqual(0.5);
        });
    });
});
