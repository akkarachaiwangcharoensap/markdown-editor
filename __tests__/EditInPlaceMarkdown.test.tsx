import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EditInPlaceMarkdown } from '../src/components/EditInPlaceMarkdown';
import { jest } from '@jest/globals';

describe('EditInPlaceMarkdown', () => {
    test('renders preview by default', () => {
        const { container } = render(
            <EditInPlaceMarkdown value="# Test Content" onChange={() => { }} />
        );

        expect(container.querySelector('textarea')).not.toBeInTheDocument();
        expect(container.textContent).toContain('Test Content');
    });

    test('shows empty state when value is empty', () => {
        render(
            <EditInPlaceMarkdown
                value=""
                onChange={() => { }}
                emptyText="Click to add content"
            />
        );

        expect(screen.getByText('Click to add content')).toBeInTheDocument();
    });

    test('switches to edit mode on click', () => {
        const { container } = render(
            <EditInPlaceMarkdown value="# Test" onChange={() => { }} />
        );

        const preview = container.firstChild as HTMLElement;
        fireEvent.click(preview);

        expect(container.querySelector('textarea')).toBeInTheDocument();
    });

    test('exits edit mode and saves on click outside', async () => {
        const handleChange = jest.fn();
        const { container } = render(
            <div>
                <EditInPlaceMarkdown value="# Original" onChange={handleChange} />
                <div data-testid="outside">Outside element</div>
            </div>
        );

        // Click to edit
        const preview = container.querySelector('.group') as HTMLElement;
        fireEvent.click(preview);

        // Change value
        const textarea = container.querySelector('textarea')!;
        fireEvent.change(textarea, { target: { value: '# Modified' } });

        // Click outside
        const outside = screen.getByTestId('outside');
        fireEvent.mouseDown(outside);

        await waitFor(() => {
            expect(handleChange).toHaveBeenCalledWith('# Modified');
        });
    });

    test('cancels edit on Escape', () => {
        const handleChange = jest.fn();
        const { container } = render(
            <EditInPlaceMarkdown value="# Original" onChange={handleChange} />
        );

        // Enter edit mode
        fireEvent.click(container.firstChild as HTMLElement);

        const textarea = container.querySelector('textarea')!;
        fireEvent.change(textarea, { target: { value: '# Modified' } });
        fireEvent.keyDown(textarea, { key: 'Escape' });

        expect(handleChange).not.toHaveBeenCalled();
        expect(container.querySelector('textarea')).not.toBeInTheDocument();
    });

    test('shows edit icon on hover when enabled', () => {
        const { container } = render(
            <EditInPlaceMarkdown
                value="# Test"
                onChange={() => { }}
                showEditIcon={true}
            />
        );

        expect(container.textContent).toContain('Click to edit');
    });

    test('does not call onChange if value unchanged', async () => {
        const handleChange = jest.fn();
        const { container } = render(
            <div>
                <EditInPlaceMarkdown value="# Test" onChange={handleChange} />
                <div data-testid="outside">Outside</div>
            </div>
        );

        fireEvent.click(container.querySelector('.group') as HTMLElement);

        const outside = screen.getByTestId('outside');
        fireEvent.mouseDown(outside);

        await waitFor(() => {
            expect(container.querySelector('textarea')).not.toBeInTheDocument();
        });

        expect(handleChange).not.toHaveBeenCalled();
    });
});