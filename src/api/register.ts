import axios from "axios";
import qs from "qs";

export const postRegister = (params: any): Promise<any> => {
	return axios
		.post(`https://vkontakte-network-backend-ec6s.vercel.app/auth/register`, qs.stringify(params))
		.then((response) => response.data)
		.catch((error) => error);
};

export const uploadAvatar = (dataImage: any): Promise<{ url: string }> => {
	return axios
		.post("https://vkontakte-network-backend-ec6s.vercel.app/uploadAvatar", dataImage)
		.then((response) => response.data)
		.catch((error) => error);
};
