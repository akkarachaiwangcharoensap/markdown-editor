import { MarkdownStyles, SyntaxHighlighterConfig } from "../types";
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const defaultStyles: MarkdownStyles = {
    h1: 'text-4xl font-bold mt-6 mb-4',
    h2: 'text-3xl font-bold mt-5 mb-3',
    h3: 'text-2xl font-semibold mt-4 mb-2',
    h4: 'text-xl font-semibold mt-3 mb-2',
    h5: 'text-lg font-semibold mt-2 mb-1',
    h6: 'text-base font-semibold mt-2 mb-1',
    p: 'my-3 leading-relaxed',
    a: 'text-blue-600 hover:text-blue-800 underline',
    ul: 'list-disc list-inside my-3 space-y-1',
    ol: 'list-decimal list-inside my-3 space-y-1',
    li: 'ml-4',
    blockquote: 'border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700',
    code: 'bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono',
    pre: 'bg-gray-100 p-4 rounded-lg overflow-x-auto my-4',
    strong: 'font-bold',
    em: 'italic',
    hr: 'my-6 border-t border-gray-300',
    img: 'max-w-full h-auto max-h-64 object-contain rounded my-4',
    table: 'min-w-full border-collapse my-4',
    thead: 'bg-gray-100',
    tbody: '',
    tr: 'border-b border-gray-200',
    th: 'px-4 py-2 text-left font-semibold',
    td: 'px-4 py-2',
    del: 'line-through text-gray-500',
    math: 'my-4 overflow-x-auto',
    inlineMath: 'mx-1',
};

export const defaultSyntaxHighlighter: SyntaxHighlighterConfig = {
    style: oneDark,
    className: 'text-sm',
};
