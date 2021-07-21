import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { Avatar } from './avatar';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config.js';

export const resolveTailwind = resolveConfig(tailwindConfig);

describe('ApolloAvatar', () => {
    let page: SpecPage;
    let element: HTMLApolloAvatarElement;

    it('should build my component', async () => {
        page = await newSpecPage({
            components: [Avatar],
            html: `<apollo-avatar></apollo-avatar>`,
        });

        element = page.doc.querySelector('apollo-avatar');

        expect(element).toBeTruthy();
    });

    it('should set alt', async () => {
        page = await newSpecPage({
            components: [Avatar],
            html: `<apollo-avatar alt="PicPay Lover"></apollo-avatar>`,
        });

        element = page.doc.querySelector('apollo-avatar');

        expect(element.alt).toBe('PicPay Lover');
    });

    describe('border', () => {
        let borderList = ['none', 'light', 'medium', 'strong'];
        let radiusList = ['none', 'light', 'medium', 'strong', 'full'];

        borderList.forEach(border => {
            it(`should set border width - ${border}`, async () => {
                page = await newSpecPage({
                    components: [Avatar],
                    html: `<apollo-avatar border="${border}"></apollo-avatar>`,
                });

                element = page.doc.querySelector('apollo-avatar');
                expect(element).toHaveClass(`apollo-avatar__border-${border}`);
            });
        });

        radiusList.forEach(radius => {
            it(`should set border radius - ${radius}`, async () => {
                page = await newSpecPage({
                    components: [Avatar],
                    html: `<apollo-avatar radius="${radius}"></apollo-avatar>`,
                });

                element = page.doc.querySelector('apollo-avatar');
                expect(element).toHaveClass(`apollo-avatar__radius-${radius}`);
            });
        });
    });

    describe('size', () => {
        let sizeList = ['none', 'light', 'medium', 'strong', 'full'];

        sizeList.forEach(size => {
            it(`should set size - ${size}`, async () => {
                page = await newSpecPage({
                    components: [Avatar],
                    html: `<apollo-avatar size="${size}"></apollo-avatar>`,
                });

                element = page.doc.querySelector('apollo-avatar');
                expect(element).toHaveClass(`apollo-avatar__size-${size}`);
            });
        });
    });
});
