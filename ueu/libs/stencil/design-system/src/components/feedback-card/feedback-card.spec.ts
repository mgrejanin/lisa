import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ApolloFeedbackCard } from './feedback-card';

describe('ApolloFeedbackCard', () => {
    it('should build', async () => {
        const page = await newSpecPage({
            components: [ApolloFeedbackCard],
            html: `<apollo-feedback-card></apollo-feedback-card>`,
        });

        expect(page.root).toBeTruthy();
    });
});
