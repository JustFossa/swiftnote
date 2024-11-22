export default function NoteBlock({
	title,
	content,
}: {
	title: string;
	content: string;
}) {
	return (
		<div className="bg-secondary p-5 rounded-xl flex flex-col w-full sm:w-[90%] md:w-[75%] lg:w-[60%] gap-y-2 mt-[10%] shadow-lg">
			<h1 className="text-3xl font-extrabold bg-background rounded-md p-2">
				{title}
			</h1>
			<span className="mt-2 text-medium bg-background rounded-md p-2">
				{renderWithNewLines(content)}
			</span>
		</div>
	);
}

const renderWithNewLines = (text: string) => {
	return text.split("\n").map((line, i) => {
		return (
			<span key={i}>
				{line}
				<br />
			</span>
		);
	});
};
