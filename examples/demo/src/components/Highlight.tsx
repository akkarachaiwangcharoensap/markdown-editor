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
		<span className={`px-2 py-1 ${colors[color]} border-b-2 font-medium`}>
			{children}
		</span>
	);
};

export default Highlight;
