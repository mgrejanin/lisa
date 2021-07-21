import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ToggleButton } from './toggle-button';

describe('ApolloSnackbar', () => {
    let page: SpecPage;
    let element: HTMLApolloToggleButtonElement;

    it('should build my component', async () => {
        page = await newSpecPage({
            components: [ToggleButton],
            html: ` <apollo-toggle-button
                        toggle-off-label="Seguir"
                        toggle-on-label="Deixar de seguir"
                        size="md"
                    ></apollo-toggle-button>`,
        });

        element = page.doc.querySelector('apollo-toggle-button');

        expect(element).toBeTruthy();
    });

    it('should build my component with icons', async () => {
        page = await newSpecPage({
            components: [ToggleButton],
            html: ` <apollo-toggle-button
                        toggle-off-label="Seguir"
                        toggle-on-label="Deixar de seguir"
                        toggle-off-icon="heart"
                        toggle-on-icon="heart"
                        toggle-off-type-icon="objects"
                        toggle-on-type-icon="objects"
                        size="md"
                    ></apollo-toggle-button>`,
        });

        element = page.doc.querySelector('apollo-toggle-button');

        expect(element).toBeTruthy();
    });

    it('should build my component with icons off toggle only', async () => {
        page = await newSpecPage({
            components: [ToggleButton],
            html: ` <apollo-toggle-button
                        toggle-off-label="Seguir"
                        toggle-on-label="Deixar de seguir"
                        toggle-off-icon="heart"
                        toggle-off-type-icon="objects"
                        size="md"
                    ></apollo-toggle-button>`,
        });

        element = page.doc.querySelector('apollo-toggle-button');

        expect(element).toBeTruthy();
    });

    it('should build my component with icons on toggle only', async () => {
        page = await newSpecPage({
            components: [ToggleButton],
            html: ` <apollo-toggle-button
                        toggle-off-label="Seguir"
                        toggle-on-label="Deixar de seguir"
                        toggle-on-icon="heart"
                        toggle-on-type-icon="objects"
                        size="md"
                    ></apollo-toggle-button>`,
        });

        element = page.doc.querySelector('apollo-toggle-button');

        expect(element).toBeTruthy();
    });

    describe('Events and Methods', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [ToggleButton],
                html: ` <apollo-toggle-button
                            toggle-off-label="Seguir"
                            toggle-on-label="Deixar de seguir"
                            size="md"
                        ></apollo-toggle-button>`,
            });

            element = page.doc.querySelector('apollo-toggle-button');

            expect(element).toBeTruthy();
        });

        it('should set checked', async () => {
            await element.setChecked(true);
            await page.waitForChanges();
            expect(element.checked).toEqual(true);
        });

        it('should emit click on action button', async () => {
            let buttonSpy = jest.fn();
            page.win.addEventListener('click', buttonSpy);
            element.click();
            await page.waitForChanges();
            expect(buttonSpy).toHaveBeenCalled();
        });
    });
});
