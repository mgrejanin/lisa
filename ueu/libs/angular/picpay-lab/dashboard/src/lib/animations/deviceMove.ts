import { animate, state, style, transition, trigger } from '@angular/animations';

export const deviceMove = trigger('deviceMove', [
    state(
        'in',
        style({
            width: 'calc(100vw + 36rem)',
        }),
    ),
    state(
        'out',
        style({
            width: '*',
        }),
    ),
    transition('in => out', animate('600ms ease-in-out')),
    transition('out => in', animate('600ms ease-in-out')),
]);
