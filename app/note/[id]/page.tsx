"use client";

import NoteBlock from "@/components/Note";
import { getNote } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

type Note = {
	id: string;
	title: string;
	content: string;
};

export default function Note({ params }: { params: Promise<{ id: string }> }) {
	const router = useRouter();
	const unwrapped = use(params);
	const [deleted, setDeleted] = useState<boolean>(false);
	const [note, setNote] = useState<Note | null>(null);

	useEffect(() => {
		getNote(unwrapped.id)
			.then((note) => {
				setNote(note.data);
			})
			.catch((err) => {
				if (err.status === 403) {
					setDeleted(true);
				} else {
					router.push("/");
				}
			});
	}, [unwrapped.id]);

	return (
		<div className="items-center self-center w-[80%] md:w-[60%] sm:w-[70%] lg:w-[60%] xl:w-[50%] h-full flex flex-col">
			{note && <NoteBlock title={note.title} content={note.content} />}
			{deleted && (
				<div className="bg-secondary p-5 rounded-xl flex flex-col w-full sm:w-[90%] md:w-[75%] lg:w-[60%] gap-y-2 mt-[10%] shadow-lg">
					<span className="text-medium bg-background rounded-md p-2">
						The note you are looking for has already been viewed and is gone for
						good.
					</span>
					<Link className="hover:underline self-center" href="/">
						Click here to create a new note
					</Link>
				</div>
			)}
		</div>
	);
}
