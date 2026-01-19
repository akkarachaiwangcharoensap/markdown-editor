import React from 'react';
import { MarkdownEditorProps } from '../types';
import { TextEditor } from './TextEditor';
import { MarkdownRenderer } from './MarkdownRenderer';

/**
 * Main MarkdownEditor Component
 * Composite Pattern - combines TextEditor and MarkdownRenderer
 */
export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
    value,
    onChange,
    placeholder = 'Enter markdown here...',
    editorClassName = '',
    previewClassName = '',
    containerClassName = '',
    styles,
    readOnly = false,
    showPreview = true,
    sanitize = true,
    enableGfm = true,
    enableMath = true,
    syntaxHighlighter,
}) => {
    return (
        <div className={`flex gap-4 ${containerClassName}`}>
            {!readOnly && (
                <div className="flex-1">
                    <TextEditor
                        value={value}
                        onChange={onChange || (() => { })}
                        placeholder={placeholder}
                        className={editorClassName}
                    />
                </div>
            )}
            {showPreview && (
                <MarkdownRenderer
                    content={value}
                    styles={styles}
                    className={`flex-1 p-4 border border-gray-300 rounded-lg overflow-auto h-96 bg-white ${previewClassName}`}
                    sanitize={sanitize}
                    enableGfm={enableGfm}
                    enableMath={enableMath}
                    syntaxHighlighter={syntaxHighlighter}
                />
            )}
        </div>
    );
};