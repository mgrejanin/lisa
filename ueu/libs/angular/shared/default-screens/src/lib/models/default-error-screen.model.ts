import { DefaultErrorScreenButton } from './default-error-screen-button.model';

/**
 * @param title - Title of the page, it will be right bellow the figure/icon.
 * @param subtitle - Subtitle of the page, it will be right above the buttons.
 * @param type - Icon and type of the page, can be: 'info', 'warning', 'error' and 'done'.
 * @param figure - Option to use figure or icon above the title.
 * @param buttons - Array of DefaultErrorScreenButton that will be bellow the subtitle.
 */
export class DefaultErrorScreenConfig {
    constructor(
        public title?: string,
        public subtitle?: string,
        public type?: string,
        public figure?: boolean,
        public buttons?: DefaultErrorScreenButton[],
    ) {}
}
