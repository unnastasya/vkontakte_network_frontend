import axios from "axios";
import qs from "qs";

export const addMessage = (params: any): Promise<any> => {
	const { chatId, ...MessageParams } = params;
	return axios
		.post(`https://vkontakte-network-backend-ec6s.vercel.app/message/${chatId}`, qs.stringify(MessageParams))
		.then((response) => response.data)
		.catch((error) => error);
};

export const getMessages = (id: string): Promise<any> => {
	return axios
		.get(`https://vkontakte-network-backend-ec6s.vercel.app/message/${id}`)
		.then((response) => response.data)
		.catch((error) => error);
};