import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
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
}) => {
    const styleManager = StyleManager.getInstance();
    const mergedStyles = useMemo(
        () => styleManager.mergeStyles(styles),
        [styles]
    );

    const components = useMemo(
        () => MarkdownComponentFactory.createComponents(mergedStyles, syntaxHighlighter),
        [mergedStyles, syntaxHighlighter]
    );

    // Fix: Use proper typing with 'any' or create the array inline
    const rehypePlugins: any[] = sanitize ? [rehypeRaw, rehypeSanitize] : [rehypeRaw];
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
                {content}
            </ReactMarkdown>
        </div>
    );
};