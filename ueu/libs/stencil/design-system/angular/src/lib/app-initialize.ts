/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgZone } from '@angular/core';
import { applyPolyfills, defineCustomElements } from '@picpay/design-system/loader';

import { raf } from './util/util';

let didInitialize = false;

export const appInitialize = (doc: Document, zone: NgZone) => (): any => {
    const win: Window | undefined = doc.defaultView as any;
    if (win && typeof (window as any) !== 'undefined') {
        if (didInitialize) {
            // eslint-disable-next-line no-console
            console.warn('Design System já iniciado');
            return null;
        }
        didInitialize = true;

        const aelFn =
            '__zone_symbol__addEventListener' in (doc.body as any)
                ? '__zone_symbol__addEventListener'
                : 'addEventListener';

        return applyPolyfills().then(() =>
            defineCustomElements(win, {
                raf,
                exclude: [],
                syncQueue: true,
                jmp: (h: any) => zone.runOutsideAngular(h),
                ael(elm, eventName, cb, opts) {
                    elm[aelFn](eventName, cb, opts);
                },
                rel(elm, eventName, cb, opts) {
                    elm.removeEventListener(eventName, cb, opts);
                },
            }),
        );
    }
};
