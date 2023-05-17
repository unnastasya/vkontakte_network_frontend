export type UserType = {
	[index: string]: any;
	avatarUrl: string;
	createdAt: string;
	email: string;
	fullName: string;
	friends: string[];
	token: string;
	updatedAt: string;
	city: string;
	studyPlace: string;
	birthdayDate: string;
	age: number;
	__v: number;
	_id: string;
};

export type RegisterUserType = {
	[index: string]: any;
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
};

export type LoginUserType = {
	email: string;
	password: string;
};
