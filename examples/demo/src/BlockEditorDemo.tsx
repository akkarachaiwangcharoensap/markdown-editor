import { useState } from 'react';
import { BlockMarkdownEditor } from '../../../src';
import 'katex/dist/katex.min.css';

const INITIAL_CONTENT = `# Welcome to Block Editor

This is a paragraph. Click on any block to edit it.

## Features

Press Enter at the end of a line to create a new block.

Press Backspace on an empty block to delete it.

## Math Support

The quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$

$$
E = mc^2
$$

## Code Example

\`\`\`typescript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> Click any block to start editing!`;

export function BlockEditorDemo() {
    const [content, setContent] = useState(INITIAL_CONTENT);
    const [showRaw, setShowRaw] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Block-Based Markdown Editor</h1>
                    <p className="text-gray-600 mb-4">
                        Notion-like WYSIWYG markdown editing with individual block editing
                    </p>

                    <button
                        onClick={() => setShowRaw(!showRaw)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        {showRaw ? 'Hide' : 'Show'} Raw Markdown
                    </button>
                </div>

                {showRaw && (
                    <div className="mb-6 bg-gray-900 text-gray-100 p-4 rounded-lg">
                        <pre className="text-sm overflow-x-auto whitespace-pre-wrap">{content}</pre>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <BlockMarkdownEditor
                        value={content}
                        onChange={setContent}
                        enableMath={true}
                        enableGfm={true}
                        placeholder="Start typing or click to edit..."
                    />
                </div>

                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-bold mb-3">Keyboard Shortcuts</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-3">
                            <kbd className="px-2 py-1 bg-white rounded shadow-sm">Enter</kbd>
                            <span>Create new block (when at end of line)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <kbd className="px-2 py-1 bg-white rounded shadow-sm">Ctrl + Enter</kbd>
                            <span>Save and exit edit mode</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <kbd className="px-2 py-1 bg-white rounded shadow-sm">Esc</kbd>
                            <span>Cancel editing</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <kbd className="px-2 py-1 bg-white rounded shadow-sm">Backspace</kbd>
                            <span>Delete empty block / merge with previous</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <details className="bg-white rounded-lg p-6">
                        <summary className="font-semibold cursor-pointer">📄 View Code</summary>
                        <pre className="mt-4 bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                            {`import { BlockMarkdownEditor } from '@yourname/markdown-editor';

function App() {
  const [content, setContent] = useState('');
  
  return (
    <BlockMarkdownEditor
      value={content}
      onChange={setContent}
      enableMath={true}
      enableGfm={true}
      placeholder="Start writing..."
    />
  );
}`}
                        </pre>
                    </details>
                </div>
            </div>
        </div>
    );
}
