import { ApplicationState } from "..";

export const FriendsSelector = (state: ApplicationState) => state.friends;

export const requestUserIdDataSelector = (state: ApplicationState) =>
	FriendsSelector(state).requestUserIdData;
export const usersFriendsSelector = (state: ApplicationState) =>
	FriendsSelector(state).usersFriends;
export const isLoadingUsersFriendsSelector = (state: ApplicationState) =>
	FriendsSelector(state).isLoadingUsersFriends;
export const hasErrorUsersFriendsSelector = (state: ApplicationState) =>
	FriendsSelector(state).hasErrorUsersFriends;

export const addFriendDataSelector = (state: ApplicationState) =>
	FriendsSelector(state).addFriendData;

export const deleteFriendDataSelector = (state: ApplicationState) =>
	FriendsSelector(state).deleteFriendData;
