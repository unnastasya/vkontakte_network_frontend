import styled from "@emotion/styled";
import {
	Avatar,
	Button,
	CircularProgress,
	Divider,
	Paper,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUser } from "../../api/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./OneChat.css";
import { AddMessage } from "./addMessage/AddMessage";
import { Message } from "../message/Message";
import { useAppDispatch, useAppSelector } from "../../store";
import {
	ChatsActions,
	chatsMessagesSelector,
	isLOadingChatsMessagesSelector,
} from "../../store/chats";
import { UserType } from "../../types/UserType";
import { MessageType } from "../../types/ChatType";
const CssPaper = styled(Paper)({
	background: "#3d3d3d",
	borderRadius: 10,
	padding: "10px",
});

interface OneChatProps {
	chatId: string;
	friendId: string;
}

export function OneChat({ chatId, friendId }: OneChatProps) {
	const dispatch = useAppDispatch();
	const [friend, setFriend] = useState<UserType>();
	const messages = useAppSelector(chatsMessagesSelector);
	const isLoading = useAppSelector(isLOadingChatsMessagesSelector);

	useEffect(() => {
		getUser(friendId).then((response) => setFriend(response));
		dispatch(ChatsActions.requestChatsMessages());
	}, [friendId]);

	const closeChat = () => {
		dispatch(ChatsActions.closeChat());
	};

	if (isLoading) {
		return (
			<div className="loading">
				<CircularProgress />
			</div>
		);
	}
	return (
		<CssPaper sx={{ width: "100%", height: "90vh" }} className="oneChat">
			<div>
				<div className="oneChat__header">
					<Button onClick={closeChat}>
						<ArrowBackIcon />
					</Button>
					<div>
						<Typography sx={{ color: "#71AAEB" }}>
							{friend?.fullName}
						</Typography>
					</div>
					<Avatar
						sx={{
							width: "40px",
							height: "40px",
							marginRight: "10px",
						}}
						src={friend?.avatarUrl}
						alt={friend?.fullName}
					/>
				</div>
				<Divider variant="fullWidth" />
			</div>
			<div className="oneChat__messages">
				{messages.map((message: MessageType) => {
					return <Message message={message} />;
				})}
			</div>
			<AddMessage chatId={chatId} />
		</CssPaper>
	);
}
