# Markdown Editor

A customizable React markdown editor component library built on [react-markdown](https://github.com/remarkjs/react-markdown) and bundled with commonly used features for the AkiWiki.com CMS.

## Features

- **Edit-in-Place** - Click to edit, click outside to save with auto-resize
- **Lock Toggle** - Protect content with read-only mode (controlled or uncontrolled)
- **Fully Customizable Styles** - Style each markdown element independently
- **Custom Component Injection** - Embed interactive React components directly in markdown
- **XSS Protection** - Built-in HTML sanitization using rehype-sanitize
- **Real-time Preview** - Live markdown rendering with debounced updates
- **Github-Flavoured Markdown (GFM) Support** - Tables, strikethrough, task lists, autolinks
- **LaTeX Math** - KaTeX support via remark-math and rehype-katex
- **Syntax Highlighting** - Code blocks with customizable highlighter
- **TypeScript** - Full type safety
- **Tested** - Comprehensive test suite with 56+ passing tests
- **Lightweight** - Minimal dependencies, optimized bundle size

## Installation

```bash
npm install @akiwiki/markdown-editor
```

**Important:** To use LaTeX math features, import KaTeX CSS in your app:

```tsx
// In your main App.tsx or index.tsx
import 'katex/dist/katex.min.css';
```

## Demo

🚀 **[View Live Demo](https://akkarachaiwangcharoensap.github.io/markdown-editor/)**

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
import { MarkdownEditor } from '@akiwiki/markdown-editor';

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
import { MarkdownEditorWithPreview } from '@akiwiki/markdown-editor';

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
import { EditInPlaceMarkdown } from '@akiwiki/markdown-editor';

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
import { EditInPlaceMarkdownCard } from '@akiwiki/markdown-editor';

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

### Lock Toggle

Protect content from accidental edits with the lock toggle feature:

```tsx
import { EditInPlaceMarkdown } from '@akiwiki/markdown-editor';

function ProtectedContent() {
  const [content, setContent] = useState('# Important Content');
  const [isLocked, setIsLocked] = useState(false);
  
  return (
    <EditInPlaceMarkdown
      value={content}
      onChange={setContent}
      locked={isLocked}
      onLockedChange={setIsLocked}
      showLockToggle={true}  // Show lock/unlock button
    />
  );
}
```

**Features:**
- 🔒 Visual lock/unlock button with icons
- Controlled or uncontrolled lock state
- Prevents editing when locked
- Customizable lock button visibility
- Color-coded feedback (gray background when locked)

**Props:**
- `locked?: boolean` - Controlled lock state
- `onLockedChange?: (locked: boolean) => void` - Lock state change callback
- `showLockToggle?: boolean` - Show/hide lock button (default: `false`)

**Uncontrolled Mode:**
```tsx
<EditInPlaceMarkdown
  value={content}
  onChange={setContent}
  showLockToggle={true}  // Component manages lock state internally
/>
```

## Custom Component Injection

Inject interactive React components directly into your markdown content using PascalCase syntax. This powerful feature allows you to create rich, interactive documentation and content.

### Basic Usage

```tsx
import { MarkdownRenderer } from '@akiwiki/markdown-editor';

// 1. Define your custom components
const Alert = ({ children, type = 'info' }) => {
  const colors = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
  };

  return (
    <div className={`p-4 border-l-4 rounded ${colors[type]} my-4`}>
      {children}
    </div>
  );
};

const Badge = ({ children, color = 'blue' }) => (
  <span className={`inline-block px-3 py-1 text-sm font-semibold 
    rounded-full bg-${color}-100 text-${color}-800 mx-1`}>
    {children}
  </span>
);

// 2. Create a customComponents object
const customComponents = {
  Alert,
  Badge,
};

// 3. Pass to MarkdownRenderer
function MyComponent() {
  const markdown = `
# Custom Components Demo

<Alert type="info">
This is an **alert** with full markdown support inside!
</Alert>

Mix <Badge color="blue">badges</Badge> with your text.
`;

  return (
    <MarkdownRenderer
      content={markdown}
      customComponents={customComponents}
    />
  );
}
```

### Interactive Components

Create stateful components that respond to user interactions:

```tsx
import { useState } from 'react';

const Counter = (props) => {
  const { initial = '0', step = '1', label } = props;
  
  const initialValue = parseInt(String(initial), 10) || 0;
  const stepValue = parseInt(String(step), 10) || 1;
  
  const [count, setCount] = useState(initialValue);
  
  return (
    <div className="inline-flex items-center gap-3 p-4 border rounded-lg">
      {label && <span className="font-medium">{label}:</span>}
      <button 
        onClick={() => setCount(count - stepValue)}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        −
      </button>
      <span className="text-2xl font-bold">{count}</span>
      <button 
        onClick={() => setCount(count + stepValue)}
        className="px-3 py-1 bg-green-500 text-white rounded"
      >
        +
      </button>
    </div>
  );
};

const customComponents = { Counter };

// Use in markdown:
const markdown = `
<Counter initial="0" step="1" label="Click Counter" />
`;
```

### Collapsible Sections

```tsx
import { useState } from 'react';

const Collapsible = ({ children, title, defaultOpen = false }) => {
  const initialOpen = typeof defaultOpen === 'string' 
    ? defaultOpen === 'true' || defaultOpen === 'True' || defaultOpen === '1'
    : defaultOpen;
  
  const [isOpen, setIsOpen] = useState(initialOpen);
  
  return (
    <div className="border border-gray-300 rounded-lg my-4 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 
          flex items-center justify-between text-left font-medium"
      >
        <span>{title}</span>
        <span className="text-xl">{isOpen ? '▼' : '▶'}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

// Use in markdown:
const markdown = `
<Collapsible title="Advanced Features" defaultOpen="false">

This content is hidden by default. Click to expand!

- Collapsible sections
- **Markdown** support inside
- Perfect for FAQs and documentation

</Collapsible>
`;
```

### Component Props

All props are passed as strings from markdown and need to be parsed in your component:

```tsx
const ProgressBar = (props) => {
  // Props come as strings, parse them
  const value = parseFloat(String(props.value)) || 0;
  const max = parseFloat(String(props.max)) || 100;
  const color = props.color || 'blue';
  
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className="my-4">
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div 
          className={`h-full bg-${color}-600 transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Use in markdown:
const markdown = `
<ProgressBar value="75" max="100" color="blue" />
`;
```

### Full Markdown Support

Custom components support full markdown syntax inside them:

```tsx
const Card = ({ children, title }) => (
  <div className="border rounded-lg p-6 my-4 shadow-sm bg-white">
    {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
    <div className="text-gray-700">{children}</div>
  </div>
);

// Markdown with nested formatting:
const markdown = `
<Card title="Example Card">

Cards can contain any markdown content:
- Lists and formatting
- \`code blocks\`
- **Bold** and *italic* text
- Even other components!

</Card>
`;
```

### Works with All Editor Components

Custom components work with any rendering component:

```tsx
// With MarkdownRenderer
<MarkdownRenderer
  content={markdown}
  customComponents={customComponents}
/>

// With EditInPlaceMarkdown
<EditInPlaceMarkdown
  value={markdown}
  onChange={setMarkdown}
  customComponents={customComponents}
/>

// With MarkdownEditor
<MarkdownEditor
  value={markdown}
  onChange={setMarkdown}
  customComponents={customComponents}
/>

// With MarkdownEditorWithPreview
<MarkdownEditorWithPreview
  value={markdown}
  onChange={setMarkdown}
  customComponents={customComponents}
/>
```

### Important Notes

- Component names must be in PascalCase, following TSX naming convention (e.g., `<MyComponent />`)
- Props are always passed as strings and need parsing if you need other types
- Components support full markdown syntax inside them
- Self-closing tags work: `<Badge color="blue">text</Badge>` or `<Counter />`

## Custom Syntax Highlighting

You can use your own syntax highlighter instead of the default one:

```tsx
import { MarkdownRenderer } from '@akiwiki/markdown-editor';
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
import { useMarkdown } from '@akiwiki/markdown-editor';

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
