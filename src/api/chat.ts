import axios from "axios";
import qs from "qs";
import { AddChatType, ChatType } from "../types/ChatType";

export const addChat = (params: AddChatType): Promise<any> => {
	return axios
		.post(
			`https://vkontakte-network-backend-ec6s.vercel.app/chat`,
			qs.stringify(params)
		)
		.then((response) => response.data)
		.catch((error) => error);
};

export const getChats = (id: string): Promise<ChatType> => {
	return axios
		.get(`https://vkontakte-network-backend-ec6s.vercel.app/chat/${id}`)
		.then((response) => response.data)
		.catch((error) => error);
};
