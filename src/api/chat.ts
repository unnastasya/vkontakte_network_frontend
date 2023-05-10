import axios from "axios";
import qs from "qs";

export const addChat = (params: any): Promise<any> => {
	return axios
		.post(
			`https://vkontakte-network-backend-ec6s.vercel.app/chat`,
			qs.stringify(params)
		)
		.then((response) => response.data)
		.catch((error) => error);
};

export const getChats = (id: string): Promise<any> => {
	return axios
		.get(`https://vkontakte-network-backend-ec6s.vercel.app/chat/${id}`)
		.then((response) => response.data)
		.catch((error) => error);
};
