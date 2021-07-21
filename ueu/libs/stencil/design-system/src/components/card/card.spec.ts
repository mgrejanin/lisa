import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { Card } from './card';
import { CardMedia } from './media/card-media';
import { CardActions } from './actions/card-action';
import { CardContent } from './content/card-content';
import { CardMediaContent } from './media-content/card-media-content';
import { CardActionButtons } from './action-buttons/card-action-buttons';
import { CardActionIcons } from './action-icons/card-action-icons';

const avatar = './assets/design-system/avatar/avatar_default.png';

describe('ApolloCard', () => {
    let page: SpecPage;
    let element: HTMLApolloCardElement;

    beforeEach(async () => {
        page = await newSpecPage({
            components: [Card],
            html: `<apollo-card></apollo-card>`,
        });
        element = page.doc.querySelector('apollo-card');
        expect(element).toBeTruthy();
    });

    it('should render apollo-card', async () => {
        expect(page.root).toEqualHtml(`
            <apollo-card>
                <div class="mdc-card mdc-card--radius-light"></div>
            </apollo-card>  
        `);
    });

    it('should render props', async () => {
        expect(element.variant).toEqual('unelevated');
    });

    it('should render radius prop', async () => {
        expect(element.radius).toEqual('light');
    });

    it('should build a outline card', async () => {
        element.variant = 'outlined';

        await page.waitForChanges();

        expect(element.firstElementChild).toHaveClass('mdc-card--outlined');
    });

    it('should build a card media', async () => {
        let media = await newSpecPage({
            components: [CardMedia],
            html: `<apollo-card-media></apollo-card-media>`,
        });
        const mediaElement = media.doc.querySelector('apollo-card-media') as HTMLApolloCardMediaElement;

        await media.waitForChanges();

        expect(mediaElement).toBeTruthy();
        expect(mediaElement).toHaveClass('mdc-card__media');
    });

    it('should render an image in card media with the image prop', async () => {
        let media = await newSpecPage({
            components: [CardMedia],
            html: `<apollo-card-media image='${avatar}'></apollo-card-media>`,
        });
        const mediaElement = media.doc.querySelector('apollo-card-media') as HTMLApolloCardMediaElement;

        await media.waitForChanges();

        expect(mediaElement).toBeTruthy();
        expect(mediaElement.style.backgroundImage).toEqual(`url(${avatar})`);
    });

    it('should have expected format image of 16:9 in card media', async () => {
        let media = await newSpecPage({
            components: [CardMedia],
            html: `<apollo-card-media image='${avatar}'></apollo-card-media>`,
        });
        const mediaElement = media.doc.querySelector('apollo-card-media') as HTMLApolloCardMediaElement;

        expect(mediaElement.format).toEqual('square');
        expect(mediaElement).toHaveClass('mdc-card__media--square');

        mediaElement.format = '16:9';

        await media.waitForChanges();

        expect(mediaElement.format).toEqual('16:9');
        expect(mediaElement).toHaveClass('mdc-card__media--16-9');
    });

    it('should build a card media content', async () => {
        let media = await newSpecPage({
            components: [CardMediaContent],
            html: `<apollo-card-media-content></apollo-card-media-content>`,
        });
        const mediaElement = media.doc.querySelector('apollo-card-media-content') as HTMLApolloCardMediaContentElement;

        await media.waitForChanges();

        expect(mediaElement).toBeTruthy();
        expect(mediaElement).toHaveClass('mdc-card__media-content');
    });

    it('should build a card actions', async () => {
        let actions = await newSpecPage({
            components: [CardActions],
            html: `<apollo-card-actions></apollo-card-actions>`,
        });
        const actionsElement = actions.doc.querySelector('apollo-card-actions') as HTMLApolloCardActionsElement;

        await actions.waitForChanges();

        expect(actionsElement).toBeTruthy();
        expect(actionsElement).toHaveClass('mdc-card__actions');
    });

    it('should build a card action buttons', async () => {
        let actionButtons = await newSpecPage({
            components: [CardActionButtons],
            html: `<apollo-card-action-buttons></apollo-card-action-buttons>`,
        });
        const actionButtonsElement = actionButtons.doc.querySelector(
            'apollo-card-action-buttons',
        ) as HTMLApolloCardActionButtonsElement;

        await actionButtons.waitForChanges();

        expect(actionButtonsElement).toBeTruthy();
        expect(actionButtonsElement).toHaveClass('mdc-card__action-buttons');
    });

    it('should build a card action icons', async () => {
        let actionIcons = await newSpecPage({
            components: [CardActionIcons],
            html: `<apollo-card-action-icons></apollo-card-action-icons>`,
        });
        const actionIconsElement = actionIcons.doc.querySelector(
            'apollo-card-action-icons',
        ) as HTMLApolloCardActionIconsElement;

        await actionIcons.waitForChanges();

        expect(actionIconsElement).toBeTruthy();
        expect(actionIconsElement).toHaveClass('mdc-card__action-icons');
    });

    it('should build a card content', async () => {
        let content = await newSpecPage({
            components: [CardContent],
            html: `<apollo-card-content></apollo-card-content>`,
        });
        const contentElement = content.doc.querySelector('apollo-card-content') as HTMLApolloCardContentElement;

        await content.waitForChanges();

        expect(contentElement).toBeTruthy();
        expect(contentElement).toHaveClass('mdc-card__content');
    });
});
