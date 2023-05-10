import * as Yup from "yup";

export const registrationValidationSchema = Yup.object().shape({
	name: Yup.string().required("Укажите имя"),
	surname: Yup.string().required("Укажите фамилию"),
	email: Yup.string()
		.required("Укажите почту")
		.email("Неверный формат почты"),
	password: Yup.string()
		.required("укажите пароль")
		.min(5, "Длина пароля не пенее 5 символов"),

	city: Yup.string().required("Укажите город"),
	studyPlace: Yup.string().required("Укажите место цчебы"),
});
