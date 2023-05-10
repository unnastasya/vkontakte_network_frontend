import { takeLatest, call, put, select } from "redux-saga/effects";

import { PostType } from "../../components/addPost/AddPost";
import { ChatsActions } from "./slice";
import { getChats } from "../../api/chat";
import { addMessageDataSelector, chatIdSelector, userIdSelector } from "./selectors";
import { addMessage, getMessages } from "../../api/messages";

function* getUsersChatsSaga() {
	try {
		const userId: string = yield select(userIdSelector);
		const data: any[] = yield call(getChats, userId);

		yield put(ChatsActions.successUsersChats(data));
	} catch (e: any) {
		yield put(ChatsActions.failureUserChats(e.message));
	}
}

function* getChatsMessagesSaga() {
	try {
		const chatId: string = yield select(chatIdSelector);
		const data: any[] = yield call(getMessages, chatId);

		yield put(ChatsActions.successChatsMessages(data));
	} catch (e: any) {
		yield put(ChatsActions.failureChatsMessages(e.message));
	}
}

function* addChatsMessagesSaga() {
	try {
		const data: { text: string; sender: string, chatId: string } = yield select(addMessageDataSelector);
        yield call(addMessage, data);
		const messages: any[] = yield call(getMessages, data.chatId);

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
