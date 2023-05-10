import { ApplicationState } from "..";


export const ChatsSelector = (state: ApplicationState) => state.chats;

export const userIdSelector = (state: ApplicationState) =>
	ChatsSelector(state).userId;

export const usersChatsSelector = (state: ApplicationState) =>
	ChatsSelector(state).usersChats;
export const isLoadingUsersChatsSelector = (state: ApplicationState) =>
	ChatsSelector(state).isLoadingUsersChats;
export const isOpenChatSelector = (state: ApplicationState) =>
	ChatsSelector(state).isOpenChat;
export const chatIdSelector = (state: ApplicationState) =>
	ChatsSelector(state).chatId;

export const chatsMessagesSelector = (state: ApplicationState) =>
	ChatsSelector(state).chatsMessages;
export const isLOadingChatsMessagesSelector = (state: ApplicationState) =>
	ChatsSelector(state).isLoadingChatsMessages;
export const hasErrorChatsMessagesSelector = (state: ApplicationState) =>
	ChatsSelector(state).hasErrorChatsMessages;
    export const addMessageDataSelector = (state: ApplicationState) =>
	ChatsSelector(state).addMessageData;
