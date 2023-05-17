import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddMessageType, ChatType, MessageType } from "../../types/ChatType";

export type ChatsStateType = {
	userId: string;
	usersChats: ChatType[];
	isLoadingUsersChats: boolean;
	hasErrorUsersChats: boolean;
	usersPostsErrorMessage?: string;

	isOpenChat: boolean;

	chatId: string;

	chatsMessages: MessageType[];
	isLoadingChatsMessages: boolean;
	hasErrorChatsMessages: boolean;
	chatsMessagesErrorMessage: string;

	addMessageData?: { text: string; sender: string; chatId: string };
};

const initialState: ChatsStateType = {
	userId: "",
	usersChats: [],
	isLoadingUsersChats: false,
	hasErrorUsersChats: false,
	usersPostsErrorMessage: "",

	isOpenChat: false,

	chatId: "",

	chatsMessages: [],
	isLoadingChatsMessages: false,
	hasErrorChatsMessages: false,
	chatsMessagesErrorMessage: "",
};

const NAME = "Chats";

const changeUserId: CaseReducer<ChatsStateType, PayloadAction<string>> = (
	state,
	{ payload }
) => {
	state.userId = payload;
};

const changeAddMessageData: CaseReducer<
	ChatsStateType,
	PayloadAction<AddMessageType>
> = (state, { payload }) => {
	state.addMessageData = payload;
};

const addMessage: CaseReducer<ChatsStateType> = (state) => {};

const changeChatId: CaseReducer<ChatsStateType, PayloadAction<string>> = (
	state,
	{ payload }
) => {
	state.chatId = payload;
};

const requestChatsMessages: CaseReducer<ChatsStateType> = (state) => {
	state.isLoadingChatsMessages = true;
	state.hasErrorChatsMessages = false;
};

const successChatsMessages: CaseReducer<
	ChatsStateType,
	PayloadAction<MessageType[]>
> = (state, { payload }) => {
	state.isLoadingChatsMessages = false;
	state.hasErrorChatsMessages = false;
	state.chatsMessages = payload;
};

const failureChatsMessages: CaseReducer<
	ChatsStateType,
	PayloadAction<string>
> = (state, { payload }) => {
	state.isLoadingChatsMessages = false;
	state.hasErrorChatsMessages = true;
	state.chatsMessagesErrorMessage = payload;
};

const requestUsersChats: CaseReducer<ChatsStateType> = (state) => {
	state.isLoadingUsersChats = true;
	state.hasErrorUsersChats = false;
};

const successUsersChats: CaseReducer<
	ChatsStateType,
	PayloadAction<ChatType[]>
> = (state, { payload }) => {
	state.isLoadingUsersChats = false;
	state.hasErrorUsersChats = false;
	state.usersChats = payload;
	state.usersPostsErrorMessage = "";
};

const failureUserChats: CaseReducer<ChatsStateType, PayloadAction<string>> = (
	state,
	payload?
) => {
	state.isLoadingUsersChats = false;
	state.hasErrorUsersChats = true;
	state.usersPostsErrorMessage = payload?.payload;
};

const openChat: CaseReducer<ChatsStateType> = (state) => {
	state.isOpenChat = true;
};

const closeChat: CaseReducer<ChatsStateType> = (state) => {
	state.isOpenChat = false;
};

export const { actions: ChatsActions, reducer: ChatsReducer } = createSlice({
	name: NAME,
	initialState: initialState,
	reducers: {
		requestUsersChats,
		successUsersChats,
		failureUserChats,
		openChat,
		closeChat,
		changeChatId,
		requestChatsMessages,
		successChatsMessages,
		failureChatsMessages,
		changeAddMessageData,
		addMessage,
		changeUserId,
	},
});
