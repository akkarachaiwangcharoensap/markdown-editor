import { useState } from 'react';
import {
	EditInPlaceMarkdown,
	EditInPlaceMarkdownCard,
	MarkdownRenderer
} from '@akiwiki/markdown-editor';
import 'katex/dist/katex.min.css';

const DEMO_CONTENT = `# Interactive Markdown Editor

Click anywhere to edit this content.

## Text Formatting

### Basic Styles
- **Bold text** for emphasis
- *Italic text* for subtle emphasis
- ~~Strikethrough~~ for corrections
- \`inline code\` for technical terms

### Lists
1. Ordered lists with numbers
2. Sequential items
   - Nested bullet points
   - Multiple levels supported

### Blockquotes
> "If a wolf howls and no one hears it, did it really howl?"
> — Anonymous

### Code Examples
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

### Tables
| Feature | Support |
|---------|---------|
| Markdown | Full |
| Math (LaTeX) | Full |
| Images | Full |
| Custom CSS | Full |

---

## Mathematical Expressions

### Inline Math
The Pythagorean theorem: $a^2 + b^2 = c^2$

Einstein's famous equation: $E = mc^2$

Quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

### Display Math
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

$$
\\frac{d}{dx}\\left(\\int_{a}^{x} f(t)\\,dt\\right) = f(x)
$$

---

## Images

![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)

*Click to edit and add your own content*
`;

const MATH_CONTENT = `# Mathematical Examples

## Algebra
Solve for x: $ax^2 + bx + c = 0$

Solution: $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$

## Calculus
$$
\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1
$$
`;

const MEDIA_CONTENT = `# Image Examples

![TypeScript Logo](https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg)

Images are automatically rendered with reasonable sizing.
`;

