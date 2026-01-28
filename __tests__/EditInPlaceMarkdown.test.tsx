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

    describe('Locking mechanism', () => {
        test('prevents editing when locked', () => {
            const { container } = render(
                <EditInPlaceMarkdown 
                    value="# Test" 
                    onChange={() => {}} 
                    locked={true}
                    showLockToggle={true}
                />
            );

            const preview = container.querySelector('.group') as HTMLElement;
            fireEvent.click(preview);

            expect(container.querySelector('textarea')).not.toBeInTheDocument();
        });

        test('allows editing when unlocked', () => {
            const { container } = render(
                <EditInPlaceMarkdown 
                    value="# Test" 
                    onChange={() => {}} 
                    locked={false}
                    showLockToggle={true}
                />
            );

            const preview = container.querySelector('.group') as HTMLElement;
            fireEvent.click(preview);

            expect(container.querySelector('textarea')).toBeInTheDocument();
        });

        test('toggle lock button changes state (uncontrolled)', () => {
            const { container } = render(
                <EditInPlaceMarkdown 
                    value="# Test" 
                    onChange={() => {}} 
                    showLockToggle={true}
                />
            );

            const lockButton = container.querySelector('button') as HTMLButtonElement;
            
            // Initially unlocked (showing 🔓)
            expect(lockButton.textContent).toContain('🔓');

            // Click to lock
            fireEvent.click(lockButton);
            expect(lockButton.textContent).toContain('🔒');

            // Try to edit while locked
            const preview = container.querySelector('.group') as HTMLElement;
            fireEvent.click(preview);
            expect(container.querySelector('textarea')).not.toBeInTheDocument();

            // Click to unlock
            fireEvent.click(lockButton);
            expect(lockButton.textContent).toContain('🔓');

            // Now editing should work
            fireEvent.click(preview);
            expect(container.querySelector('textarea')).toBeInTheDocument();
        });

        test('calls onLockedChange when lock toggled', () => {
            const handleLockedChange = jest.fn();
            const { container } = render(
                <EditInPlaceMarkdown 
                    value="# Test" 
                    onChange={() => {}} 
                    showLockToggle={true}
                    onLockedChange={handleLockedChange}
                />
            );

            const lockButton = container.querySelector('button') as HTMLButtonElement;
            
            fireEvent.click(lockButton);
            expect(handleLockedChange).toHaveBeenCalledWith(true);

            fireEvent.click(lockButton);
            expect(handleLockedChange).toHaveBeenCalledWith(false);
        });

        test('respects controlled locked state', () => {
            const handleLockedChange = jest.fn();
            const { container, rerender } = render(
                <EditInPlaceMarkdown 
                    value="# Test" 
                    onChange={() => {}} 
                    locked={false}
                    showLockToggle={true}
                    onLockedChange={handleLockedChange}
                />
            );

            const lockButton = container.querySelector('button') as HTMLButtonElement;
            expect(lockButton.textContent).toContain('🔓');

            // Click lock button - should call callback but not change UI until parent updates prop
            fireEvent.click(lockButton);
            expect(handleLockedChange).toHaveBeenCalledWith(true);
            
            // UI should still show unlocked since prop hasn't changed
            expect(lockButton.textContent).toContain('🔓');

            // Parent updates the prop
            rerender(
                <EditInPlaceMarkdown 
                    value="# Test" 
                    onChange={() => {}} 
                    locked={true}
                    showLockToggle={true}
                    onLockedChange={handleLockedChange}
                />
            );

            // Now UI should show locked
            expect(lockButton.textContent).toContain('🔒');
        });

        test('does not show lock toggle when showLockToggle is false', () => {
            const { container } = render(
                <EditInPlaceMarkdown 
                    value="# Test" 
                    onChange={() => {}} 
                    showLockToggle={false}
                />
            );

            expect(container.querySelector('button')).not.toBeInTheDocument();
        });

        test('lock toggle does not show by default', () => {
            const { container } = render(
                <EditInPlaceMarkdown 
                    value="# Test" 
                    onChange={() => {}} 
                />
            );

            expect(container.querySelector('button')).not.toBeInTheDocument();
        });

        test('applies correct styling when locked', () => {
            const { container } = render(
                <EditInPlaceMarkdown 
                    value="# Test" 
                    onChange={() => {}} 
                    locked={true}
                    showLockToggle={true}
                />
            );

            const preview = container.querySelector('.group') as HTMLElement;
            expect(preview.className).toContain('cursor-default');
            expect(preview.className).not.toContain('cursor-pointer');

            const lockButton = container.querySelector('button') as HTMLButtonElement;
            expect(lockButton.className).toContain('bg-gray-100');
            expect(lockButton.className).toContain('border-gray-300');
        });

        test('shows lock icon in empty state when locked', () => {
            render(
                <EditInPlaceMarkdown 
                    value="" 
                    onChange={() => {}} 
                    locked={true}
                    showLockToggle={true}
                />
            );

            expect(screen.getByText('Locked - click lock icon to edit')).toBeInTheDocument();
        });

        test('lock button click does not trigger edit mode', () => {
            const { container } = render(
                <EditInPlaceMarkdown 
                    value="# Test" 
                    onChange={() => {}} 
                    showLockToggle={true}
                />
            );

            const lockButton = container.querySelector('button') as HTMLButtonElement;
            fireEvent.click(lockButton);

            // Should not enter edit mode
            expect(container.querySelector('textarea')).not.toBeInTheDocument();
        });
    });
});