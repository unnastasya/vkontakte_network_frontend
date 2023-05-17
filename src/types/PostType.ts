import { UserType } from "./UserType";

export type AddPostType = {
	text: string;
	imageUrl: string;
	user: string;
};

export type PostType = {
	_id: string;
	text: string;
	viewsCount: number;
	likesCount: number;
	likedUsersId: string[];
	imageUrl: string;
	user: UserType;
};
