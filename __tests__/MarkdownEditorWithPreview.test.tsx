import { render, screen, fireEvent } from '@testing-library/react';
import { MarkdownEditorWithPreview } from '../src/components/MarkdownEditorWithPreview';
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';

describe('MarkdownEditorWithPreview', () => {
    test('renders in split mode by default', () => {
        const { container } = render(
            <MarkdownEditorWithPreview value="# Test" onChange={() => { }} />
        );

        expect(container.querySelector('textarea')).toBeInTheDocument();
        expect(container.querySelector('.flex-1')).toBeInTheDocument();
    });

    test('shows mode toggle buttons', () => {
        render(
            <MarkdownEditorWithPreview
                value="# Test"
                onChange={() => { }}
                showModeToggle={true}
            />
        );

        expect(screen.getByLabelText('Edit mode')).toBeInTheDocument();
        expect(screen.getByLabelText('Split mode')).toBeInTheDocument();
        expect(screen.getByLabelText('Preview mode')).toBeInTheDocument();
    });

    test('switches to edit mode', () => {
        const { container } = render(
            <MarkdownEditorWithPreview value="# Test" onChange={() => { }} />
        );

        const editButton = screen.getByLabelText('Edit mode');
        fireEvent.click(editButton);

        expect(container.querySelector('textarea')).toBeInTheDocument();
        // In edit mode, should only have editor, not split view
        expect(container.querySelectorAll('.flex-1').length).toBeLessThan(2);
    });

    test('switches to preview mode', () => {
        const { container } = render(
            <MarkdownEditorWithPreview value="# Test" onChange={() => { }} />
        );

        const previewButton = screen.getByLabelText('Preview mode');
        fireEvent.click(previewButton);

        expect(container.querySelector('textarea')).not.toBeInTheDocument();
    });

    test('calls onChange when text is entered', () => {
        const handleChange = jest.fn();
        const { container } = render(
            <MarkdownEditorWithPreview value="" onChange={handleChange} />
        );

        const textarea = container.querySelector('textarea')!;
        fireEvent.change(textarea, { target: { value: '# Hello' } });

        expect(handleChange).toHaveBeenCalledWith('# Hello');
    });

    test('hides mode toggle when showModeToggle is false', () => {
        render(
            <MarkdownEditorWithPreview
                value="# Test"
                onChange={() => { }}
                showModeToggle={false}
            />
        );

        expect(screen.queryByLabelText('Edit mode')).not.toBeInTheDocument();
    });

    test('starts in specified default mode', () => {
        const { container } = render(
            <MarkdownEditorWithPreview
                value="# Test"
                onChange={() => { }}
                defaultMode="preview"
            />
        );

        expect(container.querySelector('textarea')).not.toBeInTheDocument();
    });
});