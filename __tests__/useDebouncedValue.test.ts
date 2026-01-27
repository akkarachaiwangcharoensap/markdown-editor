import { renderHook, waitFor } from '@testing-library/react';
import { useDebouncedValue } from '../src/hooks/useDebouncedValue';
import { act } from 'react';
import { jest } from '@jest/globals';

describe('useDebouncedValue', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	test('returns initial value immediately', () => {
		const { result } = renderHook(() => useDebouncedValue('initial', 500));
		expect(result.current).toBe('initial');
	});

	test('debounces value changes', async () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebouncedValue(value, delay),
			{ initialProps: { value: 'initial', delay: 500 } }
		);

		expect(result.current).toBe('initial');

		// Change the value
		rerender({ value: 'updated', delay: 500 });

		// Value should still be the old one
		expect(result.current).toBe('initial');

		// Fast-forward time
		act(() => {
			jest.advanceTimersByTime(500);
		});

		// Now it should be updated
		await waitFor(() => {
			expect(result.current).toBe('updated');
		});
	});

	test('cancels previous timeout when value changes rapidly', async () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebouncedValue(value, delay),
			{ initialProps: { value: 'first', delay: 500 } }
		);

		// Rapid changes
		rerender({ value: 'second', delay: 500 });
		act(() => {
			jest.advanceTimersByTime(200);
		});

		rerender({ value: 'third', delay: 500 });
		act(() => {
			jest.advanceTimersByTime(200);
		});

		rerender({ value: 'fourth', delay: 500 });

		// Still at initial value
		expect(result.current).toBe('first');

		// Complete the debounce
		act(() => {
			jest.advanceTimersByTime(500);
		});

		// Should jump to the last value
		await waitFor(() => {
			expect(result.current).toBe('fourth');
		});
	});

	test('works with different data types', async () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebouncedValue(value, delay),
			{ initialProps: { value: 42, delay: 300 } }
		);

		expect(result.current).toBe(42);

		rerender({ value: 100, delay: 300 });

		act(() => {
			jest.advanceTimersByTime(300);
		});

		await waitFor(() => {
			expect(result.current).toBe(100);
		});
	});

	test('works with objects', async () => {
		const initialObj = { name: 'John', age: 30 };
		const updatedObj = { name: 'Jane', age: 25 };

		const { result, rerender } = renderHook(
			({ value, delay }) => useDebouncedValue(value, delay),
			{ initialProps: { value: initialObj, delay: 400 } }
		);

		expect(result.current).toEqual(initialObj);

		rerender({ value: updatedObj, delay: 400 });

		act(() => {
			jest.advanceTimersByTime(400);
		});

		await waitFor(() => {
			expect(result.current).toEqual(updatedObj);
		});
	});

	test('handles different delay values', async () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebouncedValue(value, delay),
			{ initialProps: { value: 'test', delay: 100 } }
		);

		rerender({ value: 'updated', delay: 100 });

		act(() => {
			jest.advanceTimersByTime(100);
		});

		await waitFor(() => {
			expect(result.current).toBe('updated');
		});

		// Change delay
		rerender({ value: 'new', delay: 500 });

		act(() => {
			jest.advanceTimersByTime(500);
		});

		await waitFor(() => {
			expect(result.current).toBe('new');
		});
	});

	test('handles zero delay', async () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebouncedValue(value, delay),
			{ initialProps: { value: 'initial', delay: 0 } }
		);

		rerender({ value: 'updated', delay: 0 });

		act(() => {
			jest.advanceTimersByTime(0);
		});

		await waitFor(() => {
			expect(result.current).toBe('updated');
		});
	});

	test('cleans up timeout on unmount', () => {
		const { unmount } = renderHook(() => useDebouncedValue('test', 500));

		// Should not throw when unmounting
		expect(() => unmount()).not.toThrow();
	});
});
