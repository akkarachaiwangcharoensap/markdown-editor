import { useState, useEffect } from 'react';
import {
	EditInPlaceMarkdown,
	EditInPlaceMarkdownCard,
	MarkdownRenderer
} from '@akiwiki/markdown-editor';
import 'katex/dist/katex.min.css';
import { customComponents } from './CustomComponents';

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

const COMPONENT_INJECTION_CONTENT = `# Custom Component Injection

Inject interactive React components directly into your markdown using PascalCase syntax.

<Tabs>

<Tab label="Output">

<Counter initial="0" step="1" label="Click Counter" />

<ProgressBar value="75" max="100" color="blue" label="Progress" />

<Alert type="info">
Use **custom components** with full markdown support inside!
</Alert>

<Card title="📦 Example Card">

Cards can contain any markdown content:
- Lists and formatting
- \`print("hello world")\`
- Even other components!

</Card>

Mix <Badge color="blue">badges</Badge> with your text.

<Highlight color="yellow">Highlighted text</Highlight> can draw attention to important content.

<YoutubeVideo url="dQw4w9WgXcQ" height="315" />

<Collapsible title="Collapsible" defaultOpen="false">

This content is hidden by default. Click to expand!

- Collapsible sections
- **Markdown** support inside
- Perfect for FAQs and documentation

</Collapsible>

</Tab>

<Tab label="Source">

\`\`\`markdown
<Counter initial="0" step="1" label="Click Counter" />

<ProgressBar value="75" max="100" color="blue" label="Progress" />

<Alert type="info">
Use **custom components** with full markdown support inside!
</Alert>

<Card title="📦 Example Card">

Cards can contain any markdown content:
- Lists and formatting
- \\\`print("hello world")\\\`
- Even other components!

</Card>

Mix <Badge color="blue">badges</Badge> with your text.

<Highlight color="yellow">Highlighted text</Highlight> can draw attention to important content.

<YoutubeVideo url="dQw4w9WgXcQ" height="315" />

<Collapsible title="Collapsible" defaultOpen="false">

This content is hidden by default. Click to expand!

- Collapsible sections
- **Markdown** support inside
- Perfect for FAQs and documentation

</Collapsible>
\`\`\`

</Tab>


<Tab label="Counter.tsx">

\`\`\`tsx
import { useState } from 'react';

const Counter = (props: any) => {
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

export default Counter;
\`\`\`

</Tab>

<Tab label="ProgressBar.tsx">

\`\`\`tsx
const ProgressBar = (props: any) => {
  const { value = '0', max = '100', color = 'blue', label } = props;
  
  const numValue = parseFloat(String(value)) || 0;
  const numMax = parseFloat(String(max)) || 100;
  
  const percentage = Math.min(100, Math.max(0, (numValue / numMax) * 100));
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600',
    purple: 'bg-purple-600',
  };
  
  return (
    <div className="my-4">
      {label && <div className="text-sm font-medium mb-2">{label}</div>}
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div 
          className={\`h-full \${colorClasses[color]} transition-all\`}
          style={{ width: \`\${percentage}%\` }}
        >
          <span className="text-xs text-white font-semibold">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
\`\`\`

</Tab>

<Tab label="Alert.tsx">

\`\`\`tsx
const Alert = ({ children, type = 'info' }: { 
  children: React.ReactNode; 
  type?: 'info' | 'warning' | 'error' | 'success' 
}) => {
  const colors = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
  };

  return (
    <div className={\`p-4 border-l-4 rounded \${colors[type]} my-4\`}>
      {children}
    </div>
  );
};

export default Alert;
\`\`\`

</Tab>

<Tab label="Card.tsx">

\`\`\`tsx
const Card = ({ children, title }: { 
  children: React.ReactNode; 
  title?: string 
}) => (
  <div className="border rounded-lg p-6 my-4 shadow-sm bg-white">
    {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
    <div className="text-gray-700">{children}</div>
  </div>
);

export default Card;
\`\`\`

</Tab>

<Tab label="Badge.tsx">

\`\`\`tsx
const Badge = ({ children, color = 'blue' }: { 
  children: React.ReactNode; 
  color?: string 
}) => (
  <span className={\`inline-block px-3 py-1 text-sm font-semibold 
    rounded-full bg-\${color}-100 text-\${color}-800 mx-1\`}>
    {children}
  </span>
);

export default Badge;
\`\`\`

</Tab>

<Tab label="Highlight.tsx">

\`\`\`tsx
const Highlight = ({ children, color = 'yellow' }: { 
  children: React.ReactNode; 
  color?: 'yellow' | 'pink' | 'green' | 'blue' 
}) => {
  const colors = {
    yellow: 'bg-yellow-200 border-yellow-400',
    pink: 'bg-pink-200 border-pink-400',
    green: 'bg-green-200 border-green-400',
    blue: 'bg-blue-200 border-blue-400',
  };
  
  return (
    <span className={\`px-2 py-1 \${colors[color]} border-b-2 font-medium\`}>
      {children}
    </span>
  );
};

export default Highlight;
\`\`\`

</Tab>

<Tab label="YoutubeVideo.tsx">

\`\`\`tsx
const YoutubeVideo = ({ url, width = '100%', height = '400' }: { 
  url: string; 
  width?: string | number;
  height?: string | number;
}) => {
  // Extract video ID from various YouTube URL formats
  const getVideoId = (videoUrl: string): string | null => {
    const patterns = [
      /(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/|youtube\\.com\\/embed\\/)([^&\\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
    ];
    
    for (const pattern of patterns) {
      const match = videoUrl.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const videoId = getVideoId(url);

  if (!videoId) {
    return (
      <div className="my-4 p-4 border border-red-300 bg-red-50 rounded text-red-800">
        Invalid YouTube URL: {url}
      </div>
    );
  }

  return (
    <div className="my-4 aspect-video w-full max-w-2xl">
      <iframe
        width={width}
        height={height}
        src={\`https://www.youtube.com/embed/\${videoId}\`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg shadow-lg"
      />
    </div>
  );
};

export default YoutubeVideo;
\`\`\`

</Tab>

<Tab label="Collapsible.tsx">

\`\`\`tsx
import { useState } from 'react';

const Collapsible = ({ children, title, defaultOpen = false }: { 
  children: React.ReactNode; 
  title: string; 
  defaultOpen?: boolean | string;
}) => {
  // Parse boolean prop (comes as string from markdown)
  const initialOpen = typeof defaultOpen === 'string' 
    ? defaultOpen === 'true' || defaultOpen === 'True' || defaultOpen === '1'
    : defaultOpen;
  
  const [isOpen, setIsOpen] = useState(initialOpen);
  
  return (
    <div className="border border-gray-300 rounded-lg my-4 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-left font-medium transition"
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

export default Collapsible;
\`\`\`

</Tab>

</Tabs>
`;

