import React from 'react';
import { EditInPlaceMarkdown } from './EditInPlaceMarkdown';
import { EditInPlaceMarkdownProps } from '../types';

/**
 * Card-style Edit-in-Place Markdown
 * Adds a card wrapper with optional title
 */
interface EditInPlaceMarkdownCardProps extends EditInPlaceMarkdownProps {
    title?: string;
    showSaveIndicator?: boolean;
}

export const EditInPlaceMarkdownCard: React.FC<EditInPlaceMarkdownCardProps> = ({
    title,
    showSaveIndicator = true,
    ...props
}) => {
    const [lastSaved, setLastSaved] = React.useState<Date | null>(null);

    const handleChange = React.useCallback((value: string) => {
        props.onChange?.(value);
        if (showSaveIndicator) {
            setLastSaved(new Date());
        }
    }, [props.onChange, showSaveIndicator]);

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {(title || showSaveIndicator) && (
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                    {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
                    {showSaveIndicator && lastSaved && (
                        <span className="text-xs text-gray-500">
                            ✓ Saved at {lastSaved.toLocaleTimeString()}
                        </span>
                    )}
                </div>
            )}
            <div className="p-4">
                <EditInPlaceMarkdown
                    {...props}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};