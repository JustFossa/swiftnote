"use client";

import { createNote } from "@/utils/api";
import Link from "next/link";
import { useState } from "react";
import copy from "@/public/copy.svg";
import Image from "next/image";
import { FaCopy } from "react-icons/fa";

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
		console.log(content);
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
		<div className="bg-secondary p-5 rounded-xl flex flex-col w-full sm:w-[90%] md:w-[75%] lg:w-[60%] gap-y-2 mt-[10%] shadow-xl select-none">
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
			<div className="flex flex-row gap-2">
				<button
					disabled={disabled}
					type="submit"
					onClick={onSubmit}
					className="bg-foreground disabled:opacity-50 hover:opacity-50 text-background text-xl font-medium p-2 rounded-lg mt-2 transition-all duration-300 ease-in-out w-full"
				>
					Create
				</button>
				{note && (
					<button
						onClick={copyToClipboard}
						className="flex flex-row items-center justify-around text-white w-[50%] bg-background border-foreground border disabled:opacity-50 hover:opacity-50 text-background text-xl font-medium p-2 rounded-lg mt-2 transition-all duration-300 ease-in-out"
					>
						{!isCopied ? (
							<>
								<FaCopy />{" "}
								<span className="sm:block hidden text-xl">Copy Link</span>
							</>
						) : (
							"Copied!"
						)}
					</button>
				)}
			</div>
		</div>
	);
}
