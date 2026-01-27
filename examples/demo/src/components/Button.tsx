const Button = ({ children, onClick, variant = 'primary' }: { children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' }) => {
	const styles = variant === 'primary' 
		? 'bg-blue-600 hover:bg-blue-700 text-white' 
		: 'bg-gray-200 hover:bg-gray-300 text-gray-800';
	
	return (
		<button 
			onClick={onClick} 
			className={`px-4 py-2 rounded font-medium transition ${styles}`}
		>
			{children}
		</button>
	);
};

export default Button;
