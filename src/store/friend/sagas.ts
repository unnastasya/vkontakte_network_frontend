import { takeLatest, call, put, select } from "redux-saga/effects";
import { addFriendDataSelector, requestUserIdDataSelector } from "./selectors";
import { addNewFriend, deleteFriend, getFriends } from "../../api/friends";
import { FriendsActions } from "./slice";

export type LoginUserType = {
	email: string;
	password: string;
};

function* addNewFriendSaga() {
	try {
		const requestData: string = yield select(addFriendDataSelector);
		yield call(addNewFriend, requestData);
		const requestDataId: string = yield select(requestUserIdDataSelector);
		const data: string[] = yield call(getFriends, requestDataId);
		if (Array.isArray(data)) {
			yield put(FriendsActions.successUsersFriends(data));
		} else {
			throw new Error();
		}
	} catch (e: any) {
		yield put(FriendsActions.failureUsersFriends(e.message));
	}
}

function* deleteFriendSaga() {
	try {
		const requestData: string = yield select(addFriendDataSelector);
		yield call(deleteFriend, requestData);
		const requestDataId: string = yield select(requestUserIdDataSelector);
		const data: string[] = yield call(getFriends, requestDataId);

		yield put(FriendsActions.successUsersFriends(data));
	} catch (e: any) {
		yield put(FriendsActions.failureUsersFriends(e.message));
	}
}

function* getFriendsSaga() {
	try {
		const requestData: string = yield select(requestUserIdDataSelector);
		console.log("requestData", requestData);
		const data: string[] = yield call(getFriends, requestData);
		console.log("data", data);
		if (Array.isArray(data)) {
			yield put(FriendsActions.successUsersFriends(data));
		} else {
			throw new Error();
		}
	} catch (e: any) {
		yield put(FriendsActions.failureUsersFriends(e.message));
	}
}

export function* watchAddNewFriendSaga() {
	yield takeLatest(FriendsActions.addNewFriend.type, addNewFriendSaga);
}

export function* watchDeleteFriendSaga() {
	yield takeLatest(FriendsActions.deleteFriend.type, deleteFriendSaga);
}

export function* watchGetFriendsSaga() {
	yield takeLatest(FriendsActions.requestUsersFriends.type, getFriendsSaga);
}
