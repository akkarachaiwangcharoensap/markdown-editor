import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MarkdownEditor } from '../src/components/MarkdownEditor';
import { jest } from '@jest/globals';

describe('Integration Tests', () => {
    test('full workflow: type markdown and see it update', async () => {
        const handleChange = jest.fn();
        const { container, rerender } = render(
            <MarkdownEditor value="" onChange={handleChange} />
        );

        const textarea = container.querySelector('textarea')!;

        fireEvent.change(textarea, { target: { value: '# Hello World' } });

        // Verify onChange was called with the new value
        expect(handleChange).toHaveBeenCalledWith('# Hello World');

        // Re-render with the new value (simulating state update)
        rerender(
            <MarkdownEditor value="# Hello World" onChange={handleChange} />
        );

        await waitFor(() => {
            expect(textarea).toHaveValue('# Hello World');
        });
    });

    test('works with custom styles throughout', () => {
        const customStyles = {
            h1: 'my-h1',
            p: 'my-p',
            code: 'my-code'
        };

        const { container } = render(
            <MarkdownEditor
                value="# Test"
                onChange={() => { }}
                styles={customStyles}
            />
        );

        expect(container).toBeInTheDocument();
    });

    test('handles enableMath prop', () => {
        const { container } = render(
            <MarkdownEditor
                value="$x^2$"
                onChange={() => { }}
                enableMath={true}
            />
        );

        expect(container).toBeInTheDocument();
    });

    test('handles enableGfm prop', () => {
        const { container } = render(
            <MarkdownEditor
                value="~~strikethrough~~"
                onChange={() => { }}
                enableGfm={true}
            />
        );

        expect(container).toBeInTheDocument();
    });

    test('full stateful workflow with useState', () => {
        // Better approach: Test with a wrapper component that manages state
        function TestWrapper() {
            const [value, setValue] = React.useState('');
            return <MarkdownEditor value={value} onChange={setValue} />;
        }

        const { container } = render(<TestWrapper />);
        const textarea = container.querySelector('textarea')!;

        fireEvent.change(textarea, { target: { value: '# Hello World' } });

        expect(textarea).toHaveValue('# Hello World');
    });
});