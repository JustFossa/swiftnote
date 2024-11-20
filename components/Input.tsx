"use client";

import { createNote } from "@/utils/api";
import Link from "next/link";
import { useState } from "react";

type Note = {
	id: string;
};

export default function Input() {
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [disabled, setDisabled] = useState<boolean>(true);
	const [note, setNote] = useState<Note | null>(null);
	const [isCopied, setIsCopied] = useState<boolean>(false);

	if (title.length > 0 && content.length > 0 && disabled) setDisabled(false);
	if ((title.length === 0 || content.length === 0) && !disabled)
		setDisabled(true);

	const onSubmit = async () => {
		const noteRes = await createNote(title, content);
		setNote({
			id: noteRes.data.id,
		});
		setContent("");
		setTitle("");
		setDisabled(true);
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(
			`${process.env.NEXT_PUBLIC_CLIENT_URL}/note/${note!.id}`
		);
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 2000);
	};

	return (
		<div className="bg-secondary p-5 rounded-xl flex flex-col w-full sm:w-[90%] md:w-[75%] lg:w-[60%] gap-y-2 mt-[10%]">
			<h1 className="text-3xl font-extrabold ">New note</h1>
			<span className="mt-2 font-bold text-xl">Title</span>
			<input
				type="text"
				className="bg-background rounded-lg ring-0 outline-none p-2 font-medium"
				required
				onChange={(e) => setTitle(e.target.value)}
			></input>
			<span className="mt-2 font-bold text-xl">Content</span>
			<textarea
				className="bg-background rounded-lg ring-0 outline-none p-2 font-medium max-h-[200px]"
				rows={5}
				maxLength={512}
				required
				onChange={(e) => setContent(e.target.value)}
			></textarea>
			<button
				disabled={disabled}
				type="submit"
				onClick={onSubmit}
				className="bg-foreground disabled:opacity-50 hover:opacity-50 text-background text-xl font-medium p-2 rounded-lg mt-2 transition-all duration-300 ease-in-out"
			>
				Create
			</button>
			{note && (
				<div className="mt-2 flex flex-col">
					<span className="font-bold text-xl">Note created!</span>
					<Link
						className="text-blue-600 hover:underline"
						href={`/note/${note.id}`}
					>
						{process.env.NEXT_PUBLIC_CLIENT_URL}/note/{note.id}
					</Link>
					<button
						onClick={copyToClipboard}
						className="self-start hover:opacity-50"
					>
						{isCopied ? "Copied!" : "Click here to copy link"}
					</button>
				</div>
			)}
		</div>
	);
}
