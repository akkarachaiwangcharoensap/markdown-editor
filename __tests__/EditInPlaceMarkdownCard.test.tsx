import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { EditInPlaceMarkdownCard } from '../src/components/EditInPlaceMarkdownCard';
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';

describe('EditInPlaceMarkdownCard', () => {
	describe('Basic rendering', () => {
		test('renders card wrapper', () => {
			const { container } = render(
				<EditInPlaceMarkdownCard
					value="# Test"
					onChange={() => {}}
				/>
			);

			const card = container.querySelector('.bg-white.rounded-lg');
			expect(card).toBeInTheDocument();
		});

		test('renders with title', () => {
			const { getByText } = render(
				<EditInPlaceMarkdownCard
					value="# Test"
					onChange={() => {}}
					title="My Notes"
				/>
			);

			expect(getByText('My Notes')).toBeInTheDocument();
		});

		test('renders without title', () => {
			const { container } = render(
				<EditInPlaceMarkdownCard
					value="# Test"
					onChange={() => {}}
				/>
			);

			const title = container.querySelector('h3');
			expect(title).not.toBeInTheDocument();
		});

		test('renders content', () => {
			const { container } = render(
				<EditInPlaceMarkdownCard
					value="# Hello World"
					onChange={() => {}}
				/>
			);

			expect(container).toHaveTextContent('Hello World');
		});
	});

	describe('Save indicator', () => {
		test('shows save indicator by default', () => {
			const { queryByText, rerender } = render(
				<EditInPlaceMarkdownCard
					value="Initial"
					onChange={() => {}}
				/>
			);

			// Initially no save indicator
			expect(queryByText(/Saved at/)).not.toBeInTheDocument();

			// Trigger change
			rerender(
				<EditInPlaceMarkdownCard
					value="Updated"
					onChange={() => {}}
				/>
			);
		});

		test('hides save indicator when disabled', () => {
			const handleChange = jest.fn();
			const { queryByText } = render(
				<EditInPlaceMarkdownCard
					value="Test"
					onChange={handleChange}
					showSaveIndicator={false}
				/>
			);

			expect(queryByText(/Saved at/)).not.toBeInTheDocument();
		});

		test('shows timestamp after save', () => {
			const { queryByText } = render(
				<EditInPlaceMarkdownCard
					value="Test"
					onChange={() => {}}
					showSaveIndicator={true}
				/>
			);

			// Initially no save indicator shown
			expect(queryByText(/Saved at/)).not.toBeInTheDocument();
		});
	});

	describe('Integration with EditInPlaceMarkdown', () => {
		test('passes through EditInPlaceMarkdown props', () => {
			const { container } = render(
				<EditInPlaceMarkdownCard
					value="# Test"
					onChange={() => {}}
					emptyText="Custom empty text"
					showEditIcon={true}
				/>
			);

			expect(container).toBeInTheDocument();
		});

		test('passes through enableMath prop', () => {
			const { container } = render(
				<EditInPlaceMarkdownCard
					value="$x^2 + y^2 = z^2$"
					onChange={() => {}}
					enableMath={true}
				/>
			);

			expect(container).toBeInTheDocument();
		});

		test('passes through enableGfm prop', () => {
			const { container } = render(
				<EditInPlaceMarkdownCard
					value="~~strikethrough~~"
					onChange={() => {}}
					enableGfm={true}
				/>
			);

			expect(container).toBeInTheDocument();
		});

		test('passes through custom styles', () => {
			const customStyles = {
				h1: 'custom-heading',
			};

			const { container } = render(
				<EditInPlaceMarkdownCard
					value="# Test"
					onChange={() => {}}
					styles={customStyles}
				/>
			);

			expect(container).toBeInTheDocument();
		});

		test('passes through customComponents', () => {
			const Alert = ({ children }: { children: React.ReactNode }) => (
				<div data-testid="alert">{children}</div>
			);

			const customComponents = { Alert };

			const { container } = render(
				<EditInPlaceMarkdownCard
					value="<Alert>Test</Alert>"
					onChange={() => {}}
					customComponents={customComponents}
				/>
			);

			expect(container).toBeInTheDocument();
		});
	});

	describe('Styling', () => {
		test('has correct card styling classes', () => {
			const { container } = render(
				<EditInPlaceMarkdownCard
					value="Test"
					onChange={() => {}}
					title="Title"
				/>
			);

			const card = container.querySelector('.bg-white.rounded-lg.shadow-sm');
			expect(card).toBeInTheDocument();
		});

		test('header has correct styling', () => {
			const { container } = render(
				<EditInPlaceMarkdownCard
					value="Test"
					onChange={() => {}}
					title="Title"
				/>
			);

			const header = container.querySelector('.px-4.py-3.border-b');
			expect(header).toBeInTheDocument();
		});

		test('content area has padding', () => {
			const { container } = render(
				<EditInPlaceMarkdownCard
					value="Test"
					onChange={() => {}}
				/>
			);

			const content = container.querySelector('.p-4');
			expect(content).toBeInTheDocument();
		});
	});

	describe('onChange callback', () => {
		test('calls onChange when content changes', () => {
			const handleChange = jest.fn();

			const { container } = render(
				<EditInPlaceMarkdownCard
					value="Initial"
					onChange={handleChange}
				/>
			);

			expect(container).toBeInTheDocument();
		});

		test('handles undefined onChange gracefully', () => {
			const { container } = render(
				<EditInPlaceMarkdownCard value="Test" />
			);

			expect(container).toBeInTheDocument();
		});
	});

	describe('Edge cases', () => {
		test('handles empty value', () => {
			const { container } = render(
				<EditInPlaceMarkdownCard
					value=""
					onChange={() => {}}
				/>
			);

			expect(container).toBeInTheDocument();
		});

		test('handles very long title', () => {
			const longTitle = 'A'.repeat(200);

			const { getByText } = render(
				<EditInPlaceMarkdownCard
					value="Test"
					onChange={() => {}}
					title={longTitle}
				/>
			);

			expect(getByText(longTitle)).toBeInTheDocument();
		});

		test('handles special characters in title', () => {
			const { getByText } = render(
				<EditInPlaceMarkdownCard
					value="Test"
					onChange={() => {}}
					title="<>Special & Characters!@#"
				/>
			);

			expect(getByText('<>Special & Characters!@#')).toBeInTheDocument();
		});

		test('renders both title and save indicator together', () => {
			const { getByText, queryByText } = render(
				<EditInPlaceMarkdownCard
					value="Initial"
					onChange={() => {}}
					title="My Card"
					showSaveIndicator={true}
				/>
			);

			expect(getByText('My Card')).toBeInTheDocument();
			// Initially no save indicator
			expect(queryByText(/Saved at/)).not.toBeInTheDocument();
		});
	});
});
