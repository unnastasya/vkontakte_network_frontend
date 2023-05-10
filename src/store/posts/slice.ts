import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../../components/addPost/AddPost";

export type PostsStateType = {
	usersPosts: PostType[];
	isLoadingUsersPosts: boolean;
	hasErrorUsersPosts: boolean;
	usersPostsErrorMessage?: string;

	usersFriendsPosts: PostType[];
	isLoadingUsersFriendsPosts: boolean;
	hasErrorUsersFriendsPosts: boolean;
	usersFriendsPostsErrorMessage?: string;

	userIdData?: string;

	addPostData?: {
		text: string;
		imageUrl: string;
		user: string;
	};

	deletePostData?: string;

	addLikePostId?: string;
};

const initialState: PostsStateType = {
	usersPosts: [],
	isLoadingUsersPosts: false,
	hasErrorUsersPosts: false,
	usersPostsErrorMessage: "",
	usersFriendsPosts: [],
	isLoadingUsersFriendsPosts: false,
	hasErrorUsersFriendsPosts: false,
	usersFriendsPostsErrorMessage: "",
};

const NAME = "Posts";

const changeAddPostFormdata: CaseReducer<
	PostsStateType,
	PayloadAction<{
		text: string;
		imageUrl: string;
		user: string;
	}>
> = (state, { payload }) => {
	state.addPostData = payload;
};

const addPost: CaseReducer<PostsStateType> = (state) => {};

const changeDeletePostFormdata: CaseReducer<
	PostsStateType,
	PayloadAction<string>
> = (state, { payload }) => {
	state.deletePostData = payload;
};

const deletePost: CaseReducer<PostsStateType> = (state) => {};

const changeAddLikePostId: CaseReducer<
	PostsStateType,
	PayloadAction<string>
> = (state, { payload }) => {
	state.addLikePostId = payload;
};

const likePost: CaseReducer<PostsStateType> = (state) => {};

const changeUserIdData: CaseReducer<PostsStateType, PayloadAction<string>> = (
	state,
	{ payload }
) => {
	state.userIdData = payload;
};

const requestUserPosts: CaseReducer<PostsStateType> = (state) => {
	state.isLoadingUsersPosts = true;
	state.hasErrorUsersPosts = false;
};

const successUserPosts: CaseReducer<
	PostsStateType,
	PayloadAction<PostType[]>
> = (state, { payload }) => {
	state.isLoadingUsersPosts = false;
	state.hasErrorUsersPosts = false;
	state.usersPosts = payload;
	state.usersPostsErrorMessage = "";
};

const failureUserPosts: CaseReducer<PostsStateType, PayloadAction<string>> = (
	state,
	payload?
) => {
	state.isLoadingUsersPosts = false;
	state.hasErrorUsersPosts = true;
	state.usersPostsErrorMessage = payload?.payload;
};

const requestUsersFriendsPosts: CaseReducer<PostsStateType> = (state) => {
	state.isLoadingUsersFriendsPosts = true;
	state.hasErrorUsersFriendsPosts = false;
};

const successUsersFriendsPosts: CaseReducer<
	PostsStateType,
	PayloadAction<PostType[]>
> = (state, { payload }) => {
	state.isLoadingUsersFriendsPosts = false;
	state.hasErrorUsersFriendsPosts = false;
	state.usersFriendsPosts = payload;
	state.usersFriendsPostsErrorMessage = "";
};

const failureUsersFriensPosts: CaseReducer<
	PostsStateType,
	PayloadAction<string>
> = (state, payload?) => {
	state.isLoadingUsersFriendsPosts = false;
	state.hasErrorUsersFriendsPosts = true;
	state.usersFriendsPostsErrorMessage = payload?.payload;
};

export const { actions: PostsActions, reducer: PostsReducer } = createSlice({
	name: NAME,
	initialState: initialState,
	reducers: {
		requestUserPosts,
		successUserPosts,
		failureUserPosts,
		requestUsersFriendsPosts,
		successUsersFriendsPosts,
		failureUsersFriensPosts,
		changeUserIdData,
		addPost,
		changeAddPostFormdata,
		deletePost,
		changeDeletePostFormdata,
		changeAddLikePostId,
		likePost,
	},
});
