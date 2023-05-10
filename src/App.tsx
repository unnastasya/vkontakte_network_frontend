import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Page } from "./components/page/Page";
import { MainPage } from "./pages/mainPage/MainPage";
import { LoginPage } from "./pages/loginPage/LoginPage";
import { RegistrationPage } from "./pages/registrationPage/RegistrationPage";

import "./App.css";
import { UserPage } from "./pages/userPage/UserPage";
import { FriendsPage } from "./pages/friendsPage/FriendsPage";
import { NewsPage } from "./pages/newsPage/NewsPage";
import { useAppDispatch, useAppSelector } from "./store";
import { AuthActions, isAuthUserSelector } from "./store/auth";
import { MessagesPage } from "./pages/messagesPage/MessagePage";

function App() {
    const isAuth = useAppSelector(isAuthUserSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(AuthActions.requestAuthMe());
	}, []);

	return (
		<div className="App">
			<Routes>
				{/* <Route path="/" element={<Page />}> */}
				<Route index element={<MainPage />}></Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/registration" element={<RegistrationPage />} />
				<Route path="/" element={<Page />}>
					<Route path="/user/:id" element={<UserPage />} />
					<Route path="/news" element={<NewsPage />} />
					<Route path="/friends/:id" element={<FriendsPage />} />
					<Route path="/messages/:id" element={<MessagesPage />} />
				</Route>
				{/* </Route> */}
			</Routes>
		</div>
	);
}

export default App;
