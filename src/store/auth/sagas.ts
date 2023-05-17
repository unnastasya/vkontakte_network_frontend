import { takeLatest, call, put, select } from "redux-saga/effects";
import { AuthActions } from "./slice";
import { getUser, postLogin, postAuthMe } from "../../api/auth";
import { UserType } from "../../types/UserType";
import { PostsActions } from "../posts";
import {
	requestLoginUserDataSelector,
	requestUserDataSelector,
} from "./selectors";

function* loginSaga() {
	try {
		const requestData: { email: string; password: string } = yield select(
			requestLoginUserDataSelector
		);
		const data: UserType = yield call(postLogin, requestData);
		console.log("data", data);
		if (!("_id" in data)) {
			throw new Error("Неверный логин или пароль");
		}
		yield put(AuthActions.successLogin(data));
		yield put(AuthActions.successUser(data));
	} catch (e: any) {
		yield put(AuthActions.failureLogin(e.message));
	}
}

function* getAuthMeSaga() {
	try {
		const data: UserType | { message: string } = yield call(postAuthMe);
		if (!("message" in data)) {
			yield put(AuthActions.successLogin(data));
		} else {
			throw new Error();
		}
	} catch (e: any) {
		yield put(AuthActions.failureLogin(e.message));
	}
}

function* getUserSaga() {
	try {
		const requestData: string = yield select(requestUserDataSelector);
		const data: UserType | { message: string } = yield call(
			getUser,
			requestData
		);
		if (!("message" in data)) {
			yield put(AuthActions.successUser(data));
		} else {
			throw new Error();
		}
	} catch (e: any) {
		yield put(AuthActions.failureUser(e.message));
	}
}

export function* watchLoginSaga() {
	yield takeLatest(AuthActions.requestLogin.type, loginSaga);
}

export function* watchGetAuthMeSaga() {
	yield takeLatest(AuthActions.requestAuthMe.type, getAuthMeSaga);
}

export function* watchGetUserSaga() {
	yield takeLatest(AuthActions.requestUser.type, getUserSaga);
}
