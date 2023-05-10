import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { AuthReducer } from "./auth";
import { rootSaga } from "./root-saga";
import { PostsReducer } from "./posts";
import { FriendsReducer } from "./friend";
import { ChatsReducer } from "./chats";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export const store = configureStore({
	reducer: {
		auth: AuthReducer,
        posts: PostsReducer,
        friends: FriendsReducer,
        chats: ChatsReducer

	},
	devTools: true,
	middleware: middlewares,
});

sagaMiddleware.run(rootSaga);

export type ApplicationState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
	useSelector;
