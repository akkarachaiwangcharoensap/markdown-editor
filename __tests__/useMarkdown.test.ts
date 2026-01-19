import { renderHook, act } from '@testing-library/react';
import { useMarkdown } from '../src/hooks/useMarkdown';

describe('useMarkdown', () => {
	test('initializes with default value', () => {
		const { result } = renderHook(() => useMarkdown('# Initial'));
		expect(result.current.markdown).toBe('# Initial');
	});

	test('initializes with empty string when no value provided', () => {
		const { result } = renderHook(() => useMarkdown());
		expect(result.current.markdown).toBe('');
	});

	test('updates markdown value', () => {
		const { result } = renderHook(() => useMarkdown());

		act(() => {
			result.current.updateMarkdown('# Updated');
		});

		expect(result.current.markdown).toBe('# Updated');
	});

	test('resets markdown to initial value', () => {
		const { result } = renderHook(() => useMarkdown('# Initial'));

		act(() => {
			result.current.updateMarkdown('# Changed');
		});
		expect(result.current.markdown).toBe('# Changed');

		act(() => {
			result.current.resetMarkdown();
		});
		expect(result.current.markdown).toBe('# Initial');
	});

	test('handles multiple updates', () => {
		const { result } = renderHook(() => useMarkdown(''));

		act(() => {
			result.current.updateMarkdown('First');
		});
		expect(result.current.markdown).toBe('First');

		act(() => {
			result.current.updateMarkdown('Second');
		});
		expect(result.current.markdown).toBe('Second');

		act(() => {
			result.current.updateMarkdown('Third');
		});
		expect(result.current.markdown).toBe('Third');
	});

	test('updateMarkdown function reference remains stable', () => {
		const { result, rerender } = renderHook(() => useMarkdown(''));

		const firstUpdateFn = result.current.updateMarkdown;

		act(() => {
			result.current.updateMarkdown('New value');
		});

		rerender();

		const secondUpdateFn = result.current.updateMarkdown;
		expect(firstUpdateFn).toBe(secondUpdateFn);
	});
});