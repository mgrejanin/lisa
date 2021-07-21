import { newSpecPage } from '@stencil/core/testing';
import { ApolloFeedbackPage } from './feedback-page';

describe('ApolloFeedbackPage', () => {
    let page: SpecPage;

    it('should build', async () => {
        page = await newSpecPage({
            components: [ApolloFeedbackPage],
            html: `
                <apollo-feedback-page
                    type="warning"
                    page-title="Insira seu título"
                    page-subtitle="Insira o subtítulo do dialog nesse espaço."
                ></apollo-feedback-page>
            `,
        });

        expect(page.root).toBeTruthy();
    });

    it('should build using a non-existent type', async () => {
        process.env.NODE_ENV = 'development';

        page = await newSpecPage({
            components: [ApolloFeedbackPage],
            html: `
                <apollo-feedback-page
                    type="undefined"
                    page-title="Insira seu título"
                    page-subtitle="Insira o subtítulo do dialog nesse espaço."
                ></apollo-feedback-page>
            `,
        });

        expect(page.root).toBeTruthy();
        expect(page.root.type).toEqual('undefined');

        process.env.NODE_ENV = '';
    });

    it('should build using figures', async () => {
        page = await newSpecPage({
            components: [ApolloFeedbackPage],
            html: `
                <apollo-feedback-page
                    type="warning"
                    page-title="Insira seu título"
                    page-subtitle="Insira o subtítulo do dialog nesse espaço."
                    use-figure
                ></apollo-feedback-page>
            `,
        });

        expect(page.root).toBeTruthy();
        expect(page.root.useFigure).toBeTruthy();
    });
});
