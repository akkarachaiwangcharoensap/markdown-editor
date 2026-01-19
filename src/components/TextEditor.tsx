import React from 'react';

interface TextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

/**
 * TextEditor Component
 * Handles the input textarea with debouncing capability
 */
export const TextEditor: React.FC<TextEditorProps> = ({
    value,
    onChange,
    placeholder = 'Enter markdown here...',
    className = '',
}) => {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
    );
};