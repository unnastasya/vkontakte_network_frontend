import { ApplicationState } from "..";

export const PostsSelector = (state: ApplicationState) => state.posts;

export const usersPostsSelector = (state: ApplicationState) =>
	PostsSelector(state).usersPosts;
export const isLoadingUsersPostsSelector = (state: ApplicationState) =>
	PostsSelector(state).isLoadingUsersPosts;
export const hasErrorUsersPostsSelector = (state: ApplicationState) =>
	PostsSelector(state).hasErrorUsersPosts;
export const usersPostsErrorMessageSelector = (state: ApplicationState) =>
	PostsSelector(state).usersPostsErrorMessage;

export const usersFriendsPostsSelector = (state: ApplicationState) =>
	PostsSelector(state).usersFriendsPosts;
export const isLoadingUsersFriendsPostsSelector = (state: ApplicationState) =>
	PostsSelector(state).isLoadingUsersFriendsPosts;
export const hasErrorUsersFriendsPostsSelector = (state: ApplicationState) =>
	PostsSelector(state).hasErrorUsersFriendsPosts;
export const usersFriendsPostsErrorMessageSelector = (
	state: ApplicationState
) => PostsSelector(state).usersFriendsPostsErrorMessage;

export const userIdDataSelector = (state: ApplicationState) =>
	PostsSelector(state).userIdData;

export const addPostFormDataSelector = (state: ApplicationState) =>
	PostsSelector(state).addPostData;
export const deletePostFormDataSelector = (state: ApplicationState) =>
	PostsSelector(state).deletePostData;
export const likePostFormDataSelector = (state: ApplicationState) =>
	PostsSelector(state).addLikePostId;
