export default function Slide1() {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<h1 className="text-5xl font-bold text-white mb-6">Introduction to JavaScript</h1>
			<img
				src={`${process.env.PUBLIC_URL}/images/logo-javascript.svg`}
				alt="JavaScript Logo"
				className="w-36 h-36 mt-12"
			/>
		</div>
	);
}
