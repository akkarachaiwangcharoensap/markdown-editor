import { useState } from 'react';

const Counter = (props: any) => {
	const { initial = '0', step = '1', label, children, ...rest } = props;
	
	// Parse props to numbers (they come as strings from markdown)
	const initialValue = parseInt(String(initial), 10) || 0;
	const stepValue = parseInt(String(step), 10) || 1;
	
	const [count, setCount] = useState(initialValue);
	
	return (
		<div className="inline-flex items-center gap-3 p-4 border border-gray-300 rounded-lg bg-white my-2">
			{label && <span className="font-medium text-gray-700">{label}:</span>}
			<button 
				onClick={() => setCount(count - stepValue)}
				className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded font-bold transition"
			>
				−
			</button>
			<span className="text-2xl font-bold text-gray-900 min-w-[3rem] text-center">{count}</span>
			<button 
				onClick={() => setCount(count + stepValue)}
				className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded font-bold transition"
			>
				+
			</button>
		</div>
	);
};

export default Counter;
