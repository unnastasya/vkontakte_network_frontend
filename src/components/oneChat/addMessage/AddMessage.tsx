import { Button, Divider, TextField } from "@mui/material";
import React from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store";
import { loginUserDataSelector } from "../../../store/auth";
import { ChatsActions } from "../../../store/chats";

import "./AddMessage.css";
import { AddMessageType } from "../../../types/ChatType";

interface AddMessageProps {
	chatId: string;
}

export function AddMessage({ chatId }: AddMessageProps) {
	const activeUser = useAppSelector(loginUserDataSelector);
	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
        reset
	} = useForm({
		defaultValues: {
			text: "",
		},
		mode: "onChange",
	});

	const onSubmit = async (data: { text: string }) => {
		const value: AddMessageType = {
			...data,
			sender: activeUser._id,
			chatId: chatId,
		};
		dispatch(ChatsActions.changeAddMessageData(value));
		dispatch(ChatsActions.addMessage());
        reset();
	};
	return (
		<>
			<div>
				<form onSubmit={handleSubmit(onSubmit)} className="addMessage">
					<TextField
						size="small"
						sx={{ width: "90%" }}
						color="secondary"
						{...register("text")}
					/>
					<Button type="submit" variant="contained">
						<SendRoundedIcon />
					</Button>
				</form>
			</div>
		</>
	);
}
