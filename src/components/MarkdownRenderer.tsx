import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

import { MarkdownRendererProps } from '../types';
import { StyleManager } from '../utils/styleManager';
import { MarkdownComponentFactory } from './MarkdownComponents';

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
    content,
    styles,
    className = '',
    sanitize = true,
    enableGfm = true,
    enableMath = true,
    syntaxHighlighter,
    customComponents,
}) => {
    const styleManager = StyleManager.getInstance();
    const mergedStyles = useMemo(
        () => styleManager.mergeStyles(styles),
        [styles, styleManager]
    );

    const components = useMemo(
        () => MarkdownComponentFactory.createComponents(mergedStyles, syntaxHighlighter, customComponents),
        [mergedStyles, syntaxHighlighter, customComponents]
    );

    // Process content to convert PascalCase component tags to lowercase
    // BUT preserve code blocks (both inline and block)
    const processedContent = useMemo(() => {
        if (!customComponents || !content) return content;

        let processed = content;
        const componentNames = Object.keys(customComponents);

        // Extract code blocks and inline code to preserve them
        const codeBlocks: string[] = [];
        const codeBlockPlaceholder = '___CODE_BLOCK_';

        // Replace triple backtick code blocks with placeholders (preserve surrounding newlines)
        processed = processed.replace(/(^|\n)(```[\s\S]*?```)(\n|$)/g, (match, before, code, after) => {
            const index = codeBlocks.length;
            codeBlocks.push(code);
            return `${before}${codeBlockPlaceholder}${index}___${after}`;
        });

        // Replace inline code with placeholders
        processed = processed.replace(/`[^`\n]+`/g, (match) => {
            const index = codeBlocks.length;
            codeBlocks.push(match);
            return `${codeBlockPlaceholder}${index}___`;
        });

        // Now process component names
        componentNames.forEach(name => {
            // Skip if already lowercase
            if (name === name.toLowerCase()) return;

            // Replace self-closing tags: <ComponentName />
            const selfClosingRegex = new RegExp(`<${name}([^>]*?)\\s*/>`, 'g');
            processed = processed.replace(selfClosingRegex, `<${name.toLowerCase()}$1></${name.toLowerCase()}>`);

            // Replace opening tags: <ComponentName>
            const openingRegex = new RegExp(`<${name}(\\s|>)`, 'g');
            processed = processed.replace(openingRegex, `<${name.toLowerCase()}$1`);

            // Replace closing tags: </ComponentName>
            const closingRegex = new RegExp(`</${name}>`, 'g');
            processed = processed.replace(closingRegex, `</${name.toLowerCase()}>`);
        });

        // Restore code blocks
        codeBlocks.forEach((code, index) => {
            processed = processed.replace(`${codeBlockPlaceholder}${index}___`, code);
        });

        return processed;
    }, [content, customComponents]);

    // Create a custom sanitize schema that allows our custom component tags
    const sanitizeSchema = useMemo(() => {
        if (!customComponents) return sanitize ? defaultSchema : undefined;

        const customTagNames = Object.keys(customComponents).map(key => key.toLowerCase());

        return sanitize ? {
            ...defaultSchema,
            tagNames: [...(defaultSchema.tagNames || []), ...customTagNames],
            attributes: {
                ...defaultSchema.attributes,
                '*': [
                    ...(defaultSchema.attributes?.['*'] || []),
                    'type', 'color', 'variant', 'title', 'initial', 'step', 'label',
                    'value', 'max', 'defaultopen', 'url', 'width', 'height'
                ],
            },
        } : undefined;
    }, [customComponents, sanitize]);

    // Fix: Use proper typing with 'any' or create the array inline
    const rehypePlugins: any[] = sanitize ? [rehypeRaw, [rehypeSanitize, sanitizeSchema]] : [rehypeRaw];
    const remarkPlugins: any[] = [];

    if (enableGfm) {
        remarkPlugins.push(remarkGfm);
    }

    if (enableMath) {
        remarkPlugins.push(remarkMath);
        rehypePlugins.push(rehypeKatex);
    }

    return (
        <div className={className}>
            <ReactMarkdown
                remarkPlugins={remarkPlugins}
                rehypePlugins={rehypePlugins}
                components={components}
            >
                {processedContent}
            </ReactMarkdown>
        </div>
    );
};