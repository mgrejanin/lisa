import { newSpecPage, SpecPage } from '@stencil/core/testing';

// call the defined mock
jest.mock('@material/textfield');

// import the main file which is going to be tested
import { TextField } from './textfield';

describe('ApolloTextfield', () => {
    let page: SpecPage;
    let element: HTMLApolloTextfieldElement;
    let componentInstance: TextField;

    it('should build my component', async () => {
        const LABEL_TEST = 'Input Label';
        const VALUE_TEST = '9999';

        page = await newSpecPage({
            components: [TextField],
            html: `
                <apollo-textfield 
                    label="${LABEL_TEST}" 
                    value="${VALUE_TEST}"
                >
                </apollo-textfield>
            `,
        });

        element = page.doc.querySelector('apollo-textfield');
        componentInstance = page.rootInstance;

        expect(element).toBeTruthy();
    });

    describe('Icons', () => {
        it('should handle trailing icons', async () => {
            const LABEL_TEST = 'Input Label';
            const VALUE_TEST = '9999';

            page = await newSpecPage({
                components: [TextField],
                html: `
                    <apollo-textfield 
                        label="${LABEL_TEST}" 
                        value="${VALUE_TEST}"
                        trailing-icon="true"
                    >
                        <apollo-textfield-icon slot="trailing-icon">
                            <apollo-icon svg-icon="objects-heart"></apollo-icon>
                        </apollo-textfield-icon>
                    </apollo-textfield>
                `,
            });

            const element = page.doc.querySelector('apollo-textfield');
            expect(element.innerHTML).toContain('<apollo-icon svg-icon="objects-heart"></apollo-icon>');
        });

        it('should handle clear value', async () => {
            const LABEL_TEST = 'Input Label';
            const VALUE_TEST = '9999';

            page = await newSpecPage({
                components: [TextField],
                html: `
                    <apollo-textfield 
                        label="${LABEL_TEST}" 
                        value="${VALUE_TEST}"
                        trailing-clear-icon="true"
                    >
                    </apollo-textfield>
                `,
            });

            jest.useFakeTimers();
            const element = page.doc.querySelector('apollo-textfield');
            const clearElement = page.doc.querySelector('apollo-textfield-icon');
            clearElement.click();
            await page.waitForChanges();
            jest.runAllTimers();

            expect(element.value).toBeNull();
        });
    });

    describe('Events and Methods', () => {
        beforeEach(async () => {
            const LABEL_TEST = 'Input Label';
            const VALUE_TEST = '9999';

            page = await newSpecPage({
                components: [TextField],
                html: `
                    <apollo-textfield 
                        label="${LABEL_TEST}" 
                        value="${VALUE_TEST}"
                    >
                    </apollo-textfield>
                `,
            });

            element = page.doc.querySelector('apollo-textfield');
            componentInstance = page.rootInstance;
        });

        it('should handle label changes', async () => {
            const LABEL_TEST = 'picpay lovers';

            element.label = LABEL_TEST;
            await page.waitForChanges();

            expect(element.label).toBe(LABEL_TEST);
            expect(element).toBeTruthy();
        });

        it('should handle invalid changes', async () => {
            element.invalid = true;
            await page.waitForChanges();

            expect(element.invalid).toBe(true);
            expect(element).toBeTruthy();
        });

        it('should handle success changes', async () => {
            element.success = true;
            await page.waitForChanges();

            expect(element.success).toBe(true);
            expect(element).toBeTruthy();
        });

        it('should emit apolloFocus event', async () => {
            let eventSpy = jest.fn();
            page.doc.addEventListener('apolloFocus', eventSpy);

            const inputElement = page.doc.querySelector('input');
            await inputElement.dispatchEvent(new Event('focus'));
            await page.waitForChanges();

            expect(eventSpy).toHaveBeenCalled();
        });

        it('should emit apolloBlur event', async () => {
            let eventSpy = jest.fn();
            page.doc.addEventListener('apolloBlur', eventSpy);

            const inputElement = page.doc.querySelector('input');
            await inputElement.dispatchEvent(new Event('blur'));
            await page.waitForChanges();

            expect(eventSpy).toHaveBeenCalled();
        });

        it('should emit apolloPointerEnter event', async () => {
            let eventSpy = jest.fn();
            page.doc.addEventListener('apolloPointerEnter', eventSpy);

            const inputElement = page.doc.querySelector('input');
            await inputElement.dispatchEvent(new Event('pointerenter'));
            await page.waitForChanges();

            expect(eventSpy).toHaveBeenCalled();
        });

        it('should emit apolloPointerLeave event', async () => {
            let eventSpy = jest.fn();
            page.doc.addEventListener('apolloPointerLeave', eventSpy);

            const inputElement = page.doc.querySelector('input');
            await inputElement.dispatchEvent(new Event('pointerleave'));
            await page.waitForChanges();

            expect(eventSpy).toHaveBeenCalled();
        });

        it('should trigger onInput event', async () => {
            const VALUE_TEST = '4500';

            const changeSpy = jest.spyOn(componentInstance.apolloChange, 'emit');

            jest.useFakeTimers();
            const inputElement = page.doc.querySelector('input');
            inputElement.value = VALUE_TEST;
            await inputElement.dispatchEvent(new Event('input'));
            await page.waitForChanges();
            jest.runAllTimers();

            expect(changeSpy).toHaveBeenCalled();
        });

        it('should handle minLength invalid changes', async () => {
            const VALUE_INVALID_TEST = '1';
            const VALUE_VALID_TEST = '1123456';
            const inputElement = page.doc.querySelector('input');

            jest.useFakeTimers();
            element.minLength = '4';
            inputElement.value = VALUE_INVALID_TEST;
            await inputElement.dispatchEvent(new Event('input'));
            await page.waitForChanges();
            jest.runAllTimers();

            expect(element.invalid).toBe(true);

            jest.useFakeTimers();
            element.minLength = '4';
            inputElement.value = VALUE_VALID_TEST;
            await inputElement.dispatchEvent(new Event('input'));
            await page.waitForChanges();
            jest.runAllTimers();

            expect(element.invalid).toBe(false);
        });

        it('should call disconnectedCallback on element.remove', async () => {
            let spyMethod = jest.spyOn(componentInstance, 'disconnectedCallback');

            element.remove();
            await page.waitForChanges();

            expect(element).toBeTruthy();
            expect(spyMethod).toHaveBeenCalled();
        });
    });

    describe('Masks', () => {
        it('should apply currency mask', async () => {
            const LABEL_TEST = 'Input Label';
            const VALUE_ZERO_TEST = '0';
            const VALUE_ZERO_FORMATTED_TEST = '0,00';
            const VALUE_TEST = '450099';
            const VALUE_FORMATTED_TEST = '4.500,99';

            page = await newSpecPage({
                components: [TextField],
                html: `
                    <apollo-textfield 
                        label="${LABEL_TEST}"
                        mask-variant="currency"
                    >
                    </apollo-textfield>
                `,
            });

            element = page.doc.querySelector('apollo-textfield');
            componentInstance = page.rootInstance;

            jest.useFakeTimers();
            const inputElement = page.doc.querySelector('input');
            inputElement.value = VALUE_ZERO_TEST;
            await inputElement.dispatchEvent(new Event('input'));
            await inputElement.dispatchEvent(new Event('keyup'));
            await page.waitForChanges();
            jest.useFakeTimers();

            expect(element.value).toBe(VALUE_ZERO_FORMATTED_TEST);

            jest.useFakeTimers();
            inputElement.value = VALUE_TEST;
            await inputElement.dispatchEvent(new Event('input'));
            await inputElement.dispatchEvent(new Event('keyup'));
            await page.waitForChanges();
            jest.runAllTimers();

            expect(element.value).toBe(VALUE_FORMATTED_TEST);
            expect(element).toBeTruthy();
        });
    });
});
