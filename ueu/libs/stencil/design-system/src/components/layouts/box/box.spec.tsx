import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { Apollo } from './../../../../../../packages/sass-functions/src/lib/helpers/design-system';
import { Token } from './../../../../../../packages/sass-functions/src/lib/tokens';
import { Box } from './box';

describe('BoxComponent', () => {
    let page: SpecPage;
    let element: HTMLApolloBoxElement;

    beforeEach(async () => {
        page = await newSpecPage({
            components: [Box],
            html: `<apollo-box bg="warning.500">Box</apollo-box>`,
        });

        element = page.doc.querySelector('apollo-box');
    });

    it('should build', () => {
        expect(element).toBeTruthy();
    });

    it('should contain a background color', async () => {
        await page.waitForChanges();

        expect(element.bg).toEqual('warning.500');
        expect(element.className).toBeTruthy();
        expect(Apollo.color(element.bg.toString())).toEqual(Token.colors.warning[500]);
    });

    it('should contain a color', async () => {
        element.color = 'warning.400';

        await page.waitForChanges();

        expect(element.color).toEqual('warning.400');
        expect(element.className).toBeTruthy();
        expect(Apollo.color(element.color.toString())).toEqual(Token.colors.warning[400]);
    });

    it('should contain a padding', async () => {
        element.padding = '1';

        await page.waitForChanges();

        expect(element.padding).toEqual('1');
        expect(element.className).toBeTruthy();
        expect(Apollo.spacing(element.padding.toString())).toEqual(Token.spacing[1]);
    });

    it('should contain a padding top', async () => {
        element.paddingTop = '2';

        await page.waitForChanges();

        expect(element.paddingTop).toEqual('2');
        expect(element.className).toBeTruthy();
        expect(Apollo.spacing(element.paddingTop.toString())).toEqual(Token.spacing[2]);
    });

    it('should contain a padding right', async () => {
        element.paddingRight = '3';

        await page.waitForChanges();

        expect(element.paddingRight).toEqual('3');
        expect(element.className).toBeTruthy();
        expect(Apollo.spacing(element.paddingRight.toString())).toEqual(Token.spacing[3]);
    });

    it('should contain a padding bottom', async () => {
        element.paddingBottom = '4';

        await page.waitForChanges();

        expect(element.paddingBottom).toEqual('4');
        expect(element.className).toBeTruthy();
        expect(Apollo.spacing(element.paddingBottom.toString())).toEqual(Token.spacing[4]);
    });

    it('should contain a padding left', async () => {
        element.paddingLeft = '5';

        await page.waitForChanges();

        expect(element.paddingLeft).toEqual('5');
        expect(element.className).toBeTruthy();
        expect(Apollo.spacing(element.paddingLeft.toString())).toEqual(Token.spacing[5]);
    });

    it('should contain a margin', async () => {
        element.margin = '1';

        await page.waitForChanges();

        expect(element.margin).toEqual('1');
        expect(element.className).toBeTruthy();
        expect(Apollo.spacing(element.margin.toString())).toEqual(Token.spacing[1]);
    });

    it('should contain a margin top', async () => {
        element.marginTop = '2';

        await page.waitForChanges();

        expect(element.marginTop).toEqual('2');
        expect(element.className).toBeTruthy();
        expect(Apollo.spacing(element.marginTop.toString())).toEqual(Token.spacing[2]);
    });

    it('should contain a margin right', async () => {
        element.marginRight = '3';

        await page.waitForChanges();

        expect(element.marginRight).toEqual('3');
        expect(element.className).toBeTruthy();
        expect(Apollo.spacing(element.marginRight.toString())).toEqual(Token.spacing[3]);
    });

    it('should contain a margin bottom', async () => {
        element.marginBottom = '4';

        await page.waitForChanges();

        expect(element.marginBottom).toEqual('4');
        expect(element.className).toBeTruthy();
        expect(Apollo.spacing(element.marginBottom.toString())).toEqual(Token.spacing[4]);
    });

    it('should contain a margin left', async () => {
        element.marginLeft = '5';

        await page.waitForChanges();

        expect(element.marginLeft).toEqual('5');
        expect(element.className).toBeTruthy();
        expect(Apollo.spacing(element.marginLeft.toString())).toEqual(Token.spacing[5]);
    });

    it('should contain a font size', async () => {
        element.fontSize = 'base';

        await page.waitForChanges();

        expect(element.fontSize).toEqual('base');
        expect(element.className).toBeTruthy();
        expect(Apollo.fs(element.fontSize.toString())).toEqual(Token.fontSize.base);
    });

    it('should contain a line height', async () => {
        element.lineHeight = 'base';

        await page.waitForChanges();

        expect(element.lineHeight).toEqual('base');
        expect(element.className).toBeTruthy();
        expect(Apollo.get(`type.lineHeight.${element.lineHeight}`)).toEqual(Token.lineHeight.base);
    });

    it('should contain a font weight', async () => {
        element.fontWeight = 'normal';

        await page.waitForChanges();

        expect(element.fontWeight).toEqual('normal');
        expect(element.className).toBeTruthy();
        expect(Apollo.get(`type.fontWeight.${element.fontWeight}`)).toEqual(Token.fontWeight.normal);
    });

    it('should contain a border', async () => {
        element.border = 'medium';

        await page.waitForChanges();

        expect(element.border).toEqual('medium');
        expect(element.className).toBeTruthy();
        expect(Apollo.get(`borderWidth.${element.border}`)).toEqual(Token.borderWidth.medium);
    });

    it('should contain a border width', async () => {
        element.borderWidth = 'medium';

        await page.waitForChanges();

        expect(element.borderWidth).toEqual('medium');
        expect(element.className).toBeTruthy();
        expect(Apollo.get(`borderWidth.${element.borderWidth}`)).toEqual(Token.borderWidth.medium);
    });

    it('should contain a border color', async () => {
        element.borderColor = 'warning.400';

        await page.waitForChanges();

        expect(element.borderColor).toEqual('warning.400');
        expect(element.className).toBeTruthy();
        expect(Apollo.color(element.borderColor.toString())).toEqual(Token.colors.warning[400]);
    });

    it('should contain a border top', async () => {
        element.borderTop = 'medium';

        await page.waitForChanges();

        expect(element.borderTop).toEqual('medium');
        expect(element.className).toBeTruthy();
        expect(Apollo.get(`borderWidth.${element.borderTop}`)).toEqual(Token.borderWidth.medium);
    });

    it('should contain a border top width', async () => {
        element.borderTopWidth = 'medium';

        await page.waitForChanges();

        expect(element.borderTopWidth).toEqual('medium');
        expect(element.className).toBeTruthy();
        expect(Apollo.get(`borderWidth.${element.borderTopWidth}`)).toEqual(Token.borderWidth.medium);
    });

    it('should contain a border top color', async () => {
        element.borderTopColor = 'warning.400';

        await page.waitForChanges();

        expect(element.borderTopColor).toEqual('warning.400');
        expect(element.className).toBeTruthy();
        expect(Apollo.color(element.borderTopColor.toString())).toEqual(Token.colors.warning[400]);
    });

    it('should contain a border right', async () => {
        element.borderRight = 'medium';

        await page.waitForChanges();

        expect(element.borderRight).toEqual('medium');
        expect(element.className).toBeTruthy();
        expect(Apollo.get(`borderWidth.${element.borderRight}`)).toEqual(Token.borderWidth.medium);
    });

    it('should contain a border right width', async () => {
        element.borderRightWidth = 'medium';

        await page.waitForChanges();

        expect(element.borderRightWidth).toEqual('medium');
        expect(element.className).toBeTruthy();
        expect(Apollo.get(`borderWidth.${element.borderRightWidth}`)).toEqual(Token.borderWidth.medium);
    });

    it('should contain a border right color', async () => {
        element.borderRightColor = 'warning.400';

        await page.waitForChanges();

        expect(element.borderRightColor).toEqual('warning.400');
        expect(element.className).toBeTruthy();
        expect(Apollo.color(element.borderRightColor.toString())).toEqual(Token.colors.warning[400]);
    });

    it('should contain a border bottom', async () => {
        element.borderBottom = 'medium';

        await page.waitForChanges();

        expect(element.borderBottom).toEqual('medium');
        expect(element.className).toBeTruthy();
        expect(Apollo.get(`borderWidth.${element.borderBottom}`)).toEqual(Token.borderWidth.medium);
    });

    it('should contain a border bottom width', async () => {
        element.borderBottomWidth = 'medium';

        await page.waitForChanges();

        expect(element.borderBottomWidth).toEqual('medium');
        expect(element.className).toBeTruthy();
        expect(Apollo.get(`borderWidth.${element.borderBottomWidth}`)).toEqual(Token.borderWidth.medium);
    });

    it('should contain a border bottom color', async () => {
        element.borderBottomColor = 'warning.400';

        await page.waitForChanges();

        expect(element.borderBottomColor).toEqual('warning.400');
        expect(element.className).toBeTruthy();
        expect(Apollo.color(element.borderBottomColor.toString())).toEqual(Token.colors.warning[400]);
    });

    it('should contain a border left', async () => {
        element.borderLeft = 'medium';

        await page.waitForChanges();

        expect(element.borderLeft).toEqual('medium');
        expect(element.className).toBeTruthy();
        expect(Apollo.get(`borderWidth.${element.borderLeft}`)).toEqual(Token.borderWidth.medium);
    });

    it('should contain a border left width', async () => {
        element.borderLeftWidth = 'medium';

        await page.waitForChanges();

        expect(element.borderLeftWidth).toEqual('medium');
        expect(element.className).toBeTruthy();
        expect(Apollo.get(`borderWidth.${element.borderLeftWidth}`)).toEqual(Token.borderWidth.medium);
    });

    it('should contain a border left color', async () => {
        element.borderLeftColor = 'warning.400';

        await page.waitForChanges();

        expect(element.borderLeftColor).toEqual('warning.400');
        expect(element.className).toBeTruthy();
        expect(Apollo.color(element.borderLeftColor.toString())).toEqual(Token.colors.warning[400]);
    });
});
