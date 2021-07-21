import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { LabTransformer } from './transformer';

describe('lab-transformer', () => {
    let page: SpecPage;
    let element: HTMLLabTransformerElement;

    it('renders', async () => {
        const { root } = await newSpecPage({
            components: [LabTransformer],
            html: '<lab-transformer></lab-transformer>',
        });
        expect(root).toEqualHtml(`
        <lab-transformer>
          <mock:shadow-root>
          </mock:shadow-root>
        </lab-transformer>
      `);
    });

    describe('render dynamically', () => {
        const component = JSON.stringify({ type: 'dynamically' });

        beforeEach(async () => {
            page = await newSpecPage({
                components: [LabTransformer],
                html: `<lab-transformer component='${component}'></lab-transformer>`,
            });

            element = page.doc.querySelector('lab-transformer');
        });

        it('should render component dynamically', async () => {
            expect(page.root).toEqualHtml(`
          <lab-transformer component="{&quot;type&quot;:&quot;dynamically&quot;}">
              <mock:shadow-root>
                  <lab-dynamically type="dynamically"></lab-test>
              </mock:shadow-root>
          </lab-transformer>
        `);
        });

        it('should build transformer with component object', () => {
            expect(element.component).toEqual(component);
        });
    });

    describe('getProperties function', () => {
        const transformer = new LabTransformer();

        it('should return json when component is object', () => {
            const component = { type: 'button', text: 'button' };
            const properties = transformer.getProperties(component);

            expect(typeof properties).toEqual('object');
            expect(properties).toEqual(component);
        });

        it('should return json when component is string', () => {
            const component = '{ "type": "button", "text": "button" }';
            const properties = transformer.getProperties(component);

            expect(typeof properties).toEqual('object');
            expect(properties).toEqual({
                type: 'button',
                text: 'button',
            });
        });
    });

    describe('getSelector function', () => {
        const transformer = new LabTransformer();

        it('should return selector with type', () => {
            const props = { type: 'button' };
            const selector = transformer.getSelector(props);

            expect(selector).toEqual('lab-button');
        });

        it('should NOT return selector when type has whitespace', () => {
            const props = { type: ' whitespace' };
            const selector = transformer.getSelector(props);

            expect(selector).toEqual('');
        });

        it('should NOT return selector when type is empty', () => {
            const props = { type: '' };
            const selector = transformer.getSelector(props);

            expect(selector).toEqual('');
        });

        it('should NOT return selector when props has not type', () => {
            const props = {};
            const selector = transformer.getSelector(props);

            expect(selector).toEqual('');
        });
    });
});
