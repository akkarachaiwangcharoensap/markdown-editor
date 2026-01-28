import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { EditInPlaceMarkdownProps } from '../types';
import { useClickOutside } from '../hooks/useClickOutside';

/**
 * Edit-in-Place Markdown Editor
 * Shows preview by default, switches to editor on click,
 * and returns to preview when clicking outside
 */
export const EditInPlaceMarkdown: React.FC<EditInPlaceMarkdownProps> = ({
    value,
    onChange,
    placeholder = 'Click to edit...',
    editorClassName = '',
    previewClassName = '',
    containerClassName = '',
    styles,
    sanitize = true,
    enableGfm = true,
    enableMath = false,
    emptyText = 'Click to add content...',
    showEditIcon = true,
    autoFocus = true,
    syntaxHighlighter,
    customComponents,
    locked: controlledLocked,
    onLockedChange,
    showLockToggle = false,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const [internalLocked, setInternalLocked] = useState(controlledLocked ?? false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Determine if locked is controlled or uncontrolled
    const isLockedControlled = controlledLocked !== undefined;
    const locked = isLockedControlled ? controlledLocked : internalLocked;

    // Sync external value changes
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleSave = useCallback(() => {
        setIsEditing(false);
        if (onChange && localValue !== value) {
            onChange(localValue);
        }
    }, [localValue, value, onChange]);

    // Handle click outside to exit edit mode
    useClickOutside(containerRef as React.RefObject<HTMLDivElement>, () => {
        if (isEditing) {
            handleSave();
        }
    });

    const handleEdit = useCallback(() => {
        if (!locked) {
            setIsEditing(true);
        }
    }, [locked]);

    const handleLockToggle = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        const newLockedState = !locked;
        if (!isLockedControlled) {
            setInternalLocked(newLockedState);
        }
        if (onLockedChange) {
            onLockedChange(newLockedState);
        }
    }, [locked, isLockedControlled, onLockedChange]);

    const handleChange = useCallback((newValue: string) => {
        setLocalValue(newValue);
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        // Cancel on Escape
        if (e.key === 'Escape') {
            e.preventDefault();
            setLocalValue(value);
            setIsEditing(false);
        }
    }, [value]);

    // Auto-resize textarea based on content
    const adjustTextareaHeight = useCallback(() => {
        if (textareaRef.current) {
            // Reset height to auto to get the correct scrollHeight
            textareaRef.current.style.height = 'auto';
            // Set height to scrollHeight to fit content
            const newHeight = Math.max(200, textareaRef.current.scrollHeight);
            textareaRef.current.style.height = `${newHeight}px`;
        }
    }, []);

    // Auto-focus textarea when entering edit mode and adjust height
    useEffect(() => {
        if (isEditing && autoFocus && textareaRef.current) {
            textareaRef.current.focus();
            // Move cursor to end
            const length = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(length, length);
            // Adjust height to fit content
            adjustTextareaHeight();
        }
    }, [isEditing, autoFocus, adjustTextareaHeight]);

    // Adjust height when content changes
    useEffect(() => {
        if (isEditing) {
            adjustTextareaHeight();
        }
    }, [localValue, isEditing, adjustTextareaHeight]);

    if (isEditing) {
        return (
            <div
                ref={containerRef}
                className={`relative ${containerClassName}`}
                onKeyDown={handleKeyDown}
            >
                <textarea
                    ref={textareaRef}
                    value={localValue}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full min-h-[200px] p-4 border-2 border-blue-500 rounded-lg font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 ${editorClassName}`}
                />
                <div className="mt-2 flex gap-2 text-xs text-gray-500">
                    <span>💡 Click outside to save</span>
                    <span>•</span>
                    <span>Press Esc to cancel</span>
                </div>
            </div>
        );
    }

    // Preview mode
    const isEmpty = !localValue || localValue.trim() === '';

    return (
        <div
            ref={containerRef}
            onClick={handleEdit}
            className={`group relative ${locked ? 'cursor-default' : 'cursor-pointer'} transition-all ${!locked && 'hover:bg-gray-50'} rounded-lg ${containerClassName}`}
        >
            {showLockToggle && (
                <button
                    onClick={handleLockToggle}
                    className={`absolute top-2 right-2 z-10 rounded p-1 border transition-all ${locked
                            ? 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                    title={locked ? 'Unlock to edit' : 'Lock to prevent editing'}
                >
                    <span className="text-sm">{locked ? '🔒' : '🔓'}</span>
                </button>
            )}
            {isEmpty ? (
                <div className={`p-4 text-gray-400 italic flex items-center gap-2 min-h-[86px] border-2 border-dashed border-gray-300 rounded ${previewClassName}`}>
                    {showEditIcon && !locked && <span className="text-sm">✏️</span>}
                    {locked && <span className="text-sm">🔒</span>}
                    <span>{locked ? 'Locked - click lock icon to edit' : emptyText}</span>
                </div>
            ) : (
                <div className="relative">
                    {showEditIcon && !locked && (
                        <div className={`absolute top-2 ${showLockToggle ? 'right-10' : 'right-2'} opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded p-2 shadow-sm`}>
                            <span className="text-sm text-gray-600">✏️ Click to edit</span>
                        </div>
                    )}
                    <MarkdownRenderer
                        content={localValue}
                        styles={styles}
                        className={`p-4 rounded-lg border-2 border-transparent ${!locked && 'hover:border-gray-300'} transition-all ${previewClassName}`}
                        sanitize={sanitize}
                        enableGfm={enableGfm}
                        enableMath={enableMath}
                        syntaxHighlighter={syntaxHighlighter}
                        customComponents={customComponents}
                    />
                </div>
            )}
        </div>
    );
};