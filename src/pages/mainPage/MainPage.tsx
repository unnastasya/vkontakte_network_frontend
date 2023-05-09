import { Button, Paper } from "@mui/material";
import React from "react";

import "./MainPage.css";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import { isAuthUserSelector } from "../../store/auth";

export function MainPage() {
	const navigate = useNavigate();
	const isAuth = useAppSelector(isAuthUserSelector);
	const userId = window.localStorage.getItem("activeUserId");

	if (isAuth) {
		navigate(`/user/${userId}`);
	}

	const onClickLogin = () => {
		navigate("/login");
	};

	const onClickRegistration = () => {
		navigate("/registration");
	};

	return (
		<div className="MainPage__container">
			<Paper className="mainPage__buttonsBlock">
				<Button size="large" variant="contained" onClick={onClickLogin}>
					Войти
				</Button>
				<Button
					size="large"
					variant="outlined"
					onClick={onClickRegistration}
				>
					Зарегистрироваться
				</Button>
			</Paper>
		</div>
	);
}
