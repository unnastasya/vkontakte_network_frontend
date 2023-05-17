import axios from "axios";
import qs from "qs";
import { AddPostType } from "../types/PostType";
import { PostType } from "../components/addPost/AddPost";

export const addNewPost = (field: AddPostType): Promise<any> => {
	return axios
		.post<any>(
			`https://vkontakte-network-backend-ec6s.vercel.app/post`,
			qs.stringify(field),
			{
				headers: {
					authorization: window.localStorage.getItem("activeUserId"),
				},
			}
		)
		.then((response) => response.data)
		.catch((error) => error);
};

export const getAllPosts = (id: string): Promise<PostType[]> => {
	return axios
		.get<any>(`https://vkontakte-network-backend-ec6s.vercel.app/posts`, {
			headers: {
				authorization: window.localStorage.getItem("activeUserId"),
			},
		})
		.then((response) => response.data)
		.catch((error) => error);
};

export const getOneUserPosts = (id: string): Promise<PostType[]> => {
	return axios
		.get<any>(
			`https://vkontakte-network-backend-ec6s.vercel.app/posts/${id}`,
			{
				headers: {
					authorization: window.localStorage.getItem("activeUserId"),
				},
			}
		)
		.then((response) => response.data)
		.catch((error) => error);
};

export const likePost = (id: string): Promise<any> => {
	return axios
		.patch(
			`https://vkontakte-network-backend-ec6s.vercel.app/posts/${id}`,
			null,
			{
				headers: {
					authorization: window.localStorage.getItem("activeUserId"),
				},
			}
		)
		.then((response) => response.data)
		.catch((error) => error);
};

export const deletePost = (id: string): Promise<any> => {
	return axios
		.delete(
			`https://vkontakte-network-backend-ec6s.vercel.app/posts/${id}`,
			{
				headers: {
					authorization: window.localStorage.getItem("activeUserId"),
				},
			}
		)
		.then((response) => response.data)
		.catch((error) => error);
};
