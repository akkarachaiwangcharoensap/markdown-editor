# Markdown Editor

A customizable React markdown editor component library built on [react-markdown](https://github.com/remarkjs/react-markdown) and bundled with commonly used features for the AkiWiki.com CMS.

## Features

- **Fully Customizable Styles** - Style each markdown element independently
- **XSS Protection** - Built-in HTML sanitization using rehype-sanitize
- **Real-time Preview** - Live markdown rendering with debounced updates
- **Github-Flavoured Markdown (GFM) Support** - Tables, strikethrough, task lists, autolinks
- **LaTeX Math** - KaTeX support via remark-math and rehype-katex
- **Syntax Highlighting** - Code blocks with customizable highlighter
- **Click-to-Edit** - Inline editing with auto-save on blur
- **TypeScript** - Full type safety
- **Tested** - Comprehensive test suite with 56 passing tests

## Installation

```bash
npm install @yourname/markdown-editor
```

## Demo

To run the interactive demo locally:

```bash
# Navigate to the demo directory
cd examples/demo

# Install dependencies
npm install

# Start the development server
npm run dev
```

The demo will be available at `http://localhost:5173` and showcases all features including:
- Click-to-edit functionality
- Card components with save indicators
- Custom styling examples
- Syntax highlighting options
- LaTeX math support

## Quick Start

```tsx
import { MarkdownEditor } from '@yourname/markdown-editor';

function App() {
  const [value, setValue] = useState('# Hello World');
  
  return (
    <MarkdownEditor
      value={value}
      onChange={setValue}
    />
  );
}
```

## Live Preview Modes

### MarkdownEditorWithPreview

```tsx
import { MarkdownEditorWithPreview } from '@yourname/markdown-editor';

function App() {
  const [value, setValue] = useState('');
  
  return (
    <MarkdownEditorWithPreview
      value={value}
      onChange={setValue}
      defaultMode="split"        // 'edit' | 'split' | 'preview'
      showModeToggle={true}       // Show mode switch buttons
      debounceMs={100}            // Debounce preview updates
      enableMath={true}
      enableGfm={true}
    />
  );
}
```

### Modes

- **Edit Mode**: Focus on writing markdown
- **Split Mode**: Edit and preview side-by-side (default)
- **Preview Mode**: View rendered output only

### ResponsiveMarkdownEditor

Automatically adapts to screen size:
- Mobile (< 768px): Starts in edit mode with toggle
- Desktop (≥ 768px): Starts in split mode

```tsx
import { ResponsiveMarkdownEditor } from '@yourname/markdown-editor';

<ResponsiveMarkdownEditor
  value={value}
  onChange={setValue}
  enableMath={true}
/>
```

### Performance Optimization

Use `debounceMs` to delay preview rendering during rapid typing:

```tsx
<MarkdownEditorWithPreview
  value={value}
  onChange={setValue}
  debounceMs={300}  // Update preview 300ms after typing stops
/>
```

## Edit-in-Place Mode

### Basic Usage

```tsx
import { EditInPlaceMarkdown } from '@yourname/markdown-editor';

function MyNotes() {
  const [content, setContent] = useState('');
  
  return (
    <EditInPlaceMarkdown
      value={content}
      onChange={setContent}
      emptyText="Click to start writing..."
      showEditIcon={true}
    />
  );
}
```

### With Card Wrapper

```tsx
import { EditInPlaceMarkdownCard } from '@yourname/markdown-editor';

<EditInPlaceMarkdownCard
  title="Meeting Notes"
  value={content}
  onChange={setContent}
  showSaveIndicator={true}
  enableMath={true}
/>
```

### Features

- Click to edit, click outside to save
- Keyboard shortcuts (Escape to cancel)
- Empty state with custom placeholder
- Hover effects and edit indicators
- Optional save indicator with timestamp

### Keyboard Shortcuts

- **Escape**: Cancel and revert changes

## Custom Syntax Highlighting

You can use your own syntax highlighter instead of the default one:

```tsx
import { MarkdownRenderer } from '@yourname/markdown-editor';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

<MarkdownRenderer
  content={markdownContent}
  syntaxHighlighter={{
    component: SyntaxHighlighter,
    style: atomDark,
    props: {
      showLineNumbers: true,
      wrapLines: true
    }
  }}
/>
```

Works with all components that render markdown:

```tsx
<EditInPlaceMarkdown
  value={content}
  onChange={setContent}
  syntaxHighlighter={{
    component: SyntaxHighlighter,
    style: atomDark
  }}
/>

<MarkdownEditor
  value={content}
  onChange={setContent}
  syntaxHighlighter={{
    component: SyntaxHighlighter,
    style: dracula,
    props: { showLineNumbers: true }
  }}
/>
```

## Advanced Usage

### Custom Styles

```tsx
<MarkdownEditor
  value={markdown}
  onChange={setMarkdown}
  styles={{
    h1: 'text-5xl font-black text-purple-600',
    p: 'my-4 text-lg',
    code: 'bg-purple-100 px-2 py-1 rounded'
  }}
/>
```

### Using the Hook

```tsx
import { useMarkdown } from '@yourname/markdown-editor';

function MyComponent() {
  const { markdown, updateMarkdown, resetMarkdown } = useMarkdown('# Initial');
  
  return (
    <MarkdownEditor value={markdown} onChange={updateMarkdown} />
  );
}
```

## Dependencies

- [react-markdown](https://github.com/remarkjs/react-markdown) - Core markdown rendering
- [remark-gfm](https://github.com/remarkjs/remark-gfm) - GitHub Flavored Markdown support
- [remark-math](https://github.com/remarkjs/remark-math) & [rehype-katex](https://github.com/remarkjs/rehype-katex) - LaTeX math rendering
- [rehype-sanitize](https://github.com/rehypejs/rehype-sanitize) - HTML sanitization for XSS protection
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) - Code syntax highlighting

## API Reference

### MarkdownEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | required | Current markdown content |
| onChange | (value: string) => void | undefined | Callback when content changes |
| placeholder | string | "Enter markdown here..." | Textarea placeholder |
| styles | MarkdownStyles | defaultStyles | Custom styles for elements |
| readOnly | boolean | false | Hide editor, show preview only |
| showPreview | boolean | true | Show/hide preview pane |
| sanitize | boolean | true | Enable HTML sanitization |
| enableGfm | boolean | true | Enable GitHub Flavored Markdown |

## Development

All contributions are welcome!
If there are any concerns/feature requests, please submit an issue!

To contribute or modify this library:

```bash
# Clone the repository
git clone <repository-url>
cd markdown-editor

# Install dependencies
npm install

# Run tests
npm test              # Run all tests
npm run test:watch    # Watch mode for development
npm run test:coverage # Generate coverage report

# Build the library
npm run build         # Bundles to dist/ directory

# Run the demo
cd examples/demo
npm install
npm run dev
```

### Project Structure

- `src/` - Source code for the library
  - `components/` - React components (EditInPlaceMarkdown, MarkdownEditor, etc.)
  - `hooks/` - Custom hooks (useMarkdown, useClickOutside, useDebouncedValue)
  - `utils/` - Utilities (StyleManager)
  - `config/` - Default configurations and styles
  - `types/` - TypeScript type definitions
- `__tests__/` - Test suites
- `examples/demo/` - Interactive demo application

### Testing

All components are tested with Jest and React Testing Library. Run tests before submitting changes.

## License

MIT @ [Aki W.](https://akiwiki.com/)