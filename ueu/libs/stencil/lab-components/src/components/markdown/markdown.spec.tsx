import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { LabMarkdown } from './markdown';

describe('lab-markdown', () => {
    let page: SpecPage;
    let element: HTMLLabMarkdownElement;

    it('should build component without parameters', async () => {
        page = await newSpecPage({
            components: [LabMarkdown],
            html: `<lab-markdown>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur imperdiet suscipit ex a lacinia.
            </lab-markdown>`,
        });

        element = page.doc.querySelector('lab-markdown');

        expect(element).toBeTruthy();
    });

    it('should build component with html text', async () => {
        page = await newSpecPage({
            components: [LabMarkdown],
            html: `
				<lab-markdown
					text="Lorem ipsum dolor <s><b>sit amet</b></s>">
				</lab-markdown>
			`,
        });

        expect(page.root).toEqualHtml(`
			<lab-markdown text=\"Lorem ipsum dolor <s><b>sit amet</b></s>\">
				<mock:shadow-root>
					<p class="markdown">
						Lorem ipsum dolor <s><b>sit amet</b></s>
					</p>
				</mock:shadow-root>
			</lab-markdown>
		`);
    });
});
