jest.mock('@popperjs/core', () => ({
    createPopper: jest.fn().mockReturnValue({
        state: {
            styles: {
                popper: {
                    bottom: 'auto',
                    left: '0',
                    margin: '0',
                    position: 'absolute',
                    right: 'auto',
                    top: '0',
                    transform: 'translate3d(-52px, 68px, 0)',
                },
                arrow: { left: '0', position: 'absolute', top: '', transform: 'translate3d(84px, 0px, 0)' },
            },
        },
    }),
}));

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ApolloTooltip } from './tooltip';

describe(ApolloTooltip.name, () => {
    let page: SpecPage;
    let element: HTMLApolloTooltipElement;
    let componentInstance: ApolloTooltip;

    beforeEach(async () => {
        page = await newSpecPage({
            components: [ApolloTooltip],
            html: `<apollo-tooltip placement="right" title-text="Title" offset="20" size="lg" description="Lorem ipsum dolor sit amet" link-url="https://example.com" link-label="Label" is-external="true"><apollo-button type="button">button</apollo-button></apollo-tooltip>`,
        });

        element = page.doc.querySelector('apollo-tooltip');
        componentInstance = page.rootInstance;
    });

    it('should render component', () => {
        expect(element.innerHTML).toContain(
            '<apollo-box class="tooltip tooltip__container" role="tooltip" aria-label="Conteúdo exibido ao passar o mouse ou ao focar o elemento">',
        );
    });

    describe('Events and Methods', () => {
        it('should listen events functions', () => {
            const events = ['focusin', 'focusout', 'mouseover', 'mouseleave'];

            events.forEach(item => {
                let buttonSpy = jest.fn();
                element.addEventListener(item, buttonSpy);

                page.waitForChanges();

                element.dispatchEvent(new Event(item));

                expect(buttonSpy).toHaveBeenCalled();
            });
        });

        it('should be visible when has focus', () => {
            componentInstance.onFocusIn();
            expect(componentInstance.isVisible).toBe(true);
        });
        it('should be not visible when loose focus', () => {
            componentInstance.onFocusOut();
            expect(componentInstance.isVisible).toBe(false);
        });

        it('should be visible when mouse over', () => {
            componentInstance.onMouseOver();
            expect(componentInstance.isVisible).toBe(true);
        });
        it('should be not visible when mouse leave', () => {
            componentInstance.onMouseLeave();
            expect(componentInstance.isVisible).toBe(false);
        });
    });
});
