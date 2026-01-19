import { render } from '@testing-library/react';
import { MarkdownComponentFactory } from '../src/components/MarkdownComponents';
import { defaultStyles } from '../src/config/defaultStyles';
import '@testing-library/jest-dom';

describe('MarkdownComponentFactory', () => {
	test('creates h1 component with correct className', () => {
		const components = MarkdownComponentFactory.createComponents(defaultStyles);
		const H1 = components.h1;
		const { container } = render(<H1>Test Heading</H1>);
		const h1 = container.querySelector('h1');
		expect(h1).toHaveClass(defaultStyles.h1!);
		expect(h1).toHaveTextContent('Test Heading');
	});

	test('creates h2 component with correct className', () => {
		const components = MarkdownComponentFactory.createComponents(defaultStyles);
		const H2 = components.h2;
		const { container } = render(<H2>Subheading</H2>);
		const h2 = container.querySelector('h2');
		expect(h2).toHaveClass(defaultStyles.h2!);
	});

	test('creates paragraph component', () => {
		const components = MarkdownComponentFactory.createComponents(defaultStyles);
		const P = components.p;
		const { container } = render(<P>Paragraph text</P>);
		const p = container.querySelector('p');
		expect(p).toHaveClass(defaultStyles.p!);
		expect(p).toHaveTextContent('Paragraph text');
	});

	test('creates link component with target blank', () => {
		const components = MarkdownComponentFactory.createComponents(defaultStyles);
		const A = components.a;
		const { container } = render(<A href="https://test.com">Link</A>);
		const link = container.querySelector('a');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
		expect(link).toHaveAttribute('href', 'https://test.com');
	});

	test('creates inline vs block code components', () => {
		const components = MarkdownComponentFactory.createComponents(defaultStyles);
		const Code = components.code;

		const { container: inlineContainer } = render(
			<Code inline={true}>inline code</Code>
		);
		expect(inlineContainer.querySelector('code')).toHaveClass(defaultStyles.code!);

		const { container: blockContainer } = render(
			<Code inline={false}>block code</Code>
		);
		expect(blockContainer.querySelector('code')).toHaveClass('font-mono text-sm');
	});

	test('creates strong component', () => {
		const components = MarkdownComponentFactory.createComponents(defaultStyles);
		const Strong = components.strong;
		const { container } = render(<Strong>Bold text</Strong>);
		const strong = container.querySelector('strong');
		expect(strong).toHaveClass(defaultStyles.strong!);
	});

	test('creates emphasis component', () => {
		const components = MarkdownComponentFactory.createComponents(defaultStyles);
		const Em = components.em;
		const { container } = render(<Em>Italic text</Em>);
		const em = container.querySelector('em');
		expect(em).toHaveClass(defaultStyles.em!);
	});

	test('creates blockquote component', () => {
		const components = MarkdownComponentFactory.createComponents(defaultStyles);
		const Blockquote = components.blockquote;
		const { container } = render(<Blockquote>Quote</Blockquote>);
		const blockquote = container.querySelector('blockquote');
		expect(blockquote).toHaveClass(defaultStyles.blockquote!);
	});

	test('creates table components', () => {
		const components = MarkdownComponentFactory.createComponents(defaultStyles);
		const Table = components.table;
		const Thead = components.thead;
		const Tr = components.tr;
		const Th = components.th;

		const { container } = render(
			<Table>
				<Thead>
					<Tr>
						<Th>Header</Th>
					</Tr>
				</Thead>
			</Table>
		);

		expect(container.querySelector('table')).toHaveClass(defaultStyles.table!);
		expect(container.querySelector('thead')).toHaveClass(defaultStyles.thead!);
		expect(container.querySelector('tr')).toHaveClass(defaultStyles.tr!);
		expect(container.querySelector('th')).toHaveClass(defaultStyles.th!);
	});

	test('uses custom styles when provided', () => {
		const customStyles = {
			...defaultStyles,
			h1: 'custom-heading-class'
		};
		const components = MarkdownComponentFactory.createComponents(customStyles);
		const H1 = components.h1;
		const { container } = render(<H1>Custom Styled</H1>);
		const h1 = container.querySelector('h1');
		expect(h1).toHaveClass('custom-heading-class');
	});
});