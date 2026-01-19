import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { MarkdownStyles, SyntaxHighlighterConfig } from '../types';
import { defaultSyntaxHighlighter } from '../config/defaultStyles';

/**
 * Factory Pattern for creating styled markdown components
 */
export class MarkdownComponentFactory {
    static createComponents(styles: MarkdownStyles, syntaxHighlighter?: SyntaxHighlighterConfig) {
        const HighlighterComponent = syntaxHighlighter?.component ?? SyntaxHighlighter;
        const highlighterStyle = syntaxHighlighter?.style ?? defaultSyntaxHighlighter.style;
        const highlighterProps = syntaxHighlighter?.props || {};
        const highlighterClassName = syntaxHighlighter?.className ?? defaultSyntaxHighlighter.className;
        return {
            h1: ({ children, ...props }: any) => (
                <h1 className={styles.h1} {...props}>{children}</h1>
            ),
            h2: ({ children, ...props }: any) => (
                <h2 className={styles.h2} {...props}>{children}</h2>
            ),
            h3: ({ children, ...props }: any) => (
                <h3 className={styles.h3} {...props}>{children}</h3>
            ),
            h4: ({ children, ...props }: any) => (
                <h4 className={styles.h4} {...props}>{children}</h4>
            ),
            h5: ({ children, ...props }: any) => (
                <h5 className={styles.h5} {...props}>{children}</h5>
            ),
            h6: ({ children, ...props }: any) => (
                <h6 className={styles.h6} {...props}>{children}</h6>
            ),
            p: ({ children, ...props }: any) => (
                <p className={styles.p} {...props}>{children}</p>
            ),
            a: ({ children, href, ...props }: any) => (
                <a
                    href={href}
                    className={styles.a}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                >
                    {children}
                </a>
            ),
            ul: ({ children, ...props }: any) => (
                <ul className={styles.ul} {...props}>{children}</ul>
            ),
            ol: ({ children, ...props }: any) => (
                <ol className={styles.ol} {...props}>{children}</ol>
            ),
            li: ({ children, ...props }: any) => (
                <li className={styles.li} {...props}>{children}</li>
            ),
            blockquote: ({ children, ...props }: any) => (
                <blockquote className={styles.blockquote} {...props}>{children}</blockquote>
            ),
            code: ({ inline, className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : '';

                return !inline && language ? (
                    <HighlighterComponent
                        style={highlighterStyle}
                        language={language}
                        PreTag="div"
                        className={highlighterClassName}
                        {...highlighterProps}
                        {...props}
                    >
                        {String(children).replace(/\n$/, '')}
                    </HighlighterComponent>
                ) : (
                    <code className={inline ? styles.code : 'font-mono text-sm'} {...props}>
                        {children}
                    </code>
                );
            },
            pre: ({ children, ...props }: any) => (
                <pre className={styles.pre} {...props}>{children}</pre>
            ),
            strong: ({ children, ...props }: any) => (
                <strong className={styles.strong} {...props}>{children}</strong>
            ),
            em: ({ children, ...props }: any) => (
                <em className={styles.em} {...props}>{children}</em>
            ),
            hr: (props: any) => <hr className={styles.hr} {...props} />,
            img: ({ src, alt, ...props }: any) => (
                <img
                    src={src}
                    alt={alt}
                    className={styles.img || 'max-w-full h-auto max-h-96 object-contain'}
                    {...props}
                />
            ),
            table: ({ children, ...props }: any) => (
                <table className={styles.table} {...props}>{children}</table>
            ),
            thead: ({ children, ...props }: any) => (
                <thead className={styles.thead} {...props}>{children}</thead>
            ),
            tbody: ({ children, ...props }: any) => (
                <tbody className={styles.tbody} {...props}>{children}</tbody>
            ),
            tr: ({ children, ...props }: any) => (
                <tr className={styles.tr} {...props}>{children}</tr>
            ),
            th: ({ children, ...props }: any) => (
                <th className={styles.th} {...props}>{children}</th>
            ),
            td: ({ children, ...props }: any) => (
                <td className={styles.td} {...props}>{children}</td>
            ),
            del: ({ children, ...props }: any) => (
                <del className={styles.del} {...props}>{children}</del>
            ),
            div: ({ children, className, ...props }: any) => {
                if (className === 'math math-display') {
                    return (
                        <div className={`${styles.math || ''} ${className}`} {...props}>
                            {children}
                        </div>
                    );
                }
                return <div className={className} {...props}>{children}</div>;
            },

            span: ({ children, className, ...props }: any) => {
                if (className === 'math math-inline') {
                    return (
                        <span className={`${styles.inlineMath || ''} ${className}`} {...props}>
                            {children}
                        </span>
                    );
                }
                return <span className={className} {...props}>{children}</span>;
            },
        };
    }
}