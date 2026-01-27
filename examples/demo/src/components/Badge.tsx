const Badge = ({ children, color = 'blue' }: { children: React.ReactNode; color?: string }) => (
	<span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full bg-${color}-100 text-${color}-800 mx-1`}>
		{children}
	</span>
);

export default Badge;
