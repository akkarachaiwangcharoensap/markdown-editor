import { renderHook } from '@testing-library/react';
import { jest } from '@jest/globals';

import { useClickOutside } from '../src/hooks/useClickOutside';

describe('useClickOutside', () => {
    test('calls handler when clicking outside', () => {
        const handler = jest.fn();
        const ref = { current: document.createElement('div') };

        renderHook(() => useClickOutside(ref, handler));

        document.body.appendChild(ref.current);

        // Click outside
        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);
        outsideElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

        expect(handler).toHaveBeenCalled();

        document.body.removeChild(ref.current);
        document.body.removeChild(outsideElement);
    });

    test('does not call handler when clicking inside', () => {
        const handler = jest.fn();
        const ref = { current: document.createElement('div') };

        renderHook(() => useClickOutside(ref, handler));

        document.body.appendChild(ref.current);

        // Click inside
        ref.current.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

        expect(handler).not.toHaveBeenCalled();

        document.body.removeChild(ref.current);
    });
});