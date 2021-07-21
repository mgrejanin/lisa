import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { FeedbackButton } from './feedback-button';

describe('ApolloSnackbar', () => {
    let page: SpecPage;
    let element: HTMLApolloFeedbackButtonElement;

    it('should build my component', async () => {
        page = await newSpecPage({
            components: [FeedbackButton],
            html: ` <apollo-feedback-button
                    toggle-off-label="Aceito os termos"
                    toggle-on-label="Obrigado"
                    size="md"
                    delay="2"
                ></apollo-feedback-button>`,
        });

        element = page.doc.querySelector('apollo-feedback-button');

        expect(element).toBeTruthy();
    });

    describe('Events and Methods', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [FeedbackButton],
                html: ` <apollo-feedback-button
                        toggle-off-label="Aceito os termos"
                        toggle-on-label="Obrigado"
                        size="md"
                        delay="2"
                    ></apollo-feedback-button>`,
            });

            element = page.doc.querySelector('apollo-feedback-button');

            expect(element).toBeTruthy();
        });

        it('should set checked', async () => {
            await element.setChecked(true);
            await page.waitForChanges();
            expect(element.checked).toEqual(true);
        });

        it('should start feedback timeout', async () => {
            await element.startFeedbackTimeout(2);
            await page.waitForChanges();
            expect(element).toBeTruthy();
        });

        it('should emit click on action button', async () => {
            let buttonSpy = jest.fn();
            page.win.addEventListener('click', buttonSpy);
            element.click();
            await page.waitForChanges();
            expect(buttonSpy).toHaveBeenCalled();
        });

        it('should not emit click on action button while toggle on', async () => {
            await element.setChecked(true);
            await page.waitForChanges();

            expect(element.checked).toEqual(true);

            let buttonSpy = jest.fn();
            page.win.addEventListener('click', buttonSpy);
            element.click();

            await page.waitForChanges();
            expect(buttonSpy).not.toHaveBeenCalled();
        });
    });
});
