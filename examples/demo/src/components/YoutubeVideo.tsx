const YoutubeVideo = ({ url, width = '100%', height = '400' }: { 
	url: string; 
	width?: string | number;
	height?: string | number;
}) => {
	// Extract video ID from various YouTube URL formats
	const getVideoId = (videoUrl: string): string | null => {
		const patterns = [
			/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
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
		<div className="my-4 relative" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
			<iframe
				className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
				src={`https://www.youtube.com/embed/${videoId}`}
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</div>
	);
};

export default YoutubeVideo;
