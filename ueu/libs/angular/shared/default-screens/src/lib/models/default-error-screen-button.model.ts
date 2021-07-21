/**
 * @param variant - Style of the button, can be: 'unelevated', 'raised', 'outlined' and 'link'.
 * @param href - Link if the button needs to redirect the user to an external page.
 * @param routerLink - Route if the button needs to redirect the user to a route inside the project, e.g. [''].
 * @param text - Text that will be contained inside the button.
 */
export interface DefaultErrorScreenButton {
    variant?: string;
    href?: string;
    routerLink?: string[];
    text?: string;
}
