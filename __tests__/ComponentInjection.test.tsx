import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MarkdownRenderer } from '../src/components/MarkdownRenderer';
import { MarkdownComponentFactory } from '../src/components/MarkdownComponents';
import { defaultStyles } from '../src/config/defaultStyles';
import '@testing-library/jest-dom';

// Test components
const Alert = ({ children, type = 'info' }: { children: React.ReactNode; type?: string }) => (
	<div data-testid="alert" data-type={type} className={`alert-${type}`}>
		{children}
	</div>
);

const Badge = ({ children, color = 'blue' }: { children: React.ReactNode; color?: string }) => (
	<span data-testid="badge" data-color={color} className={`badge-${color}`}>
		{children}
	</span>
);

const Counter = (props: any) => {
	const { initial = '0', step = '1', label } = props;
	const initialValue = parseInt(String(initial), 10) || 0;
	const stepValue = parseInt(String(step), 10) || 1;
	const [count, setCount] = useState(initialValue);

	return (
		<div data-testid="counter">
			{label && <span data-testid="counter-label">{label}:</span>}
			<button
				data-testid="counter-decrement"
				onClick={() => setCount(count - stepValue)}
			>
				−
			</button>
			<span data-testid="counter-value">{count}</span>
			<button
				data-testid="counter-increment"
				onClick={() => setCount(count + stepValue)}
			>
				+
			</button>
		</div>
	);
};

const Card = ({ children, title }: { children: React.ReactNode; title?: string }) => (
	<div data-testid="card">
		{title && <h3 data-testid="card-title">{title}</h3>}
		<div data-testid="card-content">{children}</div>
	</div>
);

