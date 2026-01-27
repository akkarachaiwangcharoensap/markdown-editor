export interface MarkdownStyles {
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
    p?: string;
    a?: string;
    ul?: string;
    ol?: string;
    li?: string;
    blockquote?: string;
    code?: string;
    pre?: string;
    strong?: string;
    em?: string;
    hr?: string;
    img?: string;
    table?: string;
    thead?: string;
    tbody?: string;
    tr?: string;
    th?: string;
    td?: string;
    del?: string;
    math?: string;
    inlineMath?: string;
}

export interface SyntaxHighlighterConfig {
    component?: React.ComponentType<any>;
    style?: any;
    props?: Record<string, any>;
    className?: string;
}

export interface ComponentInjection {
    [key: string]: React.ComponentType<any>;
}

export type ViewMode = 'edit' | 'preview' | 'split';

export interface MarkdownEditorWithPreviewProps {
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    editorClassName?: string;
    previewClassName?: string;
    containerClassName?: string;
    styles?: MarkdownStyles;
    sanitize?: boolean;
    enableGfm?: boolean;
    enableMath?: boolean;
    defaultMode?: ViewMode;
    showModeToggle?: boolean;
    debounceMs?: number;
    syntaxHighlighter?: SyntaxHighlighterConfig;
    customComponents?: ComponentInjection;
}

export interface MarkdownEditorProps {
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    editorClassName?: string;
    previewClassName?: string;
    containerClassName?: string;
    styles?: MarkdownStyles;
    readOnly?: boolean;
    showPreview?: boolean;
    sanitize?: boolean;
    enableGfm?: boolean;
    enableMath?: boolean;
    syntaxHighlighter?: SyntaxHighlighterConfig;
    customComponents?: ComponentInjection;
}

export interface MarkdownRendererProps {
    content: string;
    styles?: MarkdownStyles;
    className?: string;
    sanitize?: boolean;
    enableGfm?: boolean;
    enableMath?: boolean;
    syntaxHighlighter?: SyntaxHighlighterConfig;
    customComponents?: ComponentInjection;
}

export interface EditInPlaceMarkdownProps {
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    editorClassName?: string;
    previewClassName?: string;
    containerClassName?: string;
    styles?: MarkdownStyles;
    sanitize?: boolean;
    enableGfm?: boolean;
    enableMath?: boolean;
    emptyText?: string;
    showEditIcon?: boolean;
    autoFocus?: boolean;
    syntaxHighlighter?: SyntaxHighlighterConfig;
    customComponents?: ComponentInjection;
}