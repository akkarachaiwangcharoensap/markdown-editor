const ProgressBar = (props: any) => {
	const { value = '0', max = '100', color = 'blue', label, children, ...rest } = props;
	
	// Parse props to numbers (they come as strings from markdown)
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
			{label && <div className="text-sm font-medium mb-2 text-gray-700">{label}</div>}
			<div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
				<div 
					className={`h-full ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue} transition-all duration-300 flex items-center justify-end pr-2`}
					style={{ width: `${percentage}%` }}
				>
					<span className="text-xs text-white font-semibold">{Math.round(percentage)}%</span>
				</div>
			</div>
		</div>
	);
};

export default ProgressBar;
