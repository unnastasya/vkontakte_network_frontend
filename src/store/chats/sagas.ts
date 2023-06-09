import { takeLatest, call, put, select } from "redux-saga/effects";

import { PostType } from "../../components/addPost/AddPost";
import { ChatsActions } from "./slice";
import { getChats } from "../../api/chat";
import { addMessageDataSelector, chatIdSelector, userIdSelector } from "./selectors";
import { addMessage, getMessages } from "../../api/messages";
import { AddMessageType, ChatType, MessageType } from "../../types/ChatType";

function* getUsersChatsSaga() {
	try {
		const userId: string = yield select(userIdSelector);
		const data: ChatType[] = yield call(getChats, userId);

		yield put(ChatsActions.successUsersChats(data));
	} catch (e: any) {
		yield put(ChatsActions.failureUserChats(e.message));
	}
}

function* getChatsMessagesSaga() {
	try {
		const chatId: string = yield select(chatIdSelector);
		const data: MessageType[] = yield call(getMessages, chatId);

		yield put(ChatsActions.successChatsMessages(data));
	} catch (e: any) {
		yield put(ChatsActions.failureChatsMessages(e.message));
	}
}

function* addChatsMessagesSaga() {
	try {
		const data: AddMessageType = yield select(addMessageDataSelector);
        yield call(addMessage, data);
		const messages: MessageType[] = yield call(getMessages, data.chatId);

		yield put(ChatsActions.successChatsMessages(messages));
	} catch (e: any) {
		yield put(ChatsActions.failureChatsMessages(e.message));
	}
}

export function* watchGetUsersChatsSaga() {
	yield takeLatest(ChatsActions.requestUsersChats.type, getUsersChatsSaga);
}
export function* watchGetChatsMessagesSaga() {
	yield takeLatest(ChatsActions.requestChatsMessages.type, getChatsMessagesSaga);
}

export function* watchAddChatsMessagesSaga() {
	yield takeLatest(ChatsActions.addMessage.type, addChatsMessagesSaga);
}
