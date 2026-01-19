
import { useState, useCallback } from 'react';

/**
 * Custom hook for markdown state management
 * Hook Pattern for reusable logic
 */
export const useMarkdown = (initialValue: string = '') => {
    const [markdown, setMarkdown] = useState(initialValue);

    const updateMarkdown = useCallback((value: string) => {
        setMarkdown(value);
    }, []);

    const resetMarkdown = useCallback(() => {
        setMarkdown(initialValue);
    }, [initialValue]);

    return {
        markdown,
        updateMarkdown,
        resetMarkdown,
    };
};
