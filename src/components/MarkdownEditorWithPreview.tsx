import React, { useState, useCallback, useMemo } from 'react';
import { TextEditor } from './TextEditor';
import { MarkdownRenderer } from './MarkdownRenderer';
import { MarkdownEditorWithPreviewProps, ViewMode } from '../types';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

/**
 * Unified Markdown Editor with Live Preview
 * Supports three modes: edit-only, preview-only, and split view
 */
export const MarkdownEditorWithPreview: React.FC<MarkdownEditorWithPreviewProps> = ({
    value,
    onChange,
    placeholder = 'Enter markdown here...',
    editorClassName = '',
    previewClassName = '',
    containerClassName = '',
    styles,
    sanitize = true,
    enableGfm = true,
    enableMath = false,
    defaultMode = 'split',
    showModeToggle = true,
    debounceMs = 0,
    syntaxHighlighter,
}) => {
    const [mode, setMode] = useState<ViewMode>(defaultMode);

    // Debounce the value for preview rendering to improve performance
    const debouncedValue = useDebouncedValue(value, debounceMs);

    const handleChange = useCallback((newValue: string) => {
        onChange?.(newValue);
    }, [onChange]);

    const renderModeToggle = () => {
        if (!showModeToggle)
            return null;

        const buttonClass = (currentMode: ViewMode) =>
            `px-4 py-2 text-sm font-medium transition-colors ${mode === currentMode
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`;

        return (
            <div className="flex gap-1 mb-4 border border-gray-300 rounded-lg overflow-hidden w-fit">
                <button
                    onClick={() => setMode('edit')}
                    className={`${buttonClass('edit')} rounded-l-lg`}
                    aria-label="Edit mode"
                >
                    📝 Edit
                </button>
                <button
                    onClick={() => setMode('split')}
                    className={buttonClass('split')}
                    aria-label="Split mode"
                >
                    ⚡ Split
                </button>
                <button
                    onClick={() => setMode('preview')}
                    className={`${buttonClass('preview')} rounded-r-lg`}
                    aria-label="Preview mode"
                >
                    👁️ Preview
                </button>
            </div>
        );
    };

    const renderContent = () => {
        switch (mode) {
            case 'edit':
                return (
                    <div className="w-full">
                        <TextEditor
                            value={value}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className={`h-96 ${editorClassName}`}
                        />
                    </div>
                );

            case 'preview':
                return (
                    <div className="w-full">
                        <MarkdownRenderer
                            content={debouncedValue}
                            styles={styles}
                            className={`p-4 border border-gray-300 rounded-lg overflow-auto h-96 bg-white ${previewClassName}`}
                            sanitize={sanitize}
                            enableGfm={enableGfm}
                            enableMath={enableMath}
                            syntaxHighlighter={syntaxHighlighter}
                        />
                    </div>
                );

            case 'split':
            default:
                return (
                    <div className="flex gap-4 w-full">
                        <div className="flex-1">
                            <TextEditor
                                value={value}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className={`h-96 ${editorClassName}`}
                            />
                        </div>
                        <div className="flex-1">
                            <MarkdownRenderer
                                content={debouncedValue}
                                styles={styles}
                                className={`p-4 border border-gray-300 rounded-lg overflow-auto h-96 bg-white ${previewClassName}`}
                                sanitize={sanitize}
                                enableGfm={enableGfm}
                                enableMath={enableMath}
                                syntaxHighlighter={syntaxHighlighter}
                            />
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className={containerClassName}>
            {renderModeToggle()}
            {renderContent()}
        </div>
    );
};