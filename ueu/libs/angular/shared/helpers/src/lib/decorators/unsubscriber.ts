// tslint:disable: function-name
import { overlapHook } from './helpers';
import { Subject } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnsubscriberDecorator = (target: any, propertyKey?: string | symbol) => void;

export function Unsubscriber(): UnsubscriberDecorator {
    return function (target, key) {
        target[key] = new Subject();

        overlapHook(target, 'ngOnDestroy', () => {
            target[key].next();
            target[key].complete();
        });
    };
}
