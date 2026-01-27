import { useState, Children, isValidElement, useRef } from 'react';

// Tab component - simple wrapper that accepts label and children
export const Tab = ({ children, label }: { children: React.ReactNode; label?: string }) => {
	return <>{children}</>;
};

const Tabs = ({ children }: { children: React.ReactNode }) => {
	const [activeTab, setActiveTab] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const tabsRef = useRef<HTMLDivElement>(null);
	
	// Filter to only get actual Tab components, ignoring text nodes and other elements
	const tabs = Children.toArray(children).filter(child => 
		isValidElement(child) && (child.type === Tab || (child.type as any)?.name === 'Tab')
	);
	
	// Extract labels from Tab components
	const tabLabels = tabs.map((child, index) => {
		if (isValidElement(child) && child.props) {
			const childLabel = (child.props as any).label;
			if (childLabel) return String(childLabel);
		}
		return `Tab ${index + 1}`;
	});
	
	// Drag-to-scroll handlers
	const handleMouseDown = (e: React.MouseEvent) => {
		if (!tabsRef.current) return;
		setIsDragging(true);
		setStartX(e.pageX - tabsRef.current.offsetLeft);
		setScrollLeft(tabsRef.current.scrollLeft);
	};
	
	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || !tabsRef.current) return;
		e.preventDefault();
		const x = e.pageX - tabsRef.current.offsetLeft;
		const walk = (x - startX) * 1; // Scroll speed multiplier
		tabsRef.current.scrollLeft = scrollLeft - walk;
	};
	
	const handleMouseUp = () => {
		setIsDragging(false);
	};
	
	const handleMouseLeave = () => {
		setIsDragging(false);
	};
	
	return (
		<div className="border border-gray-300 rounded-lg my-4 overflow-hidden">
			<div 
				ref={tabsRef}
				className={`flex border-b border-gray-300 bg-gray-50 overflow-x-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseLeave}
				style={{ scrollbarWidth: 'thin' }}
			>
				{tabs.map((_, index) => (
					<button
						key={index}
						onClick={() => setActiveTab(index)}
						className={`px-4 py-2 font-medium transition whitespace-nowrap ${
							activeTab === index 
								? 'bg-white border-b-2 border-blue-600 text-blue-600' 
								: 'text-gray-600 hover:text-gray-900'
						}`}
					>
						{tabLabels[index]}
					</button>
				))}
			</div>
			<div className="p-4 bg-white">
				{tabs[activeTab]}
			</div>
		</div>
	);
};

export default Tabs;
