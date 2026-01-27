import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MarkdownEditor } from '../src/components/MarkdownEditor';
import { MarkdownEditorWithPreview } from '../src/components/MarkdownEditorWithPreview';
import { EditInPlaceMarkdown } from '../src/components/EditInPlaceMarkdown';
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';

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

    describe('Component injection integration', () => {
        const Counter = ({ initial = '0' }: { initial?: string }) => {
            const [count, setCount] = React.useState(parseInt(initial, 10));
            return (
                <div data-testid="counter">
                    <span data-testid="count">{count}</span>
                    <button data-testid="increment" onClick={() => setCount(count + 1)}>+</button>
                </div>
            );
        };

        const Alert = ({ children, type = 'info' }: { children: React.ReactNode; type?: string }) => (
            <div data-testid="alert" data-type={type}>{children}</div>
        );

        test('works with MarkdownEditor', () => {
            const customComponents = { Counter, Alert };
            const { container } = render(
                <MarkdownEditor
                    value="<Counter initial='5' />"
                    onChange={() => {}}
                    customComponents={customComponents}
                />
            );

            expect(container.querySelector('[data-testid="counter"]')).toBeInTheDocument();
        });

        test('works with MarkdownEditorWithPreview', () => {
            const customComponents = { Alert };
            const { container } = render(
                <MarkdownEditorWithPreview
                    value="<Alert type='warning'>Test</Alert>"
                    onChange={() => {}}
                    customComponents={customComponents}
                />
            );

            expect(container).toBeInTheDocument();
        });

        test('works with EditInPlaceMarkdown', () => {
            const customComponents = { Counter };
            const { container } = render(
                <EditInPlaceMarkdown
                    value="<Counter initial='10' />"
                    onChange={() => {}}
                    customComponents={customComponents}
                />
            );

            expect(container.querySelector('[data-testid="counter"]')).toBeInTheDocument();
        });

        test('component state persists across re-renders', () => {
            const customComponents = { Counter };
            
            function TestWrapper() {
                const [value] = React.useState('<Counter initial="0" />');
                return (
                    <MarkdownEditor
                        value={value}
                        onChange={() => {}}
                        customComponents={customComponents}
                    />
                );
            }

            const { getByTestId } = render(<TestWrapper />);

            expect(getByTestId('count')).toHaveTextContent('0');
            
            fireEvent.click(getByTestId('increment'));
            
            expect(getByTestId('count')).toHaveTextContent('1');
        });

        test('multiple components work together', () => {
            const customComponents = { Counter, Alert };
            const markdown = `
# Title

<Alert type="info">Information</Alert>

<Counter initial="5" />
`;

            const { getByTestId } = render(
                <MarkdownEditor
                    value={markdown}
                    onChange={() => {}}
                    customComponents={customComponents}
                />
            );

            expect(getByTestId('alert')).toBeInTheDocument();
            expect(getByTestId('counter')).toBeInTheDocument();
        });
    });

    describe('Full workflow integration', () => {
        test('typing, editing, and custom components together', () => {
            const Badge = ({ children }: { children: React.ReactNode }) => (
                <span data-testid="badge">{children}</span>
            );

            const customComponents = { Badge };

            function TestWrapper() {
                const [value, setValue] = React.useState('');
                return <MarkdownEditor value={value} onChange={setValue} customComponents={customComponents} />;
            }

            const { container } = render(<TestWrapper />);
            const textarea = container.querySelector('textarea')!;

            // Type regular markdown
            fireEvent.change(textarea, { target: { value: '# Header' } });
            expect(textarea).toHaveValue('# Header');

            // Add component
            fireEvent.change(textarea, { target: { value: '# Header\n\n<Badge>New</Badge>' } });
            expect(textarea).toHaveValue('# Header\n\n<Badge>New</Badge>');
        });

        test('works with all markdown features enabled', () => {
            const { container } = render(
                <MarkdownEditor
                    value="# Header\n\n$x^2$\n\n~~strike~~"
                    onChange={() => {}}
                    enableMath={true}
                    enableGfm={true}
                />
            );

            expect(container).toBeInTheDocument();
            expect(container.querySelector('h1')).toHaveTextContent('Header');
        });

        test('mode switching in MarkdownEditorWithPreview', () => {
            const { container, getByLabelText } = render(
                <MarkdownEditorWithPreview
                    value="# Test"
                    onChange={() => {}}
                    showModeToggle={true}
                />
            );

            expect(container).toBeInTheDocument();
            
            // Should have mode toggle buttons
            expect(getByLabelText('Edit mode')).toBeInTheDocument();
            expect(getByLabelText('Preview mode')).toBeInTheDocument();
            expect(getByLabelText('Split mode')).toBeInTheDocument();
        });
    });
});