import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const createNote = async (title: string, content: string) => {
	const { data } = await api.post("/note", { title, content });
	return data;
};

export const getNote = async (id: string) => {
	const { data } = await api.get(`/note/${id}`);
	return data;
};
