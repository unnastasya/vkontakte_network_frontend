import axios from "axios";
import qs from "qs";
import { UserType } from "../types/UserType";


export const postLogin = (params: { email: string; password: string }): Promise<UserType> => {
	return axios
		.post<UserType>(`https://vkontakte-network-backend-ec6s.vercel.app/auth/login`, qs.stringify(params), {
			headers: {
				authorization: window.localStorage.getItem("activeUserId"),
			},
		})
		.then((response) => response.data)
		.catch((error) => error);
};

export const getUser = (id: string): Promise<UserType> => {
	return axios
		.get(`https://vkontakte-network-backend-ec6s.vercel.app/user/${id}`, {
			headers: {
				authorization: window.localStorage.getItem("activeUserId"),
			},
		})
		.then((response) => response.data)
		.catch((error) => error);
};

export const postAuthMe = (): Promise<UserType> => {
	return axios
		.get(`https://vkontakte-network-backend-ec6s.vercel.app/auth/me`, {
			headers: {
				authorization: window.localStorage.getItem("activeUserId"),
			},
		})
		.then((response) => response.data)
		.catch((error) => error);
};

