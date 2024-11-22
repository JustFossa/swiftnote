import axios from "axios";

export const createNote = async (title: string, content: string) => {
	const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/note`, {
		title,
		content,
	});
	return data;
};

export const getNote = async (id: string) => {
	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/note/${id}`
	);
	return data;
};