function App() {
	const [mainContent, setMainContent] = useState(DEMO_CONTENT);
	const [mathContent, setMathContent] = useState(MATH_CONTENT);
	const [mediaContent, setMediaContent] = useState(MEDIA_CONTENT);
	const [componentContent, setComponentContent] = useState(COMPONENT_INJECTION_CONTENT);
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

	// Update active section on scroll
	useEffect(() => {
		const sectionIds = ['demo', 'cards', 'custom-styling', 'component-injection', 'usage', 'syntax-highlighting', 'features'];

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{
				rootMargin: '-20% 0px -70% 0px', // Trigger when section is in the upper portion of viewport
				threshold: 0
			}
		);

		// Observe all sections
		sectionIds.forEach((id) => {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		});

		return () => {
			sectionIds.forEach((id) => {
				const element = document.getElementById(id);
				if (element) {
					observer.unobserve(element);
				}
			});
		};
	}, []);

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
							onClick={() => scrollToSection('component-injection')}
							className={`block w-full text-left px-3 py-2 text-sm rounded-sm transition ${activeSection === 'component-injection'
								? 'bg-gray-100 text-gray-900 font-medium'
								: 'text-gray-600 hover:bg-gray-50'
								}`}
						>
							Custom Component Injection
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

					{/* Component Injection */}
					<section id="component-injection" className="mb-8 pb-8 border-b border-gray-200">
						<h2 className="text-2xl font-light mb-6 text-gray-900">
							Custom Component Injection
						</h2>
						<p className="text-gray-600 mb-8 text-sm">
							Inject custom React components directly into your markdown for enhanced interactivity
						</p>

						<div className="border border-gray-200 rounded-md">
							<div className="p-8">
								<MarkdownRenderer
									content={componentContent}
									enableMath={enableMath}
									enableGfm={enableGfm}
									customComponents={customComponents}
								/>
							</div>
						</div>

						<div className="mt-6">
							<h3 className="text-gray-900 mb-3">Example Usage</h3>
							<div className="rounded-md overflow-hidden">
								<MarkdownRenderer
									content={"```tsx\n// Define your custom components\nconst Alert = ({ children, type }) => (\n  <div className={`alert alert-${type}`}>\n    {children}\n  </div>\n);\n\n// Pass them to the editor\n<MarkdownRenderer\n  content={markdown}\n  customComponents={{\n    Alert,\n    Badge,\n    Card,\n  }}\n/>\n\n// Use them in markdown\n<Alert type=\"info\">\n  This is a custom component!\n</Alert>\n```"}
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
				</div>
			</div>

			{/* Footer */}
			<footer className="text-center text-gray-500 py-12 text-sm max-w-7xl mx-auto">
				<p>Built with React and TypeScript by Aki with ❤️ with the help of LLM.</p>
			</footer>
		</div>
	);
}

export default App;
