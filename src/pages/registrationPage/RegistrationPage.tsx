import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationValidationSchema } from "./RegistrationPageValidation";
import { useNavigate } from "react-router-dom";

import "./RegistrationPage.css";
import { postRegister, uploadAvatar } from "../../api/register";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { postLogin } from "../../api/auth";
import { useAppSelector } from "../../store";
import { isAuthUserSelector } from "../../store/auth";

export function RegistrationPage() {
	const navigate = useNavigate();
	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const [imageURL, setImageURL] = useState<string>("");
	var now = dayjs();
	const [birthdayDate, setBirthdayDate] = useState<Dayjs | null>(now);

	const isAuth = useAppSelector(isAuthUserSelector);
	const userId = window.localStorage.getItem("activeUserId");

	const [res, setRes] = useState({});

	useEffect(() => {
		if (isAuth) {
			navigate(`/user/${userId}`);
		}
	}, [isAuth]);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			name: "",
			surname: "",
			fullName: "",
			email: "",
			password: "",
			avatarUrl: "",
			city: "",
			studyPlace: "",
			birthdayDate: "",
			age: 0,
		},
		mode: "onChange",
		resolver: yupResolver(registrationValidationSchema),
	});

	const onSubmit = (value: {
		name: string;
		surname: string;
		fullName: string;
		email: string;
		password: string;
		avatarUrl: string;
		city: string;
		studyPlace: string;
		birthdayDate: string;
		age: number;
	}) => {
		value.avatarUrl = "https://vkontakte-network-backend-ec6s.vercel.app" + imageURL;
		value.birthdayDate = String(birthdayDate);
		value.fullName = value.name + " " + value.surname;
		if (birthdayDate) {
			value.age = now.get("year") - birthdayDate.get("year");
		}
		if (isValid) {
			postRegister(value).then((response) => {
				setRes(response.response);
				let loginValue = {
					email: value.email,
					password: value.password,
				};
				postLogin(loginValue).then((response) => {
					navigate(`/user/${response._id}`);
					window.localStorage.setItem("activeUserId", response._id);
				});
			});
		}
	};

	const handleChangeFile = async (event: any) => {
		try {
			const dataImage = new FormData();
			const file = event.target.files[0];
			dataImage.append("image", file);
			const res = await uploadAvatar(dataImage);
			setImageURL(res.url);
		} catch (error) {
			console.warn(error);
			alert("Ошибка при загрузке файла");
		}
	};

	const onClickLogin = () => {
		navigate("/login");
	};

	return (
		<div className="registrationPage">
			<Paper className="registrationPage__container">
				<Typography className="registrationPage__title" variant="h5">
					Создание аккаунта
				</Typography>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="registrationPage__avatar">
						<Avatar
							onClick={() => inputFileRef.current?.click()}
							sx={{ width: 100, height: 100 }}
							src={`https://vkontakte-network-backend-ec6s.vercel.app${imageURL}`}
						/>
					</div>
					<input
						ref={inputFileRef}
						type="file"
						onChange={(e: any) => handleChangeFile(e)}
						hidden
					/>
					<TextField
						className="registrationPage__field"
						label="имя"
						error={Boolean(errors.name?.message)}
						helperText={errors.name?.message}
						{...register("name")}
						fullWidth
					/>
					<TextField
						className="registrationPage__field"
						label="фамилия"
						error={Boolean(errors.surname?.message)}
						helperText={errors.surname?.message}
						{...register("surname")}
						fullWidth
					/>
					<TextField
						className="registrationPage__field"
						label="E-mail"
						error={Boolean(errors.email?.message)}
						helperText={errors.email?.message}
						{...register("email")}
						fullWidth
					/>
					<TextField
						className="registrationPage__field"
						label="Пароль"
						error={Boolean(errors.password?.message)}
						helperText={errors.password?.message}
						{...register("password")}
						fullWidth
					/>

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							className="registrationPage__field"
							label="Дата рождения"
							value={birthdayDate}
							onChange={(newValue) => setBirthdayDate(newValue)}
						/>
					</LocalizationProvider>

					<TextField
						className="registrationPage__field"
						label="Город проживания"
						error={Boolean(errors.city?.message)}
						helperText={errors.city?.message}
						{...register("city")}
						fullWidth
					/>
					<TextField
						className="registrationPage__field"
						label="Место учебы"
						error={Boolean(errors.studyPlace?.message)}
						helperText={errors.studyPlace?.message}
						{...register("studyPlace")}
						fullWidth
					/>
					<div className="registrationPage__buttonsBlock">
						<Button
							type="submit"
							size="large"
							variant="contained"
							fullWidth
						>
							Зарегистироваться
						</Button>
						<Button
							variant="outlined"
							size="large"
							onClick={onClickLogin}
							fullWidth
						>
							Войти
						</Button>
					</div>
				</form>
			</Paper>
		</div>
	);
}
