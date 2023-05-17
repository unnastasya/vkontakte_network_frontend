import axios from "axios";
import qs from "qs";
import { RegisterUserType } from "../types/UserType";

export const postRegister = (params: RegisterUserType): Promise<any> => {
	return axios
		.post(
			`https://vkontakte-network-backend-ec6s.vercel.app/auth/register`,
			qs.stringify(params)
		)
		.then((response) => response.data)
		.catch((error) => error);
};

export const uploadAvatar = (dataImage: any): Promise<{ url: string }> => {
	return axios
		.post(
			"https://vkontakte-network-backend-ec6s.vercel.app/uploadAvatar",
			dataImage
		)
		.then((response) => response.data)
		.catch((error) => error);
};
