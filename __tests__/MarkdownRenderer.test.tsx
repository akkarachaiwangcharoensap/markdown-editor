import React from 'react';
import { render } from '@testing-library/react';
import { MarkdownRenderer } from '../src/components/MarkdownRenderer';
import '@testing-library/jest-dom';

describe('MarkdownRenderer', () => {
	describe('Basic rendering', () => {
		test('renders simple markdown', () => {
			const { container } = render(
				<MarkdownRenderer content="# Hello World" />
			);

			const h1 = container.querySelector('h1');
			expect(h1).toHaveTextContent('Hello World');
		});

		test('renders paragraphs', () => {
			const { container } = render(
				<MarkdownRenderer content="This is a paragraph." />
			);

			const p = container.querySelector('p');
			expect(p).toHaveTextContent('This is a paragraph.');
		});

		test('renders bold and italic', () => {
			const { container } = render(
				<MarkdownRenderer content="**bold** and *italic*" />
			);

			expect(container.querySelector('strong')).toHaveTextContent('bold');
			expect(container.querySelector('em')).toHaveTextContent('italic');
		});

		test('renders links', () => {
			const { container } = render(
				<MarkdownRenderer content="[Link](https://example.com)" />
			);

			const link = container.querySelector('a');
			expect(link).toHaveAttribute('href', 'https://example.com');
			expect(link).toHaveAttribute('target', '_blank');
			expect(link).toHaveAttribute('rel', 'noopener noreferrer');
		});

		test('renders lists', () => {
			const markdown = `
- Item 1
- Item 2
- Item 3
`;
			const { container } = render(
				<MarkdownRenderer content={markdown} />
			);

			const items = container.querySelectorAll('li');
			expect(items).toHaveLength(3);
		});

		test('renders ordered lists', () => {
			const markdown = `
1. First
2. Second
3. Third
`;
			const { container } = render(
				<MarkdownRenderer content={markdown} />
			);

			const ol = container.querySelector('ol');
			expect(ol).toBeInTheDocument();
			expect(ol?.querySelectorAll('li')).toHaveLength(3);
		});

		test('renders blockquotes', () => {
			const { container } = render(
				<MarkdownRenderer content="> This is a quote" />
			);

			const blockquote = container.querySelector('blockquote');
			expect(blockquote).toHaveTextContent('This is a quote');
		});

		test('renders code blocks', () => {
			const markdown = '```javascript\nconst x = 42;\n```';
			const { container } = render(
				<MarkdownRenderer content={markdown} enableGfm={true} />
			);

			const code = container.querySelector('code');
			expect(code).toBeInTheDocument();
			expect(code?.textContent).toContain('const x = 42');
		});

		test('renders inline code', () => {
			const { container } = render(
				<MarkdownRenderer content="Use `const` for constants" />
			);

			const code = container.querySelector('code');
			expect(code).toHaveTextContent('const');
		});
	});

	describe('GFM features', () => {
		test('renders tables when GFM enabled', () => {
			const markdown = `
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
`;
			const { container } = render(
				<MarkdownRenderer content={markdown} enableGfm={true} />
			);

			const table = container.querySelector('table');
			expect(table).toBeInTheDocument();
			expect(container.querySelectorAll('th')).toHaveLength(2);
			expect(container.querySelectorAll('td')).toHaveLength(2);
		});

		test('renders strikethrough when GFM enabled', () => {
			const { container } = render(
				<MarkdownRenderer content="~~deleted text~~" enableGfm={true} />
			);

			const del = container.querySelector('del');
			expect(del).toHaveTextContent('deleted text');
		});

		test('does not render tables when GFM disabled', () => {
			const markdown = `
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
`;
			const { container } = render(
				<MarkdownRenderer content={markdown} enableGfm={false} />
			);

			const table = container.querySelector('table');
			expect(table).not.toBeInTheDocument();
		});
	});

	describe('Math rendering', () => {
		test('renders inline math when enabled', () => {
			const { container } = render(
				<MarkdownRenderer content="$x^2 + y^2 = z^2$" enableMath={true} />
			);

			// KaTeX renders math with specific classes
			const mathElement = container.querySelector('.math') || container.querySelector('span.katex');
			expect(mathElement).toBeInTheDocument();
		});

		test('renders display math when enabled', () => {
			const markdown = '$$\n\\sum_{i=1}^{n} i\n$$';
			const { container } = render(
				<MarkdownRenderer content={markdown} enableMath={true} />
			);

			// KaTeX renders display math
			const mathElement = container.querySelector('.math') || container.querySelector('.katex-display');
			expect(mathElement).toBeInTheDocument();
		});

		test('does not render math when disabled', () => {
			const { container } = render(
				<MarkdownRenderer content="$x^2 + y^2$" enableMath={false} />
			);

			// When disabled, it should just be text
			const mathElement = container.querySelector('.katex');
			expect(mathElement).not.toBeInTheDocument();
		});
	});

	describe('Custom styles', () => {
		test('applies custom heading styles', () => {
			const customStyles = {
				h1: 'custom-h1-class',
			};

			const { container } = render(
				<MarkdownRenderer
					content="# Heading"
					styles={customStyles}
				/>
			);

			const h1 = container.querySelector('h1');
			expect(h1).toHaveClass('custom-h1-class');
		});

		test('applies custom paragraph styles', () => {
			const customStyles = {
				p: 'custom-paragraph',
			};

			const { container } = render(
				<MarkdownRenderer
					content="Paragraph text"
					styles={customStyles}
				/>
			);

			const p = container.querySelector('p');
			expect(p).toHaveClass('custom-paragraph');
		});
	});

	describe('Custom className', () => {
		test('applies custom className to wrapper', () => {
			const { container } = render(
				<MarkdownRenderer
					content="# Test"
					className="custom-wrapper"
				/>
			);

			expect(container.firstChild).toHaveClass('custom-wrapper');
		});
	});

	describe('Sanitization', () => {
		test('sanitizes HTML by default', () => {
			const { container } = render(
				<MarkdownRenderer content='<script>alert("xss")</script>' />
			);

			const script = container.querySelector('script');
			expect(script).not.toBeInTheDocument();
		});

		test('can disable sanitization', () => {
			const { container } = render(
				<MarkdownRenderer
					content='<div id="test">Content</div>'
					sanitize={false}
				/>
			);

			const div = container.querySelector('#test');
			expect(div).toBeInTheDocument();
		});
	});

	describe('Empty content', () => {
		test('renders empty div for empty content', () => {
			const { container } = render(
				<MarkdownRenderer content="" />
			);

			expect(container.firstChild).toBeInTheDocument();
		});

		test('renders empty div for whitespace only', () => {
			const { container } = render(
				<MarkdownRenderer content="   \n  \n  " />
			);

			expect(container.firstChild).toBeInTheDocument();
		});
	});

	describe('Complex markdown', () => {
		test('renders nested lists', () => {
			const markdown = `
- Item 1
  - Nested 1a
  - Nested 1b
- Item 2
  - Nested 2a
`;
			const { container } = render(
				<MarkdownRenderer content={markdown} />
			);

			const lists = container.querySelectorAll('ul');
			expect(lists.length).toBeGreaterThan(1);
		});

		test('renders mixed content types', () => {
			const markdown = `# Heading

Paragraph with **bold** and *italic*.

- List item
- Another item

> Blockquote

[Link](https://example.com)`;

			const { container } = render(
				<MarkdownRenderer content={markdown} />
			);

			expect(container.querySelector('h1')).toBeInTheDocument();
			expect(container.querySelector('strong')).toBeInTheDocument();
			expect(container.querySelector('em')).toBeInTheDocument();
			expect(container.querySelector('ul')).toBeInTheDocument();
			expect(container.querySelector('blockquote')).toBeInTheDocument();
			expect(container.querySelector('a')).toBeInTheDocument();
		});
	});
});
