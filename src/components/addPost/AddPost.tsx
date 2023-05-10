import { Button, InputBase, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import "./AddPost.css";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import axios from "axios";
import { getUser } from "../../api/auth";
import { PostsActions } from "../../store/posts";
import { useAppDispatch } from "../../store";

const CssTextField = styled(TextField)({
	border: "1px solid #71AAEB",
	borderRadius: 4,
	backgroundColor: "#ffffff",
});

export type PostType = {
	[index: string]: any;
	text: string;
	imageUrl: string;
	user: string;
	createdAt: string;
	likesCount: number;
	likedUsersId: string[];
};

export function AddPost() {
	const dispatch = useAppDispatch();
	const activeUserId = window.localStorage.getItem("activeUserId");
	const [activeUser, setActiveUser] = useState({
		avatarUrl: "",
		fullName: "",
		_id: "",
	});
	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const [imageURL, setImageURL] = useState<string>("");

	useEffect(() => {
		getUser(activeUserId || "").then((response) => setActiveUser(response));
	}, [activeUserId]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			text: "",
			imageUrl: "",
		},
		mode: "onChange",
	});

	const handleChangeFile = async (event: any) => {
		try {
			const dataImage = new FormData();
			const file = event.target.files[0];
			dataImage.append("image", file);
			const { data } = await axios.post(
				"https://vkontakte-network-backend-ec6s.vercel.app/upload",
				dataImage,
				{
					headers: {
						authorization: window.localStorage.getItem("token"),
					},
				}
			);
			setImageURL("https://vkontakte-network-backend-ec6s.vercel.app" + data.url);
		} catch (error) {
			alert("Ошибка при загрузке файла");
		}
	};

	const onSubmit = async (data: { text: string; imageUrl: string }) => {
		const value = {
			...data,
			imageUrl: imageURL,
			user: activeUser._id,
		};
		dispatch(PostsActions.changeAddPostFormdata(value));
		dispatch(PostsActions.addPost());
	};

	return (
		<>
			<div>
				<form className="addPost" onSubmit={handleSubmit(onSubmit)}>
					<CssTextField
						size="small"
						sx={{ width: "60%" }}
						label="Введите текст поста"
						{...register("text")}
					/>

					<Button
						sx={{ width: "10%" }}
						color="secondary"
						onClick={() => inputFileRef.current?.click()}
					>
						<AttachFileIcon />
					</Button>

					<input
						{...register("imageUrl")}
						ref={inputFileRef}
						type="file"
						onChange={(e: any) => handleChangeFile(e)}
						hidden
					/>
					<Button
						sx={{ width: "30%" }}
						type="submit"
						variant="contained"
					>
						Опубликовать
					</Button>
				</form>
			</div>
			{errors.text?.message && (
				<Typography>{errors.text?.message}</Typography>
			)}

			{imageURL && <img className="addPost__image" src={imageURL} />}
		</>
	);
}
