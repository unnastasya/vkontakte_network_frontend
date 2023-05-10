import React, { useEffect } from "react";
import { Alert, Button, Paper, TextField, Typography } from "@mui/material";
import { loginValidationSchema } from "./LoginPageValidation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../../store";
import {
	AuthActions,
	isAuthUserSelector,
	loginErrorMessageSelector,
} from "../../store/auth";

import "./LoginPage.css";

const CssTextField = styled(TextField)({
	color: "#fffff",
});

export function LoginPage() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(isAuthUserSelector);
	const userId = window.localStorage.getItem("activeUserId");
	const errorMessage = useAppSelector(loginErrorMessageSelector);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
		resolver: yupResolver(loginValidationSchema),
	});

	const onSubmit = (data: { email: string; password: string }) => {
		const value = { ...data };
		dispatch(AuthActions.changeRequestLoginData(value));
		dispatch(AuthActions.requestLogin());
	};

	const onClickRegistration = () => {
		navigate("/registration");
	};

	useEffect(() => {
		if (isAuth) {
			navigate(`/user/${userId}`);
		}
	}, [isAuth]);

	return (
		<div className="loginPage">
			<Paper className="loginPage__container">
				<Typography className="loginPage__title" variant="h5">
					Вход в аккаунт
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<>
								<CssTextField
									className="loginPage__field"
									label="E-Mail"
									error={Boolean(errors.email?.message)}
									helperText={errors.email?.message}
									fullWidth
									{...field}
								/>
							</>
						)}
					/>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<>
								<TextField
									className="loginPage__field"
									label="Пароль"
									error={Boolean(errors.password?.message)}
									helperText={errors.password?.message}
									fullWidth
									{...field}
								/>
							</>
						)}
					/>
					{errorMessage && (
						<Alert className="error_field" severity="error">
							{errorMessage}
						</Alert>
					)}
					<div className="loginPage__buttonsBlock">
						<Button
							type="submit"
							size="large"
							variant="contained"
							fullWidth
						>
							Войти
						</Button>
						<Button
							variant="outlined"
							size="large"
							onClick={onClickRegistration}
							fullWidth
						>
							Зарегистрироваться
						</Button>
					</div>
				</form>
			</Paper>
		</div>
	);
}