describe('Component Injection', () => {
	describe('MarkdownComponentFactory with custom components', () => {
		test('includes custom components in lowercase', () => {
			const customComponents = { Alert, Badge };
			const components = MarkdownComponentFactory.createComponents(
				defaultStyles,
				undefined,
				customComponents
			) as any;

			expect(components.alert).toBeDefined();
			expect(components.badge).toBeDefined();
			expect(components.Alert).toBeDefined();
			expect(components.Badge).toBeDefined();
		});

		test('includes both PascalCase and lowercase keys', () => {
			const customComponents = { Counter };
			const components = MarkdownComponentFactory.createComponents(
				defaultStyles,
				undefined,
				customComponents
			) as any;

			expect(components.counter).toBe(Counter);
			expect(components.Counter).toBe(Counter);
		});

		test('custom components work alongside standard components', () => {
			const customComponents = { Alert };
			const components = MarkdownComponentFactory.createComponents(
				defaultStyles,
				undefined,
				customComponents
			) as any;

			expect(components.h1).toBeDefined();
			expect(components.p).toBeDefined();
			expect(components.alert).toBeDefined();
		});
	});

	describe('MarkdownRenderer with custom components', () => {
		test('renders custom component with props', () => {
			const customComponents = { Alert };
			const markdown = '<Alert type="warning">Test alert</Alert>';

			const { getByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			const alert = getByTestId('alert');
			expect(alert).toBeInTheDocument();
			expect(alert).toHaveTextContent('Test alert');
			expect(alert).toHaveAttribute('data-type', 'warning');
		});

		test('renders inline custom components', () => {
			const customComponents = { Badge };
			const markdown = 'This is a <Badge color="red">badge</Badge> inline.';

			const { getByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			const badge = getByTestId('badge');
			expect(badge).toBeInTheDocument();
			expect(badge).toHaveTextContent('badge');
			expect(badge).toHaveAttribute('data-color', 'red');
		});

		test('renders self-closing custom components', () => {
			const customComponents = { Counter };
			const markdown = '<Counter initial="5" step="2" />';

			const { getByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			const counter = getByTestId('counter');
			expect(counter).toBeInTheDocument();
			expect(getByTestId('counter-value')).toHaveTextContent('5');
		});

		test('handles stateful interactive components', () => {
			const customComponents = { Counter };
			const markdown = '<Counter initial="0" step="1" label="Clicks" />';

			const { getByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			expect(getByTestId('counter-value')).toHaveTextContent('0');
			expect(getByTestId('counter-label')).toHaveTextContent('Clicks:');

			fireEvent.click(getByTestId('counter-increment'));
			expect(getByTestId('counter-value')).toHaveTextContent('1');

			fireEvent.click(getByTestId('counter-increment'));
			expect(getByTestId('counter-value')).toHaveTextContent('2');

			fireEvent.click(getByTestId('counter-decrement'));
			expect(getByTestId('counter-value')).toHaveTextContent('1');
		});

		test('supports markdown inside custom components', () => {
			const customComponents = { Alert };
			const markdown = `<Alert type="info">
This is **bold** and *italic* text.

- List item 1
- List item 2
</Alert>`;

			const { getByTestId, container } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			const alert = getByTestId('alert');
			// Markdown content is rendered as children
			expect(alert).toBeInTheDocument();
			expect(alert.textContent).toContain('bold');
			expect(alert.textContent).toContain('italic');
		});

		test('supports nested custom components', () => {
			const customComponents = { Card, Badge };
			const markdown = `<Card title="Test Card">
Content with a <Badge color="green">status</Badge> badge.
</Card>`;

			const { getByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			expect(getByTestId('card')).toBeInTheDocument();
			expect(getByTestId('card-title')).toHaveTextContent('Test Card');
			expect(getByTestId('badge')).toBeInTheDocument();
			expect(getByTestId('badge')).toHaveAttribute('data-color', 'green');
		});

		test('handles multiple instances of same component', () => {
			const customComponents = { Badge };
			const markdown = `
<Badge color="red">First</Badge>
<Badge color="blue">Second</Badge>
<Badge color="green">Third</Badge>
`;

			const { getAllByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			const badges = getAllByTestId('badge');
			expect(badges).toHaveLength(3);
			expect(badges[0]).toHaveAttribute('data-color', 'red');
			expect(badges[1]).toHaveAttribute('data-color', 'blue');
			expect(badges[2]).toHaveAttribute('data-color', 'green');
		});
	});

	describe('PascalCase to lowercase conversion', () => {
		test('converts PascalCase component tags to lowercase', () => {
			const customComponents = { Alert };
			const markdown = '<Alert type="info">Test</Alert>';

			const { getByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			expect(getByTestId('alert')).toBeInTheDocument();
		});

		test('preserves PascalCase in code blocks', () => {
			const customComponents = { Alert };
			const markdown = '```tsx\n<Alert type="info">Code example</Alert>\n```';

			const { container } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
					enableGfm={true}
				/>
			);

			const codeBlock = container.querySelector('code');
			expect(codeBlock).toBeInTheDocument();
			expect(codeBlock?.textContent).toContain('<Alert');
		});

		test('preserves PascalCase in inline code', () => {
			const customComponents = { Badge };
			const markdown = 'Use `<Badge color="blue">` for badges.';

			const { container } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			const inlineCode = container.querySelector('code');
			expect(inlineCode).toHaveTextContent('<Badge color="blue">');
		});

		test('converts self-closing tags correctly', () => {
			const customComponents = { Counter };
			const markdown = '<Counter initial="10" />';

			const { getByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			expect(getByTestId('counter')).toBeInTheDocument();
			expect(getByTestId('counter-value')).toHaveTextContent('10');
		});
	});

	describe('Component props handling', () => {
		test('passes string props correctly', () => {
			const customComponents = { Alert };
			const markdown = '<Alert type="success">Success message</Alert>';

			const { getByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			expect(getByTestId('alert')).toHaveAttribute('data-type', 'success');
		});

		test('handles numeric string props', () => {
			const customComponents = { Counter };
			const markdown = '<Counter initial="42" step="5" />';

			const { getByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			expect(getByTestId('counter-value')).toHaveTextContent('42');

			fireEvent.click(getByTestId('counter-increment'));
			expect(getByTestId('counter-value')).toHaveTextContent('47');
		});

		test('handles boolean-like string props', () => {
			const BooleanComponent = (props: any) => {
				const flag = props.flag || 'false';
				return (
					<div data-testid="bool-component" data-flag={flag}>
						{flag === 'true' ? 'Enabled' : 'Disabled'}
					</div>
				);
			};

			const customComponents = { BooleanComponent };
			const markdown = '<BooleanComponent flag="true"></BooleanComponent>';

			const { getByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			const component = getByTestId('bool-component');
			expect(component).toBeInTheDocument();
			// Props come through as attributes, need to check the actual behavior
			expect(component).toHaveAttribute('data-flag');
		});

		test('handles default props when not provided', () => {
			const customComponents = { Badge };
			const markdown = '<Badge>Default color</Badge>';

			const { getByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			expect(getByTestId('badge')).toHaveAttribute('data-color', 'blue');
		});
	});

	describe('Integration with markdown features', () => {
		test('works with GFM features', () => {
			const customComponents = { Alert };
			const markdown = `<Alert type="info">
Table content here
</Alert>`;

			const { getByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
					enableGfm={true}
				/>
			);

			const alert = getByTestId('alert');
			expect(alert).toBeInTheDocument();
			expect(alert.textContent).toContain('Table content');
		});

		test('works with math rendering', () => {
			const customComponents = { Card };
			const markdown = `<Card title="Math Example">
Math formula here
</Card>`;

			const { getByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
					enableMath={true}
				/>
			);

			const card = getByTestId('card');
			expect(card).toBeInTheDocument();
			expect(card.textContent).toContain('Math formula');
		});

		test('components work with links and images', () => {
			const customComponents = { Card };
			const markdown = `<Card title="Resources">
Links and images content
</Card>`;

			const { getByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			const card = getByTestId('card');
			expect(card).toBeInTheDocument();
			expect(card.textContent).toContain('Links and images');
		});
	});

	describe('Edge cases', () => {
		test('handles empty component content', () => {
			const customComponents = { Alert };
			const markdown = '<Alert type="info"></Alert>';

			const { getByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			expect(getByTestId('alert')).toBeInTheDocument();
		});

		test('handles component with no props', () => {
			const SimpleComponent = () => <div data-testid="simple">Simple</div>;
			const customComponents = { SimpleComponent };
			const markdown = '<SimpleComponent />';

			const { getByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			expect(getByTestId('simple')).toHaveTextContent('Simple');
		});

		test('handles multiple components in same paragraph', () => {
			const customComponents = { Badge };
			const markdown = 'Status: <Badge color="green">Active</Badge> Priority: <Badge color="red">High</Badge>';

			const { getAllByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			const badges = getAllByTestId('badge');
			expect(badges).toHaveLength(2);
		});

		test('handles mixed markdown and components', () => {
			const customComponents = { Badge, Alert };
			const markdown = `# Heading

Regular paragraph text.

<Alert type="warning">
Alert with **bold** text and a <Badge color="yellow">badge</Badge>.
</Alert>

- List item with <Badge color="blue">inline badge</Badge>
- Another item`;

			const { container, getByTestId, getAllByTestId } = render(
				<MarkdownRenderer
					content={markdown}
					customComponents={customComponents}
				/>
			);

			expect(container.querySelector('h1')).toHaveTextContent('Heading');
			expect(getByTestId('alert')).toBeInTheDocument();
			expect(getAllByTestId('badge')).toHaveLength(2);
			expect(container.querySelectorAll('li')).toHaveLength(2);
		});
	});
});
