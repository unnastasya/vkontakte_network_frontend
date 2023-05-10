import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FriendsStateType = {
	requestUserIdData?: string;
	usersFriends: string[];
	isLoadingUsersFriends: boolean;
	hasErrorUsersFriends: boolean;
	usersFriendsErrorMessage: string;

	addFriendData?: string;

	deleteFriendData?: string;
};

const initialState: FriendsStateType = {
	usersFriends: [],
	isLoadingUsersFriends: false,
	hasErrorUsersFriends: false,
	usersFriendsErrorMessage: "",

};

const NAME = "Friends";

const changeAddFriendData: CaseReducer<
	FriendsStateType,
	PayloadAction<string>
> = (state, { payload }) => {
	state.addFriendData = payload;
};

const addNewFriend: CaseReducer<FriendsStateType> = (state) => {};

const changeDeleteFriendData: CaseReducer<
	FriendsStateType,
	PayloadAction<string>
> = (state, { payload }) => {
	state.deleteFriendData = payload;
};

const deleteFriend: CaseReducer<FriendsStateType> = (state) => {};

const changeRequestUserItData: CaseReducer<
	FriendsStateType,
	PayloadAction<string>
> = (state, { payload }) => {
	state.requestUserIdData = payload;
};

const requestUsersFriends: CaseReducer<FriendsStateType> = (state) => {
	state.isLoadingUsersFriends = true;
	state.hasErrorUsersFriends = false;
};

const successUsersFriends: CaseReducer<
	FriendsStateType,
	PayloadAction<string[]>
> = (state, { payload }) => {
	state.isLoadingUsersFriends = false;
	state.hasErrorUsersFriends = false;
	state.usersFriends = payload;
	state.usersFriendsErrorMessage = "";
};

const failureUsersFriends: CaseReducer<
	FriendsStateType,
	PayloadAction<string>
> = (state, payload?) => {
	state.isLoadingUsersFriends = false;
	state.hasErrorUsersFriends = true;
	state.usersFriendsErrorMessage = payload?.payload;
};

export const { actions: FriendsActions, reducer: FriendsReducer } = createSlice(
	{
		name: NAME,
		initialState: initialState,
		reducers: {
			changeRequestUserItData,
			requestUsersFriends,
			successUsersFriends,
			failureUsersFriends,
			changeAddFriendData,
			addNewFriend,
			changeDeleteFriendData,
			deleteFriend,
		},
	}
);
