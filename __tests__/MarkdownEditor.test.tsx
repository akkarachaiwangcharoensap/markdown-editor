import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';

import { MarkdownEditor } from '../src/components/MarkdownEditor';
import '@testing-library/jest-dom';

describe('MarkdownEditor', () => {
	test('renders editor and preview by default', () => {
		const { container } = render(
			<MarkdownEditor value="# Test" onChange={() => { }} />
		);
		expect(container.querySelector('textarea')).toBeInTheDocument();
		const previews = container.querySelectorAll('.flex-1');
		expect(previews.length).toBeGreaterThan(0);
	});

	test('calls onChange when text is entered', () => {
		const handleChange = jest.fn();
		render(<MarkdownEditor value="" onChange={handleChange} />);

		const textarea = screen.getByPlaceholderText(/enter markdown/i);
		fireEvent.change(textarea, { target: { value: '# Hello' } });

		expect(handleChange).toHaveBeenCalledWith('# Hello');
	});

	test('displays current value in textarea', () => {
		const testValue = '# Test Heading';
		render(<MarkdownEditor value={testValue} onChange={() => { }} />);

		const textarea = screen.getByPlaceholderText(/enter markdown/i) as HTMLTextAreaElement;
		expect(textarea.value).toBe(testValue);
	});

	test('hides editor when readOnly is true', () => {
		const { container } = render(
			<MarkdownEditor value="# Test" readOnly={true} />
		);
		expect(container.querySelector('textarea')).not.toBeInTheDocument();
	});

	test('hides preview when showPreview is false', () => {
		const { container } = render(
			<MarkdownEditor value="# Test" showPreview={false} onChange={() => { }} />
		);
		const textareas = container.querySelectorAll('textarea');
		expect(textareas.length).toBe(1);
	});

	test('applies custom className to container', () => {
		const { container } = render(
			<MarkdownEditor
				value="# Test"
				containerClassName="custom-container"
				onChange={() => { }}
			/>
		);
		expect(container.querySelector('.custom-container')).toBeInTheDocument();
	});

	test('applies custom placeholder', () => {
		const customPlaceholder = 'Type your markdown here...';
		render(
			<MarkdownEditor
				value=""
				placeholder={customPlaceholder}
				onChange={() => { }}
			/>
		);
		expect(screen.getByPlaceholderText(customPlaceholder)).toBeInTheDocument();
	});

	test('works without onChange handler', () => {
		const { container } = render(
			<MarkdownEditor value="# Test" />
		);
		const textarea = container.querySelector('textarea');
		expect(textarea).toBeInTheDocument();

		// Should not throw error when typing
		expect(() => {
			fireEvent.change(textarea!, { target: { value: 'New text' } });
		}).not.toThrow();
	});
});