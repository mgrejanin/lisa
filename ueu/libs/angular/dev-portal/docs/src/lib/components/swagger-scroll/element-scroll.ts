// Import the core angular services.
import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type Target = Document | Element;

@Injectable({
    providedIn: 'root',
})
export class ElementScroll {
    /**
     * Returns the current scroll position of the given DOM node
     */
    getScroll(node: Target = document): number {
        return this.getCurrentScroll(node);
    }

    /**
     * Returns the current scroll position of the given DOM node as a STREAM
     */
    getScrollAsStream(node: Target = document): Observable<number> {
        const stream =
            node instanceof Document
                ? fromEvent(window, 'scroll').pipe(map((): number => this.getScroll(node)))
                : fromEvent(node, 'scroll').pipe(map((): number => this.getScroll(node)));

        return stream;
    }

    /**
     * Return the current scroll offset (in pixels) of the given DOM node
     */
    private getCurrentScroll(node: Target): number {
        if (node instanceof Document) {
            return window.pageYOffset;
        }

        return node.scrollTop;
    }
}
