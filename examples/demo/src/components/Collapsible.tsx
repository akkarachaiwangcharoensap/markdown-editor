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
