import { ApplicationState } from "..";

export const AuthSelector = (state: ApplicationState) => state.auth;

export const userDataSelector = (state: ApplicationState) =>
	AuthSelector(state).userData;
export const requestUserDataSelector = (state: ApplicationState) =>
	AuthSelector(state).requestUserData;
export const isLoadingUserDataSelector = (state: ApplicationState) =>
	AuthSelector(state).isLoadingUserData;
export const hasErrorUserDataSelector = (state: ApplicationState) =>
	AuthSelector(state).hasErrorUserData;
export const loginUserDataSelector = (state: ApplicationState) =>
	AuthSelector(state).loginUserData;
export const requestLoginUserDataSelector = (state: ApplicationState) =>
	AuthSelector(state).requestLoginUserData;
export const isLoadingLoginUserDataSelector = (state: ApplicationState) =>
	AuthSelector(state).isLoadingLoginUserData;
export const hasErrorLoginUserDataSelector = (state: ApplicationState) =>
	AuthSelector(state).hasErrorLoginUserData;
export const loginErrorMessageSelector = (state: ApplicationState) =>
	AuthSelector(state).loginErrorMessage;
export const isAuthUserSelector = (state: ApplicationState) =>
	AuthSelector(state).isAuthUser;