function App() {
	const [mainContent, setMainContent] = useState(DEMO_CONTENT);
	const [mathContent, setMathContent] = useState(MATH_CONTENT);
	const [mediaContent, setMediaContent] = useState(MEDIA_CONTENT);
	const [customStyleContent, setCustomStyleContent] = useState('# Custom Styled Heading\n\nThis content uses **custom CSS** styles!');

	const [enableMath, setEnableMath] = useState(true);
	const [enableGfm, setEnableGfm] = useState(true);
	const [activeSection, setActiveSection] = useState('demo');

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
			setActiveSection(id);
		}
	};

	return (
		<div className="min-h-screen bg-white py-8 px-4">
			<div className="max-w-7xl mx-auto flex gap-8">
				{/* Side Navigation */}
				<aside className="hidden lg:block w-48 flex-shrink-0">
					<nav className="sticky top-8 space-y-1">
						<button
							onClick={() => scrollToSection('demo')}
							className={`block w-full text-left px-3 py-2 text-sm rounded-sm transition ${activeSection === 'demo'
								? 'bg-gray-100 text-gray-900 font-medium'
								: 'text-gray-600 hover:bg-gray-50'
								}`}
						>
							Interactive Demo
						</button>
						<button
							onClick={() => scrollToSection('cards')}
							className={`block w-full text-left px-3 py-2 text-sm rounded-sm transition ${activeSection === 'cards'
								? 'bg-gray-100 text-gray-900 font-medium'
								: 'text-gray-600 hover:bg-gray-50'
								}`}
						>
							Card Components
						</button>
						<button
							onClick={() => scrollToSection('custom-styling')}
							className={`block w-full text-left px-3 py-2 text-sm rounded-sm transition ${activeSection === 'custom-styling'
								? 'bg-gray-100 text-gray-900 font-medium'
								: 'text-gray-600 hover:bg-gray-50'
								}`}
						>
							Custom Styling
						</button>
						<button
							onClick={() => scrollToSection('usage')}
							className={`block w-full text-left px-3 py-2 text-sm rounded-sm transition ${activeSection === 'usage'
								? 'bg-gray-100 text-gray-900 font-medium'
								: 'text-gray-600 hover:bg-gray-50'
								}`}
						>
							Usage
						</button>
						<button
							onClick={() => scrollToSection('syntax-highlighting')}
							className={`block w-full text-left px-3 py-2 text-sm rounded-sm transition ${activeSection === 'syntax-highlighting'
								? 'bg-gray-100 text-gray-900 font-medium'
								: 'text-gray-600 hover:bg-gray-50'
								}`}
						>
							Syntax Highlighting
						</button>
						<button
							onClick={() => scrollToSection('features')}
							className={`block w-full text-left px-3 py-2 text-sm rounded-sm transition ${activeSection === 'features'
								? 'bg-gray-100 text-gray-900 font-medium'
								: 'text-gray-600 hover:bg-gray-50'
								}`}
						>
							Features
						</button>
					</nav>
				</aside>

				{/* Main Content */}
				<div className="flex-1 max-w-4xl">
					{/* Header */}
					<div className="mb-8">
						<h1 className="text-4xl font-light mb-3 text-gray-900">
							Markdown Editor
						</h1>
						<p className="text-lg text-gray-600 mb-2">
							A minimal, extensible markdown editor with LaTeX support
						</p>

						<div className="flex gap-3">
							<button
								onClick={() => setEnableMath(!enableMath)}
								className={`px-4 py-2 text-sm border rounded-sm transition ${enableMath
									? 'border-gray-900 text-gray-900 bg-gray-50'
									: 'border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
									}`}
							>
								Math: {enableMath ? 'On' : 'Off'}
							</button>

							<button
								onClick={() => setEnableGfm(!enableGfm)}
								className={`px-4 py-2 text-sm border rounded-sm transition ${enableGfm
									? 'border-gray-900 text-gray-900 bg-gray-50'
									: 'border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
									}`}
							>
								GFM: {enableGfm ? 'On' : 'Off'}
							</button>
						</div>
					</div>

					{/* Feature Highlights */}
					<div className="grid md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-200">
						<div>
							<h3 className="text-sm font-medium mb-2 text-gray-900">Click to Edit</h3>
							<p className="text-sm text-gray-600 leading-relaxed">Inline editing with automatic save on blur</p>
						</div>
						<div>
							<h3 className="text-sm font-medium mb-2 text-gray-900">LaTeX Support</h3>
							<p className="text-sm text-gray-600 leading-relaxed">Render mathematical expressions inline and as blocks</p>
						</div>
						<div>
							<h3 className="text-sm font-medium mb-2 text-gray-900">Customizable</h3>
							<p className="text-sm text-gray-600 leading-relaxed">Apply custom styles to any element</p>
						</div>
					</div>

					{/* Main Demo */}
					<section id="demo" className="mb-8">
						<h2 className="text-2xl font-light mb-6 text-gray-900">Interactive Demo</h2>
						<div className="border border-gray-200 rounded-md">
							<div className="p-8">
								<EditInPlaceMarkdown
									value={mainContent}
									onChange={setMainContent}
									enableMath={enableMath}
									enableGfm={enableGfm}
									showEditIcon={false}
									emptyText="Click to start writing"
								/>
							</div>
						</div>
					</section>

					{/* Card Examples */}
					<section id="cards" className="mb-8 pb-8 border-b border-gray-200">
						<h2 className="text-2xl font-light mb-6 text-gray-900">
							Card Components
						</h2>
						<p className="text-gray-600 mb-8 text-sm">
							Pre-styled components with headers and save indicators
						</p>

						<div className="grid md:grid-cols-2 gap-6">
							<EditInPlaceMarkdownCard
								title="Mathematical Expressions"
								value={mathContent}
								onChange={setMathContent}
								enableMath={enableMath}
								enableGfm={enableGfm}
								showSaveIndicator={true}
								emptyText="Add mathematical formulas"
							/>

							<EditInPlaceMarkdownCard
								title="Images"
								value={mediaContent}
								onChange={setMediaContent}
								enableMath={enableMath}
								enableGfm={enableGfm}
								showSaveIndicator={true}
								emptyText="Add images"
							/>
						</div>
					</section>

					{/* Custom Styling */}
					<section id="custom-styling" className="mb-8 pb-8 border-b border-gray-200">
						<h2 className="text-2xl font-light mb-6 text-gray-900">
							Custom Styling
						</h2>
						<p className="text-gray-600 mb-8 text-sm">
							Override default styles with custom CSS classes
						</p>

						<div className="grid md:grid-cols-2 gap-6">
							<div className="border border-gray-200 rounded-md p-6">
								<h3 className="text-sm font-medium mb-4 text-gray-700">Default</h3>
								<MarkdownRenderer
									content={customStyleContent}
									enableMath={enableMath}
									enableGfm={enableGfm}
								/>
							</div>

							<div className="border border-gray-200 rounded-md p-6 bg-gray-50">
								<h3 className="text-sm font-medium mb-4 text-gray-700">Custom</h3>
								<MarkdownRenderer
									content={customStyleContent}
									enableMath={enableMath}
									enableGfm={enableGfm}
									styles={{
										h1: 'text-3xl font-light text-gray-900 mb-4',
										p: 'text-gray-700',
										strong: 'font-semibold text-gray-900',
									}}
								/>
							</div>
						</div>

						<div className="mt-6">
							<h3 className="text-gray-900 mb-3">Example Usage</h3>
							<div className="rounded-md overflow-hidden">
								<MarkdownRenderer
									content={"```tsx\n<MarkdownRenderer\n  content={content}\n  styles={{\n    h1: 'text-3xl font-light text-gray-900 mb-4',\n    p: 'text-gray-700',\n    strong: 'font-semibold text-gray-900'\n  }}\n/>\n```"}
									enableGfm={true}
								/>
							</div>
						</div>
					</section>

					{/* Usage */}
					<section id="usage" className="mb-8 pb-8 border-b border-gray-200">
						<h2 className="text-2xl font-light mb-6 text-gray-900">Usage</h2>

						<div className="space-y-8">
							<div>
								<h3 className="text-gray-900">Click-to-Edit Component</h3>
								<div className="rounded-md overflow-hidden">
									<MarkdownRenderer
										content={"```tsx\nimport { EditInPlaceMarkdown } from '@akiwiki/markdown-editor';\n\nfunction MyComponent() {\n  const [content, setContent] = useState('# Hello World');\n  \n  return (\n    <EditInPlaceMarkdown\n      value={content}\n      onChange={setContent}\n      enableMath={true}\n      enableGfm={true}\n    />\n  );\n}\n```"}
										enableGfm={true}
									/>
								</div>
							</div>

							<div>
								<h3 className="text-gray-900">Card Component</h3>
								<div className="rounded-md overflow-hidden">
									<MarkdownRenderer
										content={"```tsx\nimport { EditInPlaceMarkdownCard } from '@akiwiki/markdown-editor';\n\n<EditInPlaceMarkdownCard\n  title=\"Notes\"\n  value={content}\n  onChange={setContent}\n  showSaveIndicator={true}\n/>\n```"}
										enableGfm={true}
									/>
								</div>
							</div>

							<div>
								<h3 className="text-gray-900">Renderer Only</h3>
								<div className="rounded-md overflow-hidden">
									<MarkdownRenderer
										content={"```tsx\nimport { MarkdownRenderer } from '@akiwiki/markdown-editor';\n\n<MarkdownRenderer\n  content={markdownContent}\n  enableMath={true}\n  enableGfm={true}\n/>\n```"}
										enableGfm={true}
									/>
								</div>
							</div>
						</div>
					</section>

					{/* Custom Syntax Highlighting */}
					<section id="syntax-highlighting" className="mb-8 pb-8 border-b border-gray-200">
						<h2 className="text-2xl font-light mb-6 text-gray-900">
							Custom Syntax Highlighting
						</h2>
						<p className="text-gray-600 mb-8 text-sm">
							Apply custom CSS classes to code blocks via the syntaxHighlighter prop
						</p>

						<div className="grid md:grid-cols-2 gap-6">
							<div className="border border-gray-200 rounded-md p-6">
								<h3 className="text-sm font-medium mb-4 text-gray-700">Default (text-sm)</h3>
								<MarkdownRenderer
									content={"```javascript\nfunction add(a, b) {\n  return a + b;\n}\n```"}
									enableGfm={true}
								/>
							</div>

							<div className="border border-gray-200 rounded-md p-6 bg-gray-50">
								<h3 className="text-sm font-medium mb-4 text-gray-700">Custom (text-xs)</h3>
								<MarkdownRenderer
									content={"```javascript\nfunction add(a, b) {\n  return a + b;\n}\n```"}
									enableGfm={true}
									syntaxHighlighter={{
										className: 'text-xs leading-relaxed'
									}}
								/>
							</div>
						</div>

						<div className="mt-6">
							<h3 className="text-gray-900 mb-3">Example Usage</h3>
							<div className="rounded-md overflow-hidden">
								<MarkdownRenderer
									content={"```tsx\n<MarkdownRenderer\n  content={code}\n  syntaxHighlighter={{\n    className: 'text-xs leading-tight'\n  }}\n/>\n```"}
									enableGfm={true}
								/>
							</div>
						</div>
					</section>

					{/* Features */}
					<section id="features" className="mb-8">
						<h2 className="text-2xl font-light mb-6 text-gray-900">Features</h2>
						<div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
							<div className="flex items-start gap-3">
								<span className="text-gray-400 mt-0.5">→</span>
								<div>
									<h4 className="font-medium text-gray-900">GitHub Flavored Markdown</h4>
									<p className="text-gray-600">Tables, strikethrough, task lists</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<span className="text-gray-400 mt-0.5">→</span>
								<div>
									<h4 className="font-medium text-gray-900">LaTeX Math</h4>
									<p className="text-gray-600">Inline and display equations</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<span className="text-gray-400 mt-0.5">→</span>
								<div>
									<h4 className="font-medium text-gray-900">Images</h4>
									<p className="text-gray-600">Automatic sizing and rendering</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<span className="text-gray-400 mt-0.5">→</span>
								<div>
									<h4 className="font-medium text-gray-900">Custom Styles</h4>
									<p className="text-gray-600">CSS class overrides</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<span className="text-gray-400 mt-0.5">→</span>
								<div>
									<h4 className="font-medium text-gray-900">TypeScript</h4>
									<p className="text-gray-600">Full type definitions</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<span className="text-gray-400 mt-0.5">→</span>
								<div>
									<h4 className="font-medium text-gray-900">Auto-resize</h4>
									<p className="text-gray-600">Editor adapts to content</p>
								</div>
							</div>
						</div>
					</section>

					{/* Footer */}
					<footer className="text-center text-gray-500 py-12 text-sm">
						<p>Built with React and TypeScript by Aki with ❤️ with the help of LLM.</p>
					</footer>
				</div>
			</div>
		</div>
	);
}

export default App;
