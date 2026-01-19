import { render, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';

import { TextEditor } from '../src/components/TextEditor';
import '@testing-library/jest-dom';

describe('TextEditor', () => {
    test('renders textarea with value', () => {
        const { container } = render(
            <TextEditor value="Test content" onChange={() => { }} />
        );
        const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
        expect(textarea).toBeInTheDocument();
        expect(textarea.value).toBe('Test content');
    });

    test('calls onChange when text changes', () => {
        const handleChange = jest.fn();
        const { container } = render(
            <TextEditor value="" onChange={handleChange} />
        );
        const textarea = container.querySelector('textarea')!;

        fireEvent.change(textarea, { target: { value: 'New text' } });
        expect(handleChange).toHaveBeenCalledWith('New text');
    });

    test('applies custom placeholder', () => {
        const { container } = render(
            <TextEditor
                value=""
                onChange={() => { }}
                placeholder="Custom placeholder"
            />
        );
        const textarea = container.querySelector('textarea')!;
        expect(textarea).toHaveAttribute('placeholder', 'Custom placeholder');
    });

    test('applies custom className', () => {
        const { container } = render(
            <TextEditor
                value=""
                onChange={() => { }}
                className="custom-class"
            />
        );
        const textarea = container.querySelector('textarea')!;
        expect(textarea).toHaveClass('custom-class');
    });

    test('handles empty value', () => {
        const { container } = render(
            <TextEditor value="" onChange={() => { }} />
        );
        const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
        expect(textarea.value).toBe('');
    });
});