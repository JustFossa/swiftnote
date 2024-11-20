"use client";

import NoteBlock from "@/components/Note";
import { getNote } from "@/utils/api";
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
	const [note, setNote] = useState<Note | null>(null);

	useEffect(() => {
		getNote(unwrapped.id)
			.then((note) => {
				setNote(note.data);
			})
			.catch((err) => {
				router.push("/");
			});
	}, [unwrapped.id]);

	return (
		<div className="items-center self-center w-[80%] md:w-[60%] sm:w-[70%] lg:w-[60%] xl:w-[50%] h-full flex flex-col">
			{note && <NoteBlock title={note.title} content={note.content} />}
		</div>
	);
}
