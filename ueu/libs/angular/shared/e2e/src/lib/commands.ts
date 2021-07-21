// eslint-disable-next-line no-var
declare var cy;

import { CustomElement } from './custom-element';
// tslint:disable-next-line: no-import-side-effect
import 'reflect-metadata';

export type Constructable<T> = new (selector?: string) => T;

export function findElement(selector: string, parentSelector?: string) {
    return parentSelector ? cy.get(`${parentSelector} ${selector}`) : cy.get(selector);
}

export function findBy(selector: string): PropertyDecorator {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (target: any, propertyKey: string) => {
        const type = Reflect.getMetadata('design:type', target, propertyKey);
        Object.defineProperty(target, propertyKey, {
            configurable: true,
            enumerable: true,
            get() {
                if (type === CustomElement) {
                    return new CustomElement(selector, (this as CustomElement).selector);
                }
                if (Object.getPrototypeOf(type).__proto__ === CustomElement) {
                    return new type(selector, (this as CustomElement).selector);
                }
                throw { message: 'Type not supported in findBy()' };
            },
        });
    };
}
