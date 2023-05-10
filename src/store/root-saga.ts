import { fork } from "redux-saga/effects";
import { watchGetAuthMeSaga, watchLoginSaga, watchGetUserSaga } from "./auth";
import {
	watchAddPostSaga,
	watchDeletePostSaga,
	watchGetUsersPostsSaga,
	watchGetUsersFriendsPostsSaga,
	watchLikePostSaga,
} from "./posts";
import {
	watchAddNewFriendSaga,
	watchDeleteFriendSaga,
	watchGetFriendsSaga,
} from "./friend";
import {
	watchAddChatsMessagesSaga,
	watchGetChatsMessagesSaga,
	watchGetUsersChatsSaga,
} from "./chats";

export function* rootSaga() {
	yield fork(watchLoginSaga);
	yield fork(watchGetUsersPostsSaga);
	yield fork(watchGetUsersFriendsPostsSaga);
	yield fork(watchGetFriendsSaga);
	yield fork(watchGetUserSaga);
	yield fork(watchGetAuthMeSaga);
	yield fork(watchGetUsersChatsSaga);
	yield fork(watchAddPostSaga);
	yield fork(watchDeletePostSaga);
	yield fork(watchLikePostSaga);
	yield fork(watchAddNewFriendSaga);
	yield fork(watchDeleteFriendSaga);
	yield fork(watchGetChatsMessagesSaga);
	yield fork(watchAddChatsMessagesSaga);
}
