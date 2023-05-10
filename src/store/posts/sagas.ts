import { takeLatest, call, put, select } from "redux-saga/effects";
import {
	addNewPost,
	deletePost,
	getAllPosts,
	getOneUserPosts,
	likePost,
} from "../../api/post";
import { PostsActions } from "./slice";
import { PostType } from "../../components/addPost/AddPost";
import {
	addPostFormDataSelector,
	deletePostFormDataSelector,
	likePostFormDataSelector,
	userIdDataSelector,
} from "./selectors";
import { loginUserDataSelector } from "../auth";
import { UserType } from "../../types/UserType";

export type LoginUserType = {
	email: string;
	password: string;
};

function* getUsersPostsSaga() {
	try {
		const userId: string = yield select(userIdDataSelector);
		const data: PostType[] = yield call(getOneUserPosts, userId);

		yield put(PostsActions.successUserPosts(data));
	} catch (e: any) {
		yield put(PostsActions.failureUserPosts(e.message));
	}
}

function* getUsersFriensPostsSaga() {
	try {
		const userId: string = yield select(userIdDataSelector);
		const data: PostType[] = yield call(getAllPosts, userId);

		yield put(PostsActions.successUsersFriendsPosts(data));
	} catch (e: any) {
		yield put(PostsActions.failureUsersFriensPosts(e.message));
	}
}

function* addPostSaga() {
	try {
		const formData: {
			text: string;
			imageUrl: string;
			user: string;
		} = yield select(addPostFormDataSelector);
		yield call(addNewPost, formData);
		const user: UserType = yield select(loginUserDataSelector);
		const data: PostType[] = yield call(getOneUserPosts, user._id);
		yield put(PostsActions.successUserPosts(data));
	} catch (error) {}
}

function* deletePostSaga() {
	try {
		const formData: string = yield select(deletePostFormDataSelector);
		yield call(deletePost, formData);
		const user: UserType = yield select(loginUserDataSelector);
		const data: PostType[] = yield call(getOneUserPosts, user._id);
		yield put(PostsActions.successUserPosts(data));
	} catch (error) {}
}

function* likePostSaga() {
	try {
		const formData: string = yield select(likePostFormDataSelector);
		yield call(likePost, formData);
		const user: string = yield select(userIdDataSelector);
		const data: PostType[] = yield call(getOneUserPosts, user);
		const dataFriendsPosts: PostType[] = yield call(getAllPosts, user);
		yield put(PostsActions.successUserPosts(data));
		yield put(PostsActions.successUsersFriendsPosts(dataFriendsPosts));
	} catch (error) {}
}

export function* watchGetUsersPostsSaga() {
	yield takeLatest(PostsActions.requestUserPosts.type, getUsersPostsSaga);
}

export function* watchGetUsersFriendsPostsSaga() {
	yield takeLatest(
		PostsActions.requestUsersFriendsPosts.type,
		getUsersFriensPostsSaga
	);
}

export function* watchAddPostSaga() {
	yield takeLatest(PostsActions.addPost.type, addPostSaga);
}

export function* watchDeletePostSaga() {
	yield takeLatest(PostsActions.deletePost.type, deletePostSaga);
}

export function* watchLikePostSaga() {
	yield takeLatest(PostsActions.likePost.type, likePostSaga);
}
