const Card = ({ children, title }: { children: React.ReactNode; title?: string }) => (
	<div className="border border-gray-200 rounded-lg p-6 my-4 shadow-sm bg-white">
		{title && <h3 className="text-lg font-semibold mb-3 text-gray-900">{title}</h3>}
		<div className="text-gray-700">{children}</div>
	</div>
);

export default Card;
