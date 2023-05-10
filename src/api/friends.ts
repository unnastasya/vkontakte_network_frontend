import axios from "axios";
import qs from "qs";

export const addNewFriend = (id: string): Promise<any> => {
	const activeUserId = window.localStorage.getItem("activeUserId");
	return axios
		.post<any>(
			`https://vkontakte-network-backend-ec6s.vercel.app/friend/${activeUserId}`,
			qs.stringify({ id: id }),
			{
				headers: {
					authorization: window.localStorage.getItem("activeUserId"),
				},
			}
		)
		.then((response) => response.data)
		.catch((error) => error);
};

export const deleteFriend = (id: string): Promise<any> => {
	return axios
		.delete<any>(`https://vkontakte-network-backend-ec6s.vercel.app/friend/${id}`, {
			headers: {
				authorization: window.localStorage.getItem("activeUserId"),
			},
		})
		.then((response) => response.data)
		.catch((error) => error);
};

export const getFriends = (id: string): Promise<any> => {
	console.log("IIIIIID", id);
	return axios
		.get<any>(`https://vkontakte-network-backend-ec6s.vercel.app/friends/${id}`, {
			headers: {
				authorization: window.localStorage.getItem("activeUserId"),
			},
		})
		.then((response) => response.data)
		.catch((error) => error);
};
