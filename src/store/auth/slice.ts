import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	LoginUserType,
	RegisterUserType,
	UserType,
} from "../../types/UserType";

export type UserStateType = {
	userData: UserType;
	requestUserData: string;
	isLoadingUserData: boolean;
	hasErrorUserData: boolean;

	loginUserData: UserType;
	requestLoginUserData: LoginUserType;
	isLoadingLoginUserData: boolean;
	hasErrorLoginUserData: boolean;
	loginErrorMessage?: string;

	regiesterData: UserType;
	requestRegiesterData: RegisterUserType | null;
	isLoadingRegiesterData: boolean;
	hasErrorRegiesterData: boolean;
	registerErrorMessage?: string;

	isAuthUser: boolean;
};

const initialState: UserStateType = {
	userData: {
		avatarUrl: "",
		fullName: "",
		city: "",
		createdAt: "",
		studyPlace: "",
		email: "",
		token: "",
		friends: [],
		updatedAt: "",
		birthdayDate: "",
		age: 0,
		__v: 0,
		_id: "",
	},
	requestUserData: "",
	isLoadingUserData: false,
	hasErrorUserData: false,

	loginUserData: {
		avatarUrl: "",
		fullName: "",
		city: "",
		createdAt: "",
		studyPlace: "",
		email: "",
		token: "",
		friends: [],
		updatedAt: "",
		birthdayDate: "",
		age: 0,
		__v: 0,
		_id: "",
	},
	requestLoginUserData: { email: "", password: "" },
	isLoadingLoginUserData: false,
	hasErrorLoginUserData: false,

	regiesterData: {
		avatarUrl: "",
		fullName: "",
		city: "",
		createdAt: "",
		studyPlace: "",
		email: "",
		token: "",
		friends: [],
		updatedAt: "",
		birthdayDate: "",
		age: 0,
		__v: 0,
		_id: "",
	},
	requestRegiesterData: null,
	isLoadingRegiesterData: false,
	hasErrorRegiesterData: false,

	isAuthUser: false,
};

const NAME = "Auth";

const changeRequestUserData: CaseReducer<
	UserStateType,
	PayloadAction<string>
> = (state, { payload }) => {
	state.requestUserData = payload;
};

const requestUser: CaseReducer<UserStateType> = (state) => {
	state.isLoadingUserData = true;
	state.hasErrorUserData = false;
};

const successUser: CaseReducer<UserStateType, PayloadAction<UserType>> = (
	state,
	{ payload }
) => {
	state.isLoadingUserData = false;
	state.hasErrorUserData = false;
	state.userData = payload;
};

const failureUser: CaseReducer<UserStateType> = (state) => {
	state.isLoadingUserData = false;
	state.hasErrorUserData = true;
};

const changeRequestLoginData: CaseReducer<
	UserStateType,
	PayloadAction<{ email: string; password: string }>
> = (state, { payload }) => {
	state.requestLoginUserData = payload;
};

const requestLogin: CaseReducer<UserStateType> = (state) => {
	state.isLoadingLoginUserData = true;
	state.hasErrorLoginUserData = false;
};

const successLogin: CaseReducer<UserStateType, PayloadAction<UserType>> = (
	state,
	{ payload }
) => {
	state.isLoadingLoginUserData = false;
	state.hasErrorLoginUserData = false;
	state.loginUserData = payload;
	state.loginErrorMessage = "";
	state.isAuthUser = true;

	window.localStorage.setItem("activeUserId", payload._id);
	if ("_id" in payload) {
		state.isAuthUser = true;
	}
	if ("token" in payload) {
		window.localStorage.setItem("activeUserId", payload._id);
	}
	if (Boolean(payload.response) && !state.isAuthUser) {
		state.loginErrorMessage = payload.response.data.message;
	}
};

const failureLogin: CaseReducer<UserStateType, PayloadAction<string>> = (
	state,
	{ payload }
) => {
	state.isLoadingLoginUserData = false;
	state.hasErrorLoginUserData = true;
	state.loginErrorMessage = payload;
};

const changeRequestRegisterData: CaseReducer<
	UserStateType,
	PayloadAction<RegisterUserType>
> = (state, { payload }) => {
	state.requestRegiesterData = payload;
};

const requestRegister: CaseReducer<UserStateType> = (state) => {
	state.isLoadingRegiesterData = true;
	state.hasErrorRegiesterData = false;
};

const logout: CaseReducer<UserStateType> = (state) => {
	state.loginUserData = {
		avatarUrl: "",
		fullName: "",
		city: "",
		createdAt: "",
		studyPlace: "",
		email: "",
		token: "",
		friends: [],
		updatedAt: "",
		birthdayDate: "",
		age: 0,
		__v: 0,
		_id: "",
	};
	state.isAuthUser = false;

	window.localStorage.removeItem("activeUserId");
};

const requestAuthMe: CaseReducer<UserStateType> = (state) => {
	state.isLoadingLoginUserData = true;
	state.hasErrorLoginUserData = false;
};

export const { actions: AuthActions, reducer: AuthReducer } = createSlice({
	name: NAME,
	initialState: initialState,
	reducers: {
		changeRequestUserData,
		requestUser,
		successUser,
		failureUser,
		changeRequestLoginData,
		requestLogin,
		successLogin,
		failureLogin,
		changeRequestRegisterData,
		requestRegister,
		logout,
		requestAuthMe,
	},
});
